import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Leaf, MessageCircle, PackageSearch, Search, ShoppingCart } from 'lucide-react';
import { FEATURED_PRODUCTS, PRODUCT_CATEGORIES, Product, ProductCategory, categoryLabel } from '../data/products';

export function ProductsPage({ onGoHome, onAddToCart, onOpenCart }: { onGoHome: () => void; onAddToCart: (product: Product) => void; onOpenCart: () => void }) {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [category, setCategory] = useState<'all' | ProductCategory>('all');
  const [query, setQuery] = useState('');
  useEffect(() => { fetch('/api/products').then((r) => r.ok ? r.json() : null).then((data) => { if (!data?.products?.length) return; const merged = new Map(FEATURED_PRODUCTS.map((p) => [p.slug, p])); data.products.forEach((p: Product) => merged.set(p.slug, p)); setProducts([...merged.values()]); }).catch(() => undefined); }, []);
  const filtered = useMemo(() => products.filter((p) => (category === 'all' || p.category === category) && (!query.trim() || `${p.name} ${p.description}`.toLowerCase().includes(query.trim().toLowerCase()))), [category, products, query]);

  return <main className="products-page">
    <section className="products-hero"><div className="container"><button className="products-back" onClick={onGoHome}><ArrowLeft size={18} /> Kembali ke beranda</button><span className="section-subtitle">Katalog Botani Seed</span><h1>Temukan benih untuk kebutuhan tanam Anda.</h1><p>Kategori mengikuti katalog resmi PT Botani Seed Indonesia, dengan pencarian dan filter yang lebih cepat.</p></div></section>
    <section className="products-catalog container" aria-labelledby="catalog-title">
      <div className="products-toolbar"><div><h2 id="catalog-title">Produk pilihan</h2><p>{filtered.length} produk ditemukan</p></div><label className="products-search"><Search size={18} /><span className="sr-only">Cari produk</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama produk…" /></label></div>
      <div className="category-filter" aria-label="Filter kategori"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>Semua</button>{PRODUCT_CATEGORIES.map((item) => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div>
      {filtered.length ? <div className="product-grid">{filtered.map((p) => <article className="catalog-product-card" key={p.slug}><div className="catalog-product-visual">{p.imageUrl ? <img src={p.imageUrl} alt={p.name} loading="lazy" /> : <Leaf size={46} aria-hidden="true" />}<span>{categoryLabel(p.category)}</span></div><div className="catalog-product-body"><h2>{p.name}</h2><p>{p.description}</p><div className="catalog-product-meta"><strong>Rp {p.price.toLocaleString('id-ID')}</strong><span>{p.stock > 0 ? `Stok ${p.stock}` : 'Stok habis'}</span></div><div className="catalog-product-actions"><button type="button" disabled={p.stock <= 0} onClick={() => { onAddToCart(p); onOpenCart(); }}><ShoppingCart size={18} /> Tambah ke cart</button><a href={`https://wa.me/6281299450708?text=${encodeURIComponent(`Halo Botani Seed, saya tertarik dengan ${p.name}.`)}`} target="_blank" rel="noreferrer" aria-label={`Tanya tentang ${p.name}`}><MessageCircle size={18} /></a></div></div></article>)}</div> : <div className="products-empty"><PackageSearch size={38} /><h2>Produk belum ditemukan</h2><p>Coba kategori atau kata pencarian lainnya.</p></div>}
    </section>
  </main>;
}
