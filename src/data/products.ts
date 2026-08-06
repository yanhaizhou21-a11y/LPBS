export const PRODUCT_CATEGORIES = [
  { id: 'hortikultura', label: 'Benih Hortikultura Botani' },
  { id: 'pangan', label: 'Benih Pangan Botani' },
  { id: 'bibit-tanaman', label: 'Bibit Tanaman' },
  { id: 'distributorship', label: 'Produk Distributorship' },
] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number]['id'];
export interface Product { slug: string; name: string; category: ProductCategory; price: number; stock: number; description: string; imageUrl?: string; active?: boolean; }
export const FEATURED_PRODUCTS: Product[] = [
  { slug: 'benih-bayam-rosa', name: 'Benih Bayam Rosa', category: 'hortikultura', price: 20000, stock: 48, description: 'Benih bayam pilihan untuk budidaya pekarangan dan kebun produksi.' },
  { slug: 'cabai-besar-anies-ipb', name: 'Cabai Besar Anies IPB', category: 'hortikultura', price: 25000, stock: 32, description: 'Varietas cabai besar hasil inovasi IPB untuk pertumbuhan seragam.' },
  { slug: 'jagung-manis-sasaka', name: 'Jagung Manis Sasaka', category: 'hortikultura', price: 22000, stock: 27, description: 'Benih jagung manis untuk lahan pekarangan maupun budidaya usaha.' },
  { slug: 'padi-ipb-9g', name: 'Benih Padi IPB 9G', category: 'pangan', price: 85000, stock: 18, description: 'Benih pangan adaptif untuk mendukung produktivitas pertanian.' },
  { slug: 'bibit-tanaman-buah', name: 'Bibit Tanaman Buah', category: 'bibit-tanaman', price: 45000, stock: 14, description: 'Pilihan bibit tanaman untuk kebun rumah dan pengembangan lahan.' },
  { slug: 'provibio-botani', name: 'Provibio Botani', category: 'distributorship', price: 55000, stock: 21, description: 'Produk pendukung budidaya untuk perawatan tanaman yang lebih praktis.' },
];
export const categoryLabel = (id: ProductCategory) => PRODUCT_CATEGORIES.find((item) => item.id === id)?.label || id;
