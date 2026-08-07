import React, { createContext, useContext, useState } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Top Bar & Navigation
    welcomeBack: 'Selamat Datang Kembali!',
    dashboard: 'Dashboard',
    products: 'Produk',
    order: 'Pesanan',
    inventory: 'Inventaris',
    settings: 'Pengaturan',
    logout: 'Keluar',
    searchPlaceholder: 'Cari produk atau pesanan...',
    
    // Executive Summary / Dashboard
    executiveSummary: 'Ringkasan Eksekutif',
    executiveSubtitle: 'Ikhtisar kinerja penjualan dan metrik toko',
    downloadReport: 'Unduh Laporan',
    totalRevenue: 'Total Pendapatan',
    totalOrders: 'Total Pesanan',
    avgOrderValue: 'Rata-rata Nilai Pesanan',
    conversionRate: 'Tingkat Konversi',
    salesRevenueOverview: 'Ikhtisar Pendapatan Penjualan',
    monthlyRevenueTrends: 'Tren pendapatan bulanan',
    recentActivity: 'Aktivitas Terkini',
    thisMonth: 'bulan ini',
    vsLastWeek: 'vs minggu lalu',
    improvement: 'peningkatan',
    selectFormat: 'Pilih Format Laporan:',
    formatPdf: '1. Document PDF (.pdf)',
    formatExcel: '2. Spreadsheet Excel (.excel / .csv)',
    
    // Products
    productsCatalog: 'Katalog Produk',
    productsSubtitle: 'Kelola inventaris produk, harga, dan kategori',
    addProduct: 'Tambah Produk',
    allCategories: 'Semua Kategori',
    seeds: 'Benih',
    fertilizers: 'Pupuk',
    tools: 'Peralatan',
    productName: 'Nama Produk',
    sku: 'SKU',
    category: 'Kategori',
    price: 'Harga',
    stock: 'Stok',
    status: 'Status',
    action: 'Aksi',
    inStock: 'Tersedia',
    lowStock: 'Stok Menipis',
    outOfStock: 'Stok Habis',
    units: 'unit',
    
    // Order
    orderManagement: 'Manajemen Pesanan',
    orderSubtitle: 'Lacak, proses, dan penuhi pesanan pelanggan',
    all: 'Semua',
    pending: 'Menunggu',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Terkirim',
    orderId: 'ID Pesanan',
    customer: 'Pelanggan',
    date: 'Tanggal',
    items: 'Item',
    totalAmount: 'Total Pembayaran',
    
    // Inventory
    inventoryStatus: 'Status Inventaris',
    inventorySubtitle: 'Pemantauan stok real-time & ambang batas pemesanan ulang',
    totalSkus: 'Total SKU',
    lowStockAlert: 'Peringatan Stok Rendah',
    stockLevelBreakdown: 'Rincian Tingkat Stok',
    
    // Settings
    storeSettings: 'Pengaturan Toko',
    settingsSubtitle: 'Konfigurasi preferensi bisnis dan keamanan akun',
    general: 'Umum',
    storeProfile: 'Profil Toko',
    notifications: 'Notifikasi',
    security: 'Keamanan',
    storeName: 'Nama Toko',
    contactEmail: 'Email Kontak',
    currency: 'Mata Uang',
    saveChanges: 'Simpan Perubahan',
    settingsUpdated: 'Pengaturan berhasil diperbarui!',
    
    // Form Labels & Placeholders
    fullName: 'Nama Lengkap',
    fullNamePlaceholder: 'Nama lengkap Anda',
    whatsappNumber: 'Nomor WhatsApp',
    whatsappPlaceholder: 'Contoh: 081234567890',
    emailOptional: 'Email (Opsional)',
    emailAddress: 'Alamat Email',
    emailPlaceholder: 'alamat@email.com',
    fullAddress: 'Alamat Lengkap (Jalan / RT RW / No. Rumah)',
    fullAddressPlaceholder: 'Alamat domisili lengkap pengiriman',
    cityRegency: 'Kota / Kabupaten',
    cityPlaceholder: 'Contoh: Kota Bogor',
    district: 'Kecamatan',
    districtPlaceholder: 'Contoh: Bogor Barat',
    village: 'Desa / Kelurahan',
    villagePlaceholder: 'Contoh: Margajaya',
    province: 'Provinsi',
    provincePlaceholder: 'Contoh: Jawa Barat',
    postalCode: 'Kode Pos',
    postalPlaceholder: 'Contoh: 16116',
    orderNoteOptional: 'Catatan Pesanan (Opsional)',
    notePlaceholder: 'Contoh: Titipkan ke satpam jika rumah kosong',

    // Modals
    addNewProduct: 'Tambah Produk Baru',
    addNewCustomer: 'Tambah Pelanggan Baru',
    totalSpent: 'Total Belanja (Rp)',
    customerStatus: 'Status Pelanggan',
    initialStock: 'Stok Awal',
    cancel: 'Batal',
    saveProduct: 'Simpan Produk',
    saveCustomer: 'Simpan Pelanggan',

    // Checkout Modal Steps
    step1Heading: 'Data Pemesan',
    step1Desc: 'Masukkan data pengiriman yang dapat dihubungi oleh tim Botani Seed.',
    step2Heading: 'Pengiriman',
    step3Heading: 'Pembayaran',
    step4Heading: 'Detail Pembayaran',
    nextShipping: 'Lanjut ke Pengiriman',
    nextPayment: 'Lanjut ke Pembayaran',
    confirmPayment: 'Konfirmasi Pembayaran',

    // Landing Page / Navbar
    businessOpportunities: 'Peluang Usaha',
    farmerStories: 'Kisah Petani',
    companyProfile: 'Profil Perusahaan',
    promo5Packs: 'Promo 5 Paket',
    faq: 'FAQ',
    cart: 'Keranjang',
    orderNow: 'Pesan Sekarang',
  },
  en: {
    // Top Bar & Navigation
    welcomeBack: 'Welcome Back!',
    dashboard: 'Dashboard',
    products: 'Products',
    order: 'Order',
    inventory: 'Inventory',
    settings: 'Settings',
    logout: 'Log Out',
    searchPlaceholder: 'Search products or orders...',
    
    // Executive Summary / Dashboard
    executiveSummary: 'Executive Summary',
    executiveSubtitle: 'Overview of sales performance and store metrics',
    downloadReport: 'Download Report',
    totalRevenue: 'Total Revenue',
    totalOrders: 'Total Orders',
    avgOrderValue: 'Avg Order Value',
    conversionRate: 'Conversion Rate',
    salesRevenueOverview: 'Sales Revenue Overview',
    monthlyRevenueTrends: 'Monthly revenue trends',
    recentActivity: 'Recent Activity',
    thisMonth: 'this month',
    vsLastWeek: 'vs last week',
    improvement: 'improvement',
    selectFormat: 'Select Report Format:',
    formatPdf: '1. PDF Document (.pdf)',
    formatExcel: '2. Excel Spreadsheet (.excel / .csv)',
    
    // Products
    productsCatalog: 'Products Catalog',
    productsSubtitle: 'Manage product inventory, pricing, and categories',
    addProduct: 'Add Product',
    allCategories: 'All Categories',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    tools: 'Tools',
    productName: 'Product Name',
    sku: 'SKU',
    category: 'Category',
    price: 'Price',
    stock: 'Stock',
    status: 'Status',
    action: 'Action',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    units: 'units',
    
    // Order
    orderManagement: 'Order Management',
    orderSubtitle: 'Track, process, and fulfill customer orders',
    all: 'All',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    orderId: 'Order ID',
    customer: 'Customer',
    date: 'Date',
    items: 'Items',
    totalAmount: 'Total Amount',
    
    // Inventory
    inventoryStatus: 'Inventory Status',
    inventorySubtitle: 'Real-time stock monitoring & reorder thresholds',
    totalSkus: 'Total SKUs',
    lowStockAlert: 'Low Stock Alert',
    stockLevelBreakdown: 'Stock Level Breakdown',
    
    // Settings
    storeSettings: 'Store Settings',
    settingsSubtitle: 'Configure business preferences and account security',
    general: 'General',
    storeProfile: 'Store Profile',
    notifications: 'Notifications',
    security: 'Security',
    storeName: 'Store Name',
    contactEmail: 'Contact Email',
    currency: 'Currency',
    saveChanges: 'Save Changes',
    settingsUpdated: 'Settings updated successfully!',
    
    // Form Labels & Placeholders
    fullName: 'Full Name',
    fullNamePlaceholder: 'Your full name',
    whatsappNumber: 'WhatsApp Number',
    whatsappPlaceholder: 'e.g. 081234567890',
    emailOptional: 'Email (Optional)',
    emailAddress: 'Email Address',
    emailPlaceholder: 'email@example.com',
    fullAddress: 'Full Address (Street / House No.)',
    fullAddressPlaceholder: 'Complete shipping address',
    cityRegency: 'City / Regency',
    cityPlaceholder: 'e.g. City of Bogor',
    district: 'District',
    districtPlaceholder: 'e.g. West Bogor',
    village: 'Village / Sub-district',
    villagePlaceholder: 'e.g. Margajaya',
    province: 'Province',
    provincePlaceholder: 'e.g. West Java',
    postalCode: 'Postal Code',
    postalPlaceholder: 'e.g. 16116',
    orderNoteOptional: 'Order Notes (Optional)',
    notePlaceholder: 'e.g. Leave with security guard if home is empty',

    // Modals
    addNewProduct: 'Add New Product',
    addNewCustomer: 'Add New Customer',
    totalSpent: 'Total Spent (Rp)',
    customerStatus: 'Customer Status',
    initialStock: 'Initial Stock',
    cancel: 'Cancel',
    saveProduct: 'Save Product',
    saveCustomer: 'Save Customer',

    // Checkout Modal Steps
    step1Heading: 'Customer Data',
    step1Desc: 'Enter contact & shipping details for the Botani Seed team.',
    step2Heading: 'Shipping',
    step3Heading: 'Payment',
    step4Heading: 'Payment Details',
    nextShipping: 'Proceed to Shipping',
    nextPayment: 'Proceed to Payment',
    confirmPayment: 'Confirm Payment',

    // Landing Page / Navbar
    businessOpportunities: 'Business Opportunities',
    farmerStories: "Farmers' Stories",
    companyProfile: 'Company Profile',
    promo5Packs: '5 Pack Promo',
    faq: 'FAQ',
    cart: 'Cart',
    orderNow: 'Order Now',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['id']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
