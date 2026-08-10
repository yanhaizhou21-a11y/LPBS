export const PRODUCT_CATEGORIES = [
  { id: 'hortikultura', label: 'Benih Hortikultura Botani', labelEn: 'Botani Horticultural Seeds' },
  { id: 'pangan', label: 'Benih Pangan Botani', labelEn: 'Botani Food Crop Seeds' },
  { id: 'bibit-tanaman', label: 'Bibit Tanaman', labelEn: 'Plant Seedlings' },
  { id: 'distributorship', label: 'Produk Distributorship', labelEn: 'Distribution Products' },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]['id'];

export interface Product {
  slug: string;
  name: string;
  nameEn?: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description: string;
  descriptionEn?: string;
  imageUrl?: string;
  active?: boolean;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    slug: 'benih-bayam-rosa',
    name: 'Benih Bayam Rosa Unggul',
    nameEn: 'Rosa Spinach Seeds',
    category: 'hortikultura',
    price: 20000,
    stock: 48,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80',
    description: 'Benih bayam hijau pilihan dengan daya kecambah >90%, berdaun tebal dan renyah siap panen 20-25 hari.',
    descriptionEn: 'Selected spinach seeds for home gardens and commercial cultivation.',
  },
  {
    slug: 'cabai-besar-anies-ipb',
    name: 'Cabai Besar Anies IPB',
    nameEn: 'Anies IPB Large Chili Seeds',
    category: 'hortikultura',
    price: 25000,
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80',
    description: 'Varietas cabai merah besar hasil riset IPB University dengan ketahanan tinggi terhadap penyakit antraknosa.',
    descriptionEn: 'An IPB large chili variety developed for consistent growth and disease resistance.',
  },
  {
    slug: 'jagung-manis-sasaka',
    name: 'Jagung Manis Sasaka',
    nameEn: 'Sasaka Sweet Corn Seeds',
    category: 'hortikultura',
    price: 22000,
    stock: 27,
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
    description: 'Benih jagung manis berbulir padat dan kadar gula tinggi, sangat cocok untuk kebun dan usaha kuliner.',
    descriptionEn: 'Sweet corn seeds for home plots and commercial cultivation with high brix sweetness.',
  },
  {
    slug: 'padi-ipb-9g',
    name: 'Benih Padi IPB 9G',
    nameEn: 'IPB 9G Rice Seeds',
    category: 'pangan',
    price: 85000,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80',
    description: 'Benih pangan adaptif lahan kering dan sawah irigasi untuk mendukung produktivitas panen nasional.',
    descriptionEn: 'Adaptive food-crop seeds designed to improve farm productivity across multiple soil types.',
  },
  {
    slug: 'bibit-tanaman-buah',
    name: 'Bibit Tanaman Buah Tabulampot',
    nameEn: 'Fruit Plant Seedlings',
    category: 'bibit-tanaman',
    price: 45000,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80',
    description: 'Bibit tanaman buah siap tanam dalam pot untuk pekarangan rumah perkotaan yang hemat ruang.',
    descriptionEn: 'Selected fruit plant seedlings for home gardens and urban container planting.',
  },
  {
    slug: 'provibio-botani',
    name: 'Pupuk & Nutrisi Organik Provibio',
    nameEn: 'Provibio Botani Organic Nutrient',
    category: 'distributorship',
    price: 55000,
    stock: 21,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    description: 'Probiotik tanaman alami untuk mempercepat perakaran, menyuburkan daun, dan meningkatkan imunitas tanaman.',
    descriptionEn: 'Natural plant probiotics for faster rooting, leaf vigor, and natural plant immunity.',
  },
];

export const categoryLabel = (id: ProductCategory, language: 'id' | 'en' = 'id') => {
  const category = PRODUCT_CATEGORIES.find((item) => item.id === id);
  return (language === 'en' ? category?.labelEn : category?.label) || id;
};
