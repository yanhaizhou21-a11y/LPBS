import { Router } from 'express';
import { getDB } from '../config/db.js';
import { requireAdmin } from './authRoutes.js';

const router = Router();
export const PRODUCT_CATEGORIES = new Set(['hortikultura', 'pangan', 'bibit-tanaman', 'distributorship']);
const text = (value, max = 180) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-').slice(0, 80);
const isInputError = (error) => error instanceof Error && /produk|karakter|deskripsi|URL gambar/i.test(error.message);

export function buildProduct(body, existing = null) {
  const name = text(body?.name, 120);
  const nameEn = text(body?.nameEn, 120);
  const category = text(body?.category, 40);
  const price = Number(body?.price);
  const stock = Number(body?.stock);
  const description = text(body?.description, 500);
  const descriptionEn = text(body?.descriptionEn, 500);
  const imageUrl = text(body?.imageUrl, 500);
  if (name.length < 3) throw new Error('Nama produk minimal 3 karakter.');
  if (nameEn && nameEn.length < 3) throw new Error('English product name must be at least 3 characters.');
  if (!PRODUCT_CATEGORIES.has(category)) throw new Error('Kategori produk tidak valid.');
  if (!Number.isInteger(price) || price < 0 || price > 1_000_000_000) throw new Error('Harga produk tidak valid.');
  if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) throw new Error('Stok produk tidak valid.');
  if (description.length < 10) throw new Error('Deskripsi produk minimal 10 karakter.');
  if (descriptionEn && descriptionEn.length < 10) throw new Error('English product description must be at least 10 characters.');
  if (imageUrl && !/^https?:\/\//i.test(imageUrl)) throw new Error('URL gambar harus menggunakan HTTP atau HTTPS.');
  const now = new Date();
  return {
    slug: existing?.slug || slugify(name), name, nameEn, category, price, stock, description, descriptionEn, imageUrl,
    active: body?.active !== false, createdAt: existing?.createdAt || now, updatedAt: now,
  };
}

router.get('/', async (req, res) => {
  const category = text(req.query?.category, 40);
  if (category && !PRODUCT_CATEGORIES.has(category)) return res.status(400).json({ success: false, message: 'Kategori produk tidak valid.' });
  try {
    const products = await getDB().collection('products').find({ active: true, ...(category ? { category } : {}) }).sort({ createdAt: -1 }).limit(200).toArray();
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error instanceof Error ? error.message : error);
    return res.status(503).json({ success: false, message: 'Katalog produk belum dapat dimuat.' });
  }
});

router.get('/admin', requireAdmin, async (_req, res) => {
  try {
    const products = await getDB().collection('products').find({}).sort({ createdAt: -1 }).limit(200).toArray();
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching admin products:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Data produk belum dapat dimuat.' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const product = buildProduct(req.body);
    const result = await getDB().collection('products').insertOne(product);
    return res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan.', product: { ...product, _id: result.insertedId } });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: 'Nama produk sudah digunakan.' });
    if (isInputError(error)) return res.status(400).json({ success: false, message: error.message });
    console.error('Error creating product:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Produk belum dapat disimpan.' });
  }
});

router.patch('/:slug', requireAdmin, async (req, res) => {
  try {
    const collection = getDB().collection('products');
    const existing = await collection.findOne({ slug: text(req.params.slug, 80) });
    if (!existing) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    const product = buildProduct(req.body, existing);
    const { _id, ...updates } = product;
    await collection.updateOne({ _id: existing._id }, { $set: updates });
    return res.json({ success: true, message: 'Produk berhasil diperbarui.', product: { ...updates, _id: existing._id } });
  } catch (error) {
    if (isInputError(error)) return res.status(400).json({ success: false, message: error.message });
    console.error('Error updating product:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Produk belum dapat diperbarui.' });
  }
});

router.delete('/:slug', requireAdmin, async (req, res) => {
  try {
    const collection = getDB().collection('products');
    const slug = text(req.params.slug, 80);
    const result = await collection.updateOne({ slug }, { $set: { active: false, updatedAt: new Date() } });
    if (!result.matchedCount) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    const product = await collection.findOne({ slug });
    return res.json({ success: true, message: 'Produk dinonaktifkan dari katalog.', product });
  } catch (error) {
    console.error('Error deleting product:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: 'Produk belum dapat dinonaktifkan.' });
  }
});

export default router;
