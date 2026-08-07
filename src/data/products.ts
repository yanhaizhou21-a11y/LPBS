export const PRODUCT_CATEGORIES = [
  { id: 'hortikultura', label: 'Benih Hortikultura Botani' },
  { id: 'pangan', label: 'Benih Pangan Botani' },
  { id: 'bibit-tanaman', label: 'Bibit Tanaman' },
  { id: 'distributorship', label: 'Produk Distributorship' },
] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number]['id'];
export interface Product { slug: string; name: string; nameEn?: string; category: ProductCategory; price: number; stock: number; description: string; descriptionEn?: string; imageUrl?: string; active?: boolean; }
export const FEATURED_PRODUCTS: Product[] = [
  { slug: 'benih-bayam-rosa', name: 'Benih Bayam Rosa', nameEn: 'Rosa Spinach Seeds', category: 'hortikultura', price: 20000, stock: 48, description: 'Benih bayam pilihan untuk budidaya pekarangan dan kebun produksi.', descriptionEn: 'Selected spinach seeds for home gardens and commercial cultivation.' },
  { slug: 'cabai-besar-anies-ipb', name: 'Cabai Besar Anies IPB', nameEn: 'Anies IPB Large Chili Seeds', category: 'hortikultura', price: 25000, stock: 32, description: 'Varietas cabai besar hasil inovasi IPB untuk pertumbuhan seragam.', descriptionEn: 'An IPB large chili variety developed for consistent growth.' },
  { slug: 'jagung-manis-sasaka', name: 'Jagung Manis Sasaka', nameEn: 'Sasaka Sweet Corn Seeds', category: 'hortikultura', price: 22000, stock: 27, description: 'Benih jagung manis untuk lahan pekarangan maupun budidaya usaha.', descriptionEn: 'Sweet corn seeds for home plots and commercial cultivation.' },
  { slug: 'padi-ipb-9g', name: 'Benih Padi IPB 9G', nameEn: 'IPB 9G Rice Seeds', category: 'pangan', price: 85000, stock: 18, description: 'Benih pangan adaptif untuk mendukung produktivitas pertanian.', descriptionEn: 'Adaptive food-crop seeds designed to improve farm productivity.' },
  { slug: 'bibit-tanaman-buah', name: 'Bibit Tanaman Buah', nameEn: 'Fruit Plant Seedlings', category: 'bibit-tanaman', price: 45000, stock: 14, description: 'Pilihan bibit tanaman untuk kebun rumah dan pengembangan lahan.', descriptionEn: 'Selected plant seedlings for home gardens and land development.' },
  { slug: 'provibio-botani', name: 'Provibio Botani', nameEn: 'Provibio Botani', category: 'distributorship', price: 55000, stock: 21, description: 'Produk pendukung budidaya untuk perawatan tanaman yang lebih praktis.', descriptionEn: 'A practical crop-support product for easier plant care.' },
];
export const categoryLabel = (id: ProductCategory) => PRODUCT_CATEGORIES.find((item) => item.id === id)?.label || id;
