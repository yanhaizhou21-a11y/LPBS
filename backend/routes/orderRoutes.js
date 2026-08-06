import { Router } from 'express';
import { getDB } from '../config/db.js';
import { requireAdmin } from './authRoutes.js';

const router = Router();
const ORDER_STATUSES = new Set(['PENDING_PAYMENT', 'PAID', 'PROCESSED', 'SHIPPED', 'COMPLETED']);
const PAYMENT_METHODS = new Set(['QRIS', 'BSI', 'BNI', 'BRI']);
const text = (value, max = 160) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export function buildOrder(body) {
  const totalQty = Number(body?.cart?.totalQty);
  const buyer = body?.buyer || {};
  const shippingFee = Number(body?.shippingService?.totalFee || 0);
  const requiredBuyerFields = ['name', 'whatsapp', 'address', 'city', 'village', 'district', 'province', 'postal'];

  if (!/^BTS-\d{8}-[A-Z0-9]{6}$/.test(text(body?.orderNumber, 32))) throw new Error('Nomor pesanan tidak valid.');
  if (!Number.isInteger(totalQty) || totalQty < 1 || totalQty > 1000) throw new Error('Jumlah paket tidak valid.');
  if (!requiredBuyerFields.every((field) => text(buyer[field]))) throw new Error('Data pembeli belum lengkap.');
  if (!/^\+?\d{9,15}$/.test(text(buyer.whatsapp).replace(/[\s-]/g, ''))) throw new Error('Nomor WhatsApp tidak valid.');
  if (!/^\d{5}$/.test(text(buyer.postal))) throw new Error('Kode pos tidak valid.');
  if (buyer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(buyer.email))) throw new Error('Email tidak valid.');
  if (!PAYMENT_METHODS.has(body?.paymentMethod)) throw new Error('Metode pembayaran tidak valid.');
  if (!Number.isFinite(shippingFee) || shippingFee < 0 || shippingFee > 5_000_000) throw new Error('Ongkos kirim tidak valid.');

  const normalTotal = totalQty * 20_000;
  const productTotal = totalQty >= 5 ? normalTotal * 0.8 : normalTotal;
  // ponytail: tariff comes from the bundled JNE dataset; replace with a server-side JNE quote API when credentials exist.
  const shippingTotal = shippingFee;

  return {
    orderNumber: text(body.orderNumber, 32),
    buyer: {
      name: text(buyer.name, 100), whatsapp: text(buyer.whatsapp, 24), email: text(buyer.email, 160),
      address: text(buyer.address, 300), city: text(buyer.city, 100), village: text(buyer.village, 100),
      district: text(buyer.district, 100), province: text(buyer.province, 100), postal: text(buyer.postal, 5), note: text(buyer.note, 300),
    },
    cart: { totalQty },
    shippingService: body.shippingService ? {
      code: text(body.shippingService.code, 8), name: text(body.shippingService.name, 80),
      totalFee: shippingTotal, eta: text(body.shippingService.eta, 40),
    } : null,
    paymentMethod: body.paymentMethod,
    pricing: { productTotal, shippingTotal, grandTotal: productTotal + shippingTotal },
    status: 'PENDING_PAYMENT', createdAt: new Date(), updatedAt: new Date(),
  };
}

router.post('/', async (req, res) => {
  try {
    const order = buildOrder(req.body);
    const result = await getDB().collection('orders').insertOne(order);
    return res.status(201).json({ success: true, message: 'Pesanan berhasil dibuat.', orderId: result.insertedId, orderNumber: order.orderNumber });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: 'Nomor pesanan sudah digunakan. Silakan ulangi.' });
    if (error instanceof Error && (error.message.endsWith('valid.') || error.message.includes('lengkap'))) return res.status(400).json({ success: false, message: error.message });
    console.error('Error creating order:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Pesanan belum dapat disimpan.' });
  }
});

router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const orders = await getDB().collection('orders').find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching orders:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Data pesanan belum dapat dimuat.' });
  }
});

router.get('/analytics/summary', async (_req, res) => {
  try {
    const orders = await getDB().collection('orders').find({}).toArray();
    const summary = orders.reduce((result, order) => {
      result.totalOrders += 1;
      result.totalRevenue += Number(order.pricing?.grandTotal || 0);
      result.totalPackages += Number(order.cart?.totalQty || 0);
      if (['PAID', 'PROCESSED', 'SHIPPED', 'COMPLETED'].includes(order.status)) result.paidCount += 1;
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
    const order = await getDB().collection('orders').findOne({ orderNumber: text(req.params.orderNumber, 32) });
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
    const result = await getDB().collection('orders').updateOne(
      { orderNumber: text(req.params.orderNumber, 32) },
      { $set: { status, updatedAt: new Date() } }
    );
    return result.matchedCount
      ? res.json({ success: true, message: 'Status pesanan diperbarui.' })
      : res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan.' });
  } catch (error) {
    console.error('Error updating status:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Status belum dapat diperbarui.' });
  }
});

export default router;
