import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Language = 'id' | 'en';
const messages = {
  id: {
    'nav.home': 'Beranda', 'nav.products': 'Produk', 'nav.opportunity': 'Peluang', 'nav.stories': 'Cerita petani', 'nav.about': 'Tentang kami',
    'nav.cart': 'Keranjang', 'nav.order': 'Pesan', 'nav.orderNow': 'Pesan sekarang', 'nav.openMenu': 'Buka menu', 'nav.closeMenu': 'Tutup menu',
    'nav.primary': 'Navigasi utama', 'nav.secondary': 'Navigasi dan aksi pesanan', 'nav.mobile': 'Menu navigasi mobile',
    'nav.homepages': 'Homepage', 'nav.homepagesDescription': 'Pilih tampilan yang paling sesuai untuk Anda', 'nav.homeOne': 'Beranda utama',
    'nav.homeOneDescription': 'Peluang usaha dan paket benih', 'nav.homeTwo': 'Panduan bertanam', 'nav.homeTwoDescription': 'Masalah, solusi, dan hasil tanam',
    'nav.openHomepages': 'Buka daftar homepage', 'nav.closeHomepages': 'Tutup daftar homepage', 'nav.currentPage': 'Halaman aktif',
    'footer.tagline': 'Benih baik, tumbuh bersama.', 'footer.description': 'Benih tanaman dan sayuran bersertifikat untuk pekebun rumahan, komunitas, dan pelaku usaha tani Indonesia.',
    'footer.trust': 'Checkout tanpa akun. Data digunakan untuk memproses pesanan.', 'footer.explore': 'Jelajahi', 'footer.business': 'Peluang usaha',
    'footer.company': 'Tentang perusahaan', 'footer.promo': 'Promo 5 paket', 'footer.faq': 'Pertanyaan umum', 'footer.privacy': 'Kebijakan privasi',
    'footer.contact': 'Hubungi kami', 'footer.shipping': 'Pengiriman dari Bogor via JNE', 'footer.rights': 'Hak cipta dilindungi.',
    'cookie.title': 'Pemberitahuan Cookie & Privasi', 'cookie.body': 'Kami menggunakan cookie lokal untuk menyimpan keranjang belanja dan preferensi pesanan Anda.',
    'cookie.accept': 'Setuju & Lanjutkan', 'cookie.decline': 'Tolak', 'cookie.close': 'Tutup pemberitahuan cookie',
    'catalog.back': 'Kembali ke beranda', 'catalog.kicker': 'Katalog Botani Seed', 'catalog.title': 'Temukan benih untuk kebutuhan tanam Anda.',
    'catalog.subtitle': 'Kategori mengikuti katalog resmi PT Botani Seed Indonesia, dengan pencarian dan filter yang lebih cepat.',
    'catalog.featured': 'Produk pilihan', 'catalog.found': '{count} produk ditemukan', 'catalog.search': 'Cari nama produk…', 'catalog.all': 'Semua',
    'catalog.inStock': 'Stok {count}', 'catalog.outOfStock': 'Stok habis', 'catalog.add': 'Beli sekarang', 'catalog.empty': 'Produk belum ditemukan',
    'catalog.emptyHelp': 'Coba kategori atau kata pencarian lainnya.', 'catalog.ask': 'Tanya tentang {name}',
    'admin.catalog': 'Manajemen katalog', 'admin.add': 'Tambah produk', 'admin.edit': 'Edit produk', 'admin.saved': 'Katalog tersimpan',
    'admin.list': 'Daftar produk', 'admin.nameId': 'Nama produk (Indonesia)', 'admin.nameEn': 'Nama produk (English)', 'admin.category': 'Kategori',
    'admin.price': 'Harga', 'admin.stock': 'Stok', 'admin.descriptionId': 'Deskripsi (Indonesia)', 'admin.descriptionEn': 'Deskripsi (English)',
    'admin.image': 'URL gambar', 'admin.optional': 'opsional', 'admin.save': 'Simpan perubahan', 'admin.saving': 'Menyimpan…', 'admin.cancel': 'Batal',
    'admin.create': 'Tambah produk', 'admin.allCategories': 'Semua kategori', 'admin.empty': 'Belum ada produk pada kategori ini.',
    'admin.active': 'Aktif', 'admin.inactive': 'Nonaktif', 'admin.editAction': 'Edit', 'admin.disable': 'Nonaktifkan', 'admin.restore': 'Aktifkan kembali',
    'admin.created': 'Produk berhasil ditambahkan ke katalog.', 'admin.updated': 'Produk berhasil diperbarui.', 'admin.disabled': 'Produk dinonaktifkan dari katalog.',
    'admin.restored': 'Produk diaktifkan kembali.', 'admin.confirmDisable': 'Nonaktifkan produk ini dari katalog publik?', 'admin.loadError': 'Data produk belum dapat dimuat.',
  },
  en: {
    'nav.home': 'Home', 'nav.products': 'Products', 'nav.opportunity': 'Opportunity', 'nav.stories': 'Farmer stories', 'nav.about': 'About us',
    'nav.cart': 'Cart', 'nav.order': 'Order', 'nav.orderNow': 'Order now', 'nav.openMenu': 'Open menu', 'nav.closeMenu': 'Close menu',
    'nav.primary': 'Primary navigation', 'nav.secondary': 'Navigation and order actions', 'nav.mobile': 'Mobile navigation menu',
    'nav.homepages': 'Homepage', 'nav.homepagesDescription': 'Choose the experience that works best for you', 'nav.homeOne': 'Main homepage',
    'nav.homeOneDescription': 'Business opportunity and seed bundles', 'nav.homeTwo': 'Growing guide', 'nav.homeTwoDescription': 'Growing challenges, solutions, and results',
    'nav.openHomepages': 'Open homepage list', 'nav.closeHomepages': 'Close homepage list', 'nav.currentPage': 'Current page',
    'footer.tagline': 'Better seeds, growing together.', 'footer.description': 'Certified plant and vegetable seeds for home growers, communities, and farming businesses.',
    'footer.trust': 'No account required at checkout. Your data is used to process orders.', 'footer.explore': 'Explore', 'footer.business': 'Business opportunity',
    'footer.company': 'About the company', 'footer.promo': '5-pack promotion', 'footer.faq': 'Frequently asked questions', 'footer.privacy': 'Privacy policy',
    'footer.contact': 'Contact us', 'footer.shipping': 'Ships from Bogor via JNE', 'footer.rights': 'All rights reserved.',
    'cookie.title': 'Cookie & Privacy Notice', 'cookie.body': 'We use local cookies to save your shopping cart and order preferences.',
    'cookie.accept': 'Accept & Continue', 'cookie.decline': 'Decline', 'cookie.close': 'Close cookie notice',
    'catalog.back': 'Back to home', 'catalog.kicker': 'Botani Seed Catalog', 'catalog.title': 'Find the right seeds for your growing needs.',
    'catalog.subtitle': 'Browse PT Botani Seed Indonesia’s official product categories with fast search and filters.',
    'catalog.featured': 'Featured products', 'catalog.found': '{count} products found', 'catalog.search': 'Search products…', 'catalog.all': 'All',
    'catalog.inStock': '{count} in stock', 'catalog.outOfStock': 'Out of stock', 'catalog.add': 'Buy now', 'catalog.empty': 'No products found',
    'catalog.emptyHelp': 'Try another category or search term.', 'catalog.ask': 'Ask about {name}',
    'admin.catalog': 'Catalog management', 'admin.add': 'Add product', 'admin.edit': 'Edit product', 'admin.saved': 'Saved catalog',
    'admin.list': 'Product list', 'admin.nameId': 'Product name (Indonesian)', 'admin.nameEn': 'Product name (English)', 'admin.category': 'Category',
    'admin.price': 'Price', 'admin.stock': 'Stock', 'admin.descriptionId': 'Description (Indonesian)', 'admin.descriptionEn': 'Description (English)',
    'admin.image': 'Image URL', 'admin.optional': 'optional', 'admin.save': 'Save changes', 'admin.saving': 'Saving…', 'admin.cancel': 'Cancel',
    'admin.create': 'Add product', 'admin.allCategories': 'All categories', 'admin.empty': 'No products in this category yet.',
    'admin.active': 'Active', 'admin.inactive': 'Inactive', 'admin.editAction': 'Edit', 'admin.disable': 'Disable', 'admin.restore': 'Restore',
    'admin.created': 'Product added to the catalog.', 'admin.updated': 'Product updated successfully.', 'admin.disabled': 'Product removed from the public catalog.',
    'admin.restored': 'Product restored to the public catalog.', 'admin.confirmDisable': 'Remove this product from the public catalog?', 'admin.loadError': 'Product data could not be loaded.',
  },
} as const;

export type MessageKey = keyof typeof messages.id;
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (key: MessageKey, values?: Record<string, string | number>) => string } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('botani_language') === 'en' ? 'en' : 'id');
  useEffect(() => { localStorage.setItem('botani_language', language); document.documentElement.lang = language; }, [language]);
  const t = (key: MessageKey, values: Record<string, string | number> = {}) => {
    let output: string = messages[language][key];
    for (const [name, value] of Object.entries(values)) output = output.replace(`{${name}}`, String(value));
    return output;
  };
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
