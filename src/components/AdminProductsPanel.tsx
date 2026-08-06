import { FormEvent, useEffect, useState } from 'react';
import { Boxes, Plus } from 'lucide-react';
import { PRODUCT_CATEGORIES, Product, ProductCategory, categoryLabel } from '../data/products';

export function AdminProductsPanel({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<'ALL' | ProductCategory>('ALL');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', category: 'hortikultura' as ProductCategory, price: '', stock: '', description: '', imageUrl: '' });

  useEffect(() => { fetch('/api/products/admin').then(async (response) => ({ response, data: await response.json() })).then(({ response, data }) => { if (response.status === 401) return onUnauthorized(); if (data.success) setProducts(data.products || []); }).catch(() => setMessage('Data produk belum dapat dimuat.')); }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setMessage(null);
    try {
      const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }) });
      const data = await response.json(); if (response.status === 401) return onUnauthorized(); if (!response.ok) throw new Error(data.message || 'Produk belum dapat disimpan.');
      setProducts((current) => [data.product, ...current]); setForm({ name: '', category: 'hortikultura', price: '', stock: '', description: '', imageUrl: '' }); setMessage('Produk berhasil ditambahkan ke katalog.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Produk belum dapat disimpan.'); } finally { setSaving(false); }
  };
  const shown = products.filter((product) => category === 'ALL' || product.category === category);

  return <section className="admin-products-grid" aria-label="Manajemen produk">
    <form className="admin-panel admin-product-form" onSubmit={submit}><div className="admin-section-heading"><div><span>Manajemen katalog</span><h2>Tambah produk</h2></div><Plus size={22} /></div>
      <label>Nama produk<input required minLength={3} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Benih Cabai Bonita" /></label>
      <label>Kategori<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}>{PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
      <div className="admin-form-row"><label>Harga<input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label><label>Stok<input required type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label></div>
      <label>Deskripsi<textarea required minLength={10} rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><label>URL gambar <span>(opsional)</span><input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" /></label>
      {message && <p className="admin-product-message" role="status">{message}</p>}<button className="admin-primary-button" disabled={saving}><Plus size={18} /> {saving ? 'Menyimpan…' : 'Tambah produk'}</button>
    </form>
    <div className="admin-panel admin-products-list"><div className="admin-section-heading"><div><span>Katalog tersimpan</span><h2>Daftar produk</h2></div><select aria-label="Filter kategori produk" value={category} onChange={(e) => setCategory(e.target.value as 'ALL' | ProductCategory)}><option value="ALL">Semua kategori</option>{PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
      <div className="admin-product-cards">{shown.length ? shown.map((product) => <article key={product.slug}><div><strong>{product.name}</strong><span>{categoryLabel(product.category)}</span></div><div><strong>Rp {product.price.toLocaleString('id-ID')}</strong><span>Stok {product.stock}</span></div></article>) : <div className="admin-empty-products"><Boxes size={34} /><p>Belum ada produk pada kategori ini.</p></div>}</div>
    </div>
  </section>;
}
