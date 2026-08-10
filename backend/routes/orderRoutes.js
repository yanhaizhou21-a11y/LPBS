import { Router } from 'express';
import { getDB } from '../config/db.js';
import { requireAdmin } from './authRoutes.js';
import { DEFAULT_PRODUCTS, MAIN_PROMO_PRODUCT } from '../data/defaultProducts.js';
import { localOrderStore } from '../data/localOrderStore.js';

const router = Router();
const ORDER_STATUSES = new Set(['PENDING_PAYMENT', 'PAYMENT_REPORTED', 'PAID', 'PROCESSED', 'SHIPPED', 'COMPLETED', 'DONE']);
const PAYMENT_METHODS = new Set(['QRIS', 'BSI', 'BNI', 'BRI']);
const SHIPPING_TYPES = new Set(['JNE', 'Ambil di kantor']);
const text = (value, max = 160) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const allowLocalStore = process.env.NODE_ENV !== 'production';
const ordersCollection = () => {
  try { return getDB().collection('orders'); }
  catch (error) {
    if (!allowLocalStore) throw error;
    return null;
  }
};

export function buildOrder(body, catalogProducts = []) {
  const rawItems = body?.cart?.items;
  const buyer = body?.buyer || {};
  const shippingType = text(body?.shippingType, 32);
  const shippingFee = Number(body?.shippingService?.totalFee || 0);
  const requiredBuyerFields = shippingType === 'JNE'
    ? ['name', 'whatsapp', 'address', 'city', 'village', 'district', 'province', 'postal']
    : ['name', 'whatsapp'];

  if (!/^BTS-\d{8}-[A-Z0-9]{6}$/.test(text(body?.orderNumber, 32))) throw new Error('Nomor pesanan tidak valid.');
  if (!Array.isArray(rawItems) || rawItems.length < 1 || rawItems.length > 50) throw new Error('Isi keranjang tidak valid.');
  if (!SHIPPING_TYPES.has(shippingType)) throw new Error('Metode pengiriman tidak valid.');
  if (!requiredBuyerFields.every((field) => text(buyer[field]))) throw new Error('Data pembeli belum lengkap.');
  if (!/^\+?\d{9,15}$/.test(text(buyer.whatsapp).replace(/[\s-]/g, ''))) throw new Error('Nomor WhatsApp tidak valid.');
  if (shippingType === 'JNE' && !/^\d{5}$/.test(text(buyer.postal))) throw new Error('Kode pos tidak valid.');
  if (buyer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(buyer.email))) throw new Error('Email tidak valid.');
  if (!PAYMENT_METHODS.has(body?.paymentMethod)) throw new Error('Metode pembayaran tidak valid.');
  if (shippingType === 'JNE' && !body?.shippingService) throw new Error('Layanan pengiriman tidak valid.');
  if (shippingType === 'Ambil di kantor' && body?.shippingService) throw new Error('Layanan pengiriman tidak valid.');
  if (!Number.isFinite(shippingFee) || shippingFee < 0 || shippingFee > 5_000_000) throw new Error('Ongkos kirim tidak valid.');

  const catalog = new Map([...DEFAULT_PRODUCTS, MAIN_PROMO_PRODUCT, ...catalogProducts].map((product) => [product.slug, product]));
  const requestedIds = new Set();
  const items = rawItems.map((rawItem) => {
    const id = text(rawItem?.id, 80);
    const qty = Number(rawItem?.qty);
    if (!/^[a-z0-9-]+$/.test(id) || !Number.isInteger(qty) || qty < 1 || qty > 1000) throw new Error('Item keranjang tidak valid.');
    if (requestedIds.has(id)) throw new Error('Item keranjang duplikat tidak valid.');
    requestedIds.add(id);
    const product = catalog.get(id);
    if (!product || product.active === false) throw new Error(`Produk ${id} tidak tersedia.`);
    if (Number.isFinite(product.stock) && qty > product.stock) throw new Error(`Stok ${product.name} tidak mencukupi.`);
    return { id, name: text(product.name, 120), price: Number(product.price), qty, lineTotal: Number(product.price) * qty };
  });
  const totalQty = items.reduce((total, item) => total + item.qty, 0);
  if (totalQty > 1000) throw new Error('Jumlah produk tidak valid.');
  const normalTotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const promoItem = items.find((item) => item.id === MAIN_PROMO_PRODUCT.slug);
  const discountTotal = promoItem && promoItem.qty >= 5 ? Math.round(promoItem.lineTotal * 0.2) : 0;
  const productTotal = normalTotal - discountTotal;
  // ponytail: tariff comes from the bundled JNE dataset; replace with a server-side JNE quote API when credentials exist.
  const shippingTotal = shippingFee;

  return {
    orderNumber: text(body.orderNumber, 32),
    buyer: {
      name: text(buyer.name, 100), whatsapp: text(buyer.whatsapp, 24), email: text(buyer.email, 160),
      address: text(buyer.address, 300), city: text(buyer.city, 100), village: text(buyer.village, 100),
      district: text(buyer.district, 100), province: text(buyer.province, 100), postal: text(buyer.postal, 5), note: text(buyer.note, 300),
    },
    cart: { items, totalQty },
    shippingType,
    shippingService: body.shippingService ? {
      code: text(body.shippingService.code, 8), name: text(body.shippingService.name, 80),
      totalFee: shippingTotal, eta: text(body.shippingService.eta, 40),
    } : null,
    paymentMethod: body.paymentMethod,
    pricing: { normalTotal, discountTotal, productTotal, shippingTotal, grandTotal: productTotal + shippingTotal },
    status: 'PAYMENT_REPORTED', createdAt: new Date(), updatedAt: new Date(),
  };
}

router.post('/', async (req, res) => {
  try {
    const collection = ordersCollection();
    const requestedIds = Array.isArray(req.body?.cart?.items) ? req.body.cart.items.map((item) => text(item?.id, 80)) : [];
    const catalogProducts = collection && requestedIds.length
      ? await getDB().collection('products').find({ slug: { $in: requestedIds }, active: true }).toArray()
      : [];
    const order = buildOrder(req.body, catalogProducts);
    const result = collection ? await collection.insertOne(order) : await localOrderStore.insert(order);
    return res.status(201).json({ success: true, message: 'Pesanan berhasil dibuat.', orderId: result.insertedId || order.orderNumber, orderNumber: order.orderNumber });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: 'Nomor pesanan sudah digunakan. Silakan ulangi.' });
    if (error instanceof Error && /valid|lengkap|tersedia|stok/i.test(error.message)) return res.status(400).json({ success: false, message: error.message });
    console.error('Error creating order:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Pesanan belum dapat disimpan.' });
  }
});

router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const collection = ordersCollection();
    const orders = collection ? await collection.find({}).sort({ createdAt: -1 }).limit(100).toArray() : (await localOrderStore.list()).slice(0, 100);
    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching orders:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Data pesanan belum dapat dimuat.' });
  }
});

router.get('/analytics/summary', async (_req, res) => {
  try {
    const collection = ordersCollection();
    const orders = collection ? await collection.find({}).toArray() : await localOrderStore.list();
    const summary = orders.reduce((result, order) => {
      result.totalOrders += 1;
      result.totalRevenue += Number(order.pricing?.grandTotal || 0);
      result.totalPackages += Number(order.cart?.totalQty || 0);
      if (['PAID', 'PROCESSED', 'SHIPPED', 'COMPLETED', 'DONE'].includes(order.status)) result.paidCount += 1;
      else result.pendingCount += 1;
      return result;
    }, { totalOrders: 0, totalRevenue: 0, totalPackages: 0, pendingCount: 0, paidCount: 0 });
    return res.json({ success: true, summary });
  } catch (error) {
    console.error('Error fetching analytics:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Ringkasan belum dapat dimuat.' });
  }
});

router.get('/:orderNumber', async (req, res) => {
  try {
    const collection = ordersCollection();
    const orderNumber = text(req.params.orderNumber, 32);
    const order = collection ? await collection.findOne({ orderNumber }) : await localOrderStore.find(orderNumber);
    return order ? res.json({ success: true, order }) : res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan.' });
  } catch (error) {
    console.error('Error fetching order:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Pesanan belum dapat dimuat.' });
  }
});

router.patch('/:orderNumber/status', async (req, res) => {
  const status = text(req.body?.status, 32);
  if (!ORDER_STATUSES.has(status)) return res.status(400).json({ success: false, message: 'Status pesanan tidak valid.' });
  try {
    const collection = ordersCollection();
    const matched = collection
      ? (await collection.updateOne({ orderNumber: text(req.params.orderNumber, 32) }, { $set: { status, updatedAt: new Date() } })).matchedCount > 0
      : await localOrderStore.updateStatus(text(req.params.orderNumber, 32), status);
    return matched
      ? res.json({ success: true, message: 'Status pesanan diperbarui.' })
      : res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan.' });
  } catch (error) {
    console.error('Error updating status:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Status belum dapat diperbarui.' });
  }
});

export default router;
