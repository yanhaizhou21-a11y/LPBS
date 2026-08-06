import { Router } from 'express';
import { getDB } from '../config/db.js';
import { requireAdmin } from './authRoutes.js';
const router = Router();
export const PRODUCT_CATEGORIES = new Set(['hortikultura', 'pangan', 'bibit-tanaman', 'distributorship']);
const text = (value, max = 180) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-').slice(0, 80);
export function buildProduct(body) {
  const name = text(body?.name, 120), category = text(body?.category, 40), price = Number(body?.price), stock = Number(body?.stock), description = text(body?.description, 500), imageUrl = text(body?.imageUrl, 500);
  if (name.length < 3) throw new Error('Nama produk minimal 3 karakter.');
  if (!PRODUCT_CATEGORIES.has(category)) throw new Error('Kategori produk tidak valid.');
  if (!Number.isInteger(price) || price < 0 || price > 1_000_000_000) throw new Error('Harga produk tidak valid.');
  if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) throw new Error('Stok produk tidak valid.');
  if (description.length < 10) throw new Error('Deskripsi produk minimal 10 karakter.');
  if (imageUrl && !/^https?:\/\//i.test(imageUrl)) throw new Error('URL gambar harus menggunakan HTTP atau HTTPS.');
  const now = new Date(); return { slug: slugify(name), name, category, price, stock, description, imageUrl, active: body?.active !== false, createdAt: now, updatedAt: now };
}
router.get('/', async (req, res) => { const category = text(req.query?.category, 40); if (category && !PRODUCT_CATEGORIES.has(category)) return res.status(400).json({ success: false, message: 'Kategori produk tidak valid.' }); try { const products = await getDB().collection('products').find({ active: true, ...(category ? { category } : {}) }).sort({ createdAt: -1 }).limit(200).toArray(); return res.json({ success: true, products }); } catch (error) { console.error('Error fetching products:', error instanceof Error ? error.message : error); return res.status(503).json({ success: false, message: 'Katalog produk belum dapat dimuat.' }); } });
router.get('/admin', requireAdmin, async (_req, res) => { try { const products = await getDB().collection('products').find({}).sort({ createdAt: -1 }).limit(200).toArray(); return res.json({ success: true, products }); } catch (error) { console.error('Error fetching admin products:', error instanceof Error ? error.message : error); return res.status(500).json({ success: false, message: 'Data produk belum dapat dimuat.' }); } });
router.post('/', requireAdmin, async (req, res) => { try { const product = buildProduct(req.body); const result = await getDB().collection('products').insertOne(product); return res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan.', product: { ...product, _id: result.insertedId } }); } catch (error) { if (error?.code === 11000) return res.status(409).json({ success: false, message: 'Nama produk sudah digunakan.' }); if (error instanceof Error && /produk|karakter|URL gambar/.test(error.message)) return res.status(400).json({ success: false, message: error.message }); console.error('Error creating product:', error instanceof Error ? error.message : error); return res.status(500).json({ success: false, message: 'Produk belum dapat disimpan.' }); } });
export default router;
