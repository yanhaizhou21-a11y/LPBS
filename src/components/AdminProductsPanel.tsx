import { FormEvent, useEffect, useState } from 'react';
import { Boxes, Pencil, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { PRODUCT_CATEGORIES, Product, ProductCategory, categoryLabel } from '../data/products';
import { useLanguage } from '../i18n';
import { readJsonResponse } from '../lib/http';
import { FloatingInput } from './ui/floating-input';

type ProductForm = {
  name: string; nameEn: string; category: ProductCategory; price: string; stock: string;
  description: string; descriptionEn: string; imageUrl: string; active: boolean;
};

const EMPTY_FORM: ProductForm = { name: '', nameEn: '', category: 'hortikultura', price: '', stock: '', description: '', descriptionEn: '', imageUrl: '', active: true };

export function AdminProductsPanel({ onUnauthorized }: { onUnauthorized: () => void }) {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<'ALL' | ProductCategory>('ALL');
  const [saving, setSaving] = useState(false);
  const [actionSlug, setActionSlug] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  useEffect(() => {
    fetch('/api/products/admin').then(async (response) => {
      if (response.status === 401) return onUnauthorized();
      const data = await readJsonResponse(response, t('admin.loadError'));
      if (!response.ok) throw new Error(data.message || t('admin.loadError'));
      if (data.success) setProducts(data.products || []);
    }).catch(() => setMessage(t('admin.loadError')));
  }, [onUnauthorized]);

  const resetForm = () => { setEditingSlug(null); setForm(EMPTY_FORM); setMessage(null); };
  const startEdit = (product: Product) => {
    setEditingSlug(product.slug);
    setForm({ name: product.name, nameEn: product.nameEn || '', category: product.category, price: String(product.price), stock: String(product.stock), description: product.description, descriptionEn: product.descriptionEn || '', imageUrl: product.imageUrl || '', active: product.active !== false });
    setMessage(null);
    document.querySelector('.admin-product-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true); setMessage(null);
    try {
      const response = await fetch(editingSlug ? `/api/products/${editingSlug}` : '/api/products', {
        method: editingSlug ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
      });
      if (response.status === 401) return onUnauthorized();
      const data = await readJsonResponse(response, t('admin.loadError'));
      if (!response.ok) throw new Error(data.message || t('admin.loadError'));
      setProducts((current) => editingSlug ? current.map((product) => product.slug === editingSlug ? data.product : product) : [data.product, ...current]);
      setMessage(editingSlug ? t('admin.updated') : t('admin.created'));
      setEditingSlug(null); setForm(EMPTY_FORM);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('admin.loadError'));
    } finally { setSaving(false); }
  };

  const toggleActive = async (product: Product) => {
    const isActive = product.active !== false;
    if (isActive && !window.confirm(t('admin.confirmDisable'))) return;
    setActionSlug(product.slug); setMessage(null);
    try {
      const response = await fetch(`/api/products/${product.slug}`, isActive ? { method: 'DELETE' } : {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...product, active: true }),
      });
      if (response.status === 401) return onUnauthorized();
      const data = await readJsonResponse(response, t('admin.loadError'));
      if (!response.ok) throw new Error(data.message || t('admin.loadError'));
      setProducts((current) => current.map((item) => item.slug === product.slug ? data.product : item));
      setMessage(isActive ? t('admin.disabled') : t('admin.restored'));
      if (editingSlug === product.slug) resetForm();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('admin.loadError'));
    } finally { setActionSlug(null); }
  };

  const shown = products.filter((product) => category === 'ALL' || product.category === category);
  const displayName = (product: Product) => language === 'en' ? product.nameEn || product.name : product.name;

  return <section className="admin-products-grid" aria-label={t('admin.catalog')}>
    <form className="admin-panel admin-product-form" onSubmit={submit}>
      <div className="admin-section-heading"><div><span>{t('admin.catalog')}</span><h2>{editingSlug ? t('admin.edit') : t('admin.add')}</h2></div>{editingSlug ? <button type="button" className="admin-icon-button" onClick={resetForm} aria-label={t('admin.cancel')}><X size={21} /></button> : <Plus size={22} />}</div>
      <FloatingInput label={t('admin.nameId')} required minLength={3} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <FloatingInput label={`${t('admin.nameEn')} (${t('admin.optional')})`} minLength={3} value={form.nameEn} onChange={(event) => setForm({ ...form, nameEn: event.target.value })} />
      <label>{t('admin.category')}<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })}>{PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{language === 'en' ? item.labelEn : item.label}</option>)}</select></label>
      <div className="admin-form-row">
        <FloatingInput label={t('admin.price')} required type="number" min="0" inputMode="numeric" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
        <FloatingInput label={t('admin.stock')} required type="number" min="0" inputMode="numeric" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} />
      </div>
      <label>{t('admin.descriptionId')}<textarea required minLength={10} rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
      <label>{t('admin.descriptionEn')} <span>({t('admin.optional')})</span><textarea minLength={10} rows={4} value={form.descriptionEn} onChange={(event) => setForm({ ...form, descriptionEn: event.target.value })} /></label>
      <FloatingInput label={`${t('admin.image')} (${t('admin.optional')})`} type="url" inputMode="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
      {message && <p className="admin-product-message" role="status">{message}</p>}
      <div className="admin-form-actions"><button className="admin-primary-button" disabled={saving}>{editingSlug ? <Pencil size={18} /> : <Plus size={18} />} {saving ? t('admin.saving') : editingSlug ? t('admin.save') : t('admin.create')}</button>{editingSlug && <button type="button" className="admin-secondary-button" onClick={resetForm}>{t('admin.cancel')}</button>}</div>
    </form>
    <div className="admin-panel admin-products-list">
      <div className="admin-section-heading"><div><span>{t('admin.saved')}</span><h2>{t('admin.list')}</h2></div><select aria-label={t('admin.category')} value={category} onChange={(event) => setCategory(event.target.value as 'ALL' | ProductCategory)}><option value="ALL">{t('admin.allCategories')}</option>{PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{language === 'en' ? item.labelEn : item.label}</option>)}</select></div>
      <div className="admin-product-cards">{shown.length ? shown.map((product) => <article key={product.slug} className={product.active === false ? 'inactive' : ''}><div className="admin-product-copy"><strong>{displayName(product)}</strong><span>{categoryLabel(product.category, language)}</span><span className={`admin-product-status ${product.active === false ? 'inactive' : ''}`}>{product.active === false ? t('admin.inactive') : t('admin.active')}</span></div><div className="admin-product-meta"><strong>Rp {product.price.toLocaleString('id-ID')}</strong><span>{t('admin.stock')} {product.stock}</span></div><div className="admin-product-actions"><button type="button" onClick={() => startEdit(product)}><Pencil size={16} /> {t('admin.editAction')}</button><button type="button" className={product.active === false ? 'restore' : 'danger'} disabled={actionSlug === product.slug} onClick={() => toggleActive(product)}>{product.active === false ? <RotateCcw size={16} /> : <Trash2 size={16} />}{product.active === false ? t('admin.restore') : t('admin.disable')}</button></div></article>) : <div className="admin-empty-products"><Boxes size={34} /><p>{t('admin.empty')}</p></div>}</div>
    </div>
  </section>;
}
