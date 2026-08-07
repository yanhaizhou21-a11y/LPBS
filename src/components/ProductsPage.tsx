import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Leaf, MessageCircle, PackageSearch, Search, ShoppingCart } from 'lucide-react';
import { FEATURED_PRODUCTS, PRODUCT_CATEGORIES, Product, ProductCategory, categoryLabel } from '../data/products';
import { useLanguage } from '../i18n';

export function ProductsPage({ onGoHome, onAddToCart, onOpenCart }: { onGoHome: () => void; onAddToCart: (product: Product) => void; onOpenCart: () => void }) {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [category, setCategory] = useState<'all' | ProductCategory>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/products').then((response) => response.ok ? response.json() : null).then((data) => {
      if (!data?.products?.length) return;
      const merged = new Map(FEATURED_PRODUCTS.map((product) => [product.slug, product]));
      data.products.forEach((product: Product) => merged.set(product.slug, { ...merged.get(product.slug), ...product }));
      setProducts([...merged.values()]);
    }).catch(() => undefined);
  }, []);

  const localize = (product: Product) => language === 'en'
    ? { name: product.nameEn || product.name, description: product.descriptionEn || product.description }
    : { name: product.name, description: product.description };
  const filtered = useMemo(() => products.filter((product) => {
    const content = localize(product);
    return (category === 'all' || product.category === category) && (!query.trim() || `${content.name} ${content.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  }), [category, language, products, query]);

  return <main className="products-page">
    <section className="products-hero"><div className="container"><button className="products-back" onClick={onGoHome}><ArrowLeft size={18} /> {t('catalog.back')}</button><span className="section-subtitle">{t('catalog.kicker')}</span><h1>{t('catalog.title')}</h1><p>{t('catalog.subtitle')}</p></div></section>
    <section className="products-catalog container" aria-labelledby="catalog-title">
      <div className="products-toolbar"><div><h2 id="catalog-title">{t('catalog.featured')}</h2><p>{t('catalog.found', { count: filtered.length })}</p></div><label className="products-search"><Search size={18} /><span className="sr-only">{t('catalog.search')}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('catalog.search')} /></label></div>
      <div className="category-filter" aria-label="Category filter"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>{t('catalog.all')}</button>{PRODUCT_CATEGORIES.map((item) => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>{language === 'en' ? item.labelEn : item.label}</button>)}</div>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => {
        const content = localize(product);
        return <article className="catalog-product-card" key={product.slug}><div className="catalog-product-visual">{product.imageUrl ? <img src={product.imageUrl} alt={content.name} loading="lazy" /> : <Leaf size={46} aria-hidden="true" />}<span>{categoryLabel(product.category, language)}</span></div><div className="catalog-product-body"><h2>{content.name}</h2><p>{content.description}</p><div className="catalog-product-meta"><strong>Rp {product.price.toLocaleString('id-ID')}</strong><span>{product.stock > 0 ? t('catalog.inStock', { count: product.stock }) : t('catalog.outOfStock')}</span></div><div className="catalog-product-actions"><button type="button" disabled={product.stock <= 0} onClick={() => { onAddToCart({ ...product, name: content.name }); onOpenCart(); }}><ShoppingCart size={18} /> {t('catalog.add')}</button><a href={`https://wa.me/6281299450708?text=${encodeURIComponent(language === 'en' ? `Hello Botani Seed, I am interested in ${content.name}.` : `Halo Botani Seed, saya tertarik dengan ${content.name}.`)}`} target="_blank" rel="noreferrer" aria-label={t('catalog.ask', { name: content.name })}><MessageCircle size={18} /></a></div></div></article>;
      })}</div> : <div className="products-empty"><PackageSearch size={38} /><h2>{t('catalog.empty')}</h2><p>{t('catalog.emptyHelp')}</p></div>}
    </section>
  </main>;
}
