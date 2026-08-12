import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Package,
  FileText,
  Boxes,
  Users,
  User,
  Settings,
  LogOut,
  RefreshCw,
  Moon,
  Sun,
  Bell,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  UserPlus,
  TrendingDown,
  TrendingUp,
  ArrowUpDown,
  MoreHorizontal,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  MessageCircle,
  MapPin,
  ExternalLink,
  Check,
  Sliders,
  AlertTriangle,
  X,
  CheckCircle2,
  PanelLeft,
  Filter,
  Trash2,
  Edit,
  Eye,
  ShieldCheck,
  Building2,
  Download,
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  joiningDate: string;
  email: string;
  totalSpent: string;
  status: 'VIP' | 'Returning' | 'New';
}

interface Product {
  id: string;
  name: string;
  sku: string;
  cat: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  badge: string;
}

interface OrderItem {
  id: string;
  name: string;
  date: string;
  items: number;
  total: string;
  status: 'Delivered' | 'Processing' | 'Pending' | 'Shipped';
  color: string;
  rawBackendOrder?: any;
}

export interface BotaniDashboardProps {
  adminName?: string;
  onLogout?: () => void;
  onGoHome?: () => void;
  onUnauthorized?: () => void;
}

function BotaniDashboardContent({ adminName = 'Admin PT Botani Seed', onLogout, onGoHome, onUnauthorized }: BotaniDashboardProps = {}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [productCatFilter, setProductCatFilter] = useState('All Categories');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [timeframeFilter, setTimeframeFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedHoverBar, setSelectedHoverBar] = useState<{ month: string; amount: string } | null>(null);
  const [revenueTimeframe, setRevenueTimeframe] = useState<'Yearly' | 'Monthly' | 'Weekly' | 'Daily'>('Monthly');

  const ITEMS_PER_PAGE = 15;

  const [customerPage, setCustomerPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [completedOrderPage, setCompletedOrderPage] = useState(1);

  // Notification & Order Detail Modal States
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<{
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    orderId: string;
    rawOrder?: any;
  }[]>([]);
  const [knownOrderIds, setKnownOrderIds] = useState<Set<string>>(new Set());
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<any | null>(null);
  const [newOrderToast, setNewOrderToast] = useState<{ title: string; message: string; orderId: string; rawOrder?: any } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchLiveBackendData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const markNotifAsRead = (notifId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notifId ? { ...n, unread: false } : n)));
  };

  const markAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  // Dynamic Data States initialized empty, populated from live backend API
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalPackages: 0,
    pendingCount: 0,
    paidCount: 0
  });

  const fetchLiveBackendData = async () => {
    try {
      const [ordersRes, summaryRes, productsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/orders/analytics/summary'),
        fetch('/api/products')
      ]);

      const ordersData = ordersRes.ok ? await ordersRes.json() : null;
      const summaryData = summaryRes.ok ? await summaryRes.json() : null;
      const productsData = productsRes.ok ? await productsRes.json() : null;

      if (ordersData?.success && Array.isArray(ordersData.orders)) {
        const mappedOrders: OrderItem[] = ordersData.orders.map((ord: any) => {
          let statusLabel: OrderItem['status'] = 'Pending';
          let badgeColor = 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60';

          if (ord.status === 'PAID' || ord.status === 'PROCESSED') {
            statusLabel = 'Processing';
            badgeColor = 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60';
          } else if (ord.status === 'SHIPPED') {
            statusLabel = 'Shipped';
            badgeColor = 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60';
          } else if (ord.status === 'COMPLETED' || ord.status === 'DONE' || ord.status === 'DELIVERED' || ord.status === 'Delivered') {
            statusLabel = 'Delivered';
            badgeColor = 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60';
          }

          const createdDate = ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('id-ID') : new Date().toLocaleDateString('id-ID');

          return {
            id: ord.orderNumber,
            name: ord.buyer?.name || 'Pelanggan',
            date: createdDate,
            items: ord.cart?.totalQty || 1,
            total: `Rp ${(ord.pricing?.grandTotal || 0).toLocaleString('id-ID')}`,
            status: statusLabel,
            color: badgeColor,
            rawBackendOrder: ord,
          };
        });

        setOrders(mappedOrders);

        // Collect IDs of completed/done orders to remove them from notifications
        const completedOrderNumbers = new Set(
          ordersData.orders
            .filter((ord: any) => ord.status === 'DONE' || ord.status === 'COMPLETED' || ord.status === 'DELIVERED')
            .map((ord: any) => ord.orderNumber)
        );

        // Filter out finished orders from notification list
        setNotifications((prev) =>
          prev.filter((n) => !completedOrderNumbers.has(n.orderId))
        );

        // Process incoming active orders for live notifications
        setKnownOrderIds((prevSet) => {
          const isFirstRun = prevSet.size === 0;
          const newSet = new Set(prevSet);
          const newNotifList: any[] = [];
          let latestToastObj: any = null;

          ordersData.orders.forEach((ord: any) => {
            const isFinished = ord.status === 'DONE' || ord.status === 'COMPLETED' || ord.status === 'DELIVERED';
            if (!newSet.has(ord.orderNumber)) {
              newSet.add(ord.orderNumber);
              if (!isFinished) {
                const title = `Pesanan Baru #${ord.orderNumber}`;
                const message = `${ord.buyer?.name || 'Pelanggan'} (${ord.buyer?.city || 'Indramayu'}) - Rp ${(ord.pricing?.grandTotal || 0).toLocaleString('id-ID')}`;
                const time = ord.createdAt ? new Date(ord.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'Baru saja';

                newNotifList.unshift({
                  id: `notif-${ord.orderNumber}-${Date.now()}`,
                  title,
                  message,
                  time,
                  unread: !isFirstRun,
                  orderId: ord.orderNumber,
                  rawOrder: ord,
                });

                if (!isFirstRun) {
                  latestToastObj = { title, message, orderId: ord.orderNumber, rawOrder: ord };
                }
              }
            }
          });

          if (newNotifList.length > 0) {
            setNotifications((prev) => [...newNotifList, ...prev].slice(0, 20));
            if (latestToastObj) {
              setNewOrderToast(latestToastObj);
            }
          }

          return newSet;
        });

        // Derive customers list from real orders
        const customerMap = new Map<string, Customer>();
        ordersData.orders.forEach((ord: any) => {
          const name = ord.buyer?.name || 'Pelanggan';
          const email = ord.buyer?.email || `${ord.buyer?.whatsapp || 'wa'}@botaniseed.id`;
          const spentNum = ord.pricing?.grandTotal || 0;
          const existing = customerMap.get(name);
          if (existing) {
            const prevSpent = parseInt(existing.totalSpent.replace(/\D/g, '')) || 0;
            existing.totalSpent = `Rp ${(prevSpent + spentNum).toLocaleString('id-ID')}`;
          } else {
            customerMap.set(name, {
              id: ord.orderNumber,
              name,
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              joiningDate: ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('id-ID') : new Date().toLocaleDateString('id-ID'),
              email,
              totalSpent: `Rp ${spentNum.toLocaleString('id-ID')}`,
              status: 'New'
            });
          }
        });
        setCustomers(Array.from(customerMap.values()));
      }

      if (summaryData?.success && summaryData.summary) {
        setSummaryStats(summaryData.summary);
      }

      if (productsData?.success && Array.isArray(productsData.products)) {
        setProducts(productsData.products.map((p: any) => ({
          id: p.slug || p.id,
          name: p.name,
          sku: p.slug ? p.slug.toUpperCase() : 'PROD-001',
          cat: p.cat || 'Seeds',
          price: `Rp ${(p.price || 0).toLocaleString('id-ID')}`,
          stock: p.stock ?? 100,
          status: p.stock === 0 ? 'Out of Stock' : p.stock < 20 ? 'Low Stock' : 'In Stock',
          badge: p.stock === 0 ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300' : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300'
        })));
      }
    } catch (err) {
      console.error('Failed to load backend data in BotaniDashboard:', err);
    }
  };

  React.useEffect(() => {
    fetchLiveBackendData();
    const interval = setInterval(fetchLiveBackendData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Modal States
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    totalSpent: '',
    status: 'New' as 'VIP' | 'Returning' | 'New',
  });

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    cat: 'Seeds',
    price: '',
    stock: '',
  });

  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);

  const handleDownloadPDF = () => {
    setIsReportMenuOpen(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Dashboard - PT. Botani Seed Indonesia</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1e293b; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px; }
          .brand { font-size: 24px; font-weight: bold; color: #4f46e5; }
          .meta { font-size: 12px; color: #64748b; }
          .title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #0f172a; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
          .kpi-card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; background: #f8fafc; }
          .kpi-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }
          .kpi-value { font-size: 18px; font-weight: bold; color: #0f172a; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: 600; color: #334155; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .section { margin-bottom: 30px; }
          .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">🌱 PT. Botani Seed Indonesia</div>
          <div class="meta">Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</div>
        </div>

        <div class="title">Ringkasan Laporan Eksekutif</div>

        <div class="kpi-grid">
          <div class="kpi-card"><div class="kpi-label">Total Pendapatan</div><div class="kpi-value">Rp 45.280.000</div></div>
          <div class="kpi-card"><div class="kpi-label">Total Pesanan</div><div class="kpi-value">1.240</div></div>
          <div class="kpi-card"><div class="kpi-label">Rata-rata Pesanan</div><div class="kpi-value">Rp 36.500</div></div>
          <div class="kpi-card"><div class="kpi-label">Tingkat Konversi</div><div class="kpi-value">3,4%</div></div>
        </div>

        <div class="section">
          <h3>Daftar Produk</h3>
          <table>
            <thead>
              <tr><th>Nama Produk</th><th>SKU</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${products.map(p => `<tr><td>${p.name}</td><td>${p.sku}</td><td>${p.cat}</td><td>${p.price}</td><td>${p.stock} units</td><td>${p.status}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h3>Daftar Pesanan Terbaru</h3>
          <table>
            <thead>
              <tr><th>ID Pesanan</th><th>Nama Pelanggan</th><th>Tanggal</th><th>Jumlah Item</th><th>Total Pembayaran</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${orders.map(o => `<tr><td>${o.id}</td><td>${o.name}</td><td>${o.date}</td><td>${o.items} items</td><td>${o.total}</td><td>${o.status}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">Laporan dibuat secara otomatis dari Sistem Botani Store Dashboard - PT. Botani Seed Indonesia</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const handleDownloadExcel = () => {
    setIsReportMenuOpen(false);
    const rows = [
      ['🌱 LAPORAN KINERJA PT. BOTANI SEED INDONESIA'],
      ['Tanggal Ekspor', new Date().toLocaleDateString('id-ID')],
      [''],
      ['RINGKASAN METRIK EKSKUTIF'],
      ['Total Pendapatan', 'Rp 45.280.000'],
      ['Total Pesanan', '1240'],
      ['Rata-rata Nilai Pesanan', 'Rp 36.500'],
      ['Tingkat Konversi', '3.4%'],
      [''],
      ['DAFTAR KATALOG PRODUK'],
      ['Nama Produk', 'SKU', 'Kategori', 'Harga', 'Stok', 'Status'],
      ...products.map((p) => [p.name, p.sku, p.cat, p.price, `${p.stock} units`, p.status]),
      [''],
      ['DAFTAR PESANAN PELANGGAN'],
      ['ID Pesanan', 'Nama Pelanggan', 'Tanggal', 'Jumlah Item', 'Total Pembayaran', 'Status'],
      ...orders.map((o) => [o.id, o.name, o.date, `${o.items} items`, o.total, o.status]),
    ];

    const csvString = rows
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Botani_Seed_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const created: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joiningDate: new Date().toLocaleDateString('en-GB'),
      email: newCustomer.email,
      totalSpent: newCustomer.totalSpent ? `Rp ${newCustomer.totalSpent.replace('Rp', '').replace('$', '').trim()}` : 'Rp 0',
      status: newCustomer.status,
    };

    setCustomers([created, ...customers]);
    setNewCustomer({ name: '', email: '', totalSpent: '', status: 'New' });
    setIsAddCustomerOpen(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const stockNum = parseInt(newProduct.stock) || 0;
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    let badge = 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60';

    if (stockNum === 0) {
      status = 'Out of Stock';
      badge = 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/60';
    } else if (stockNum < 20) {
      status = 'Low Stock';
      badge = 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60';
    }

    const created: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      sku: newProduct.sku || `PROD-${Math.floor(100 + Math.random() * 900)}`,
      cat: newProduct.cat,
      price: newProduct.price.startsWith('Rp') ? newProduct.price : `Rp ${newProduct.price}`,
      stock: stockNum,
      status,
      badge,
    };

    setProducts([created, ...products]);
    setNewProduct({ name: '', sku: '', cat: 'Seeds', price: '', stock: '' });
    setIsAddProductOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const getOrderStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60';
      case 'Processing':
        return 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60';
      case 'Shipped':
        return 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60';
      case 'Delivered':
        return 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60';
      default:
        return 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300';
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderItem['status']) => {
    let backendStatus = 'PAYMENT_REPORTED';
    if (newStatus === 'Processing') backendStatus = 'PAID';
    else if (newStatus === 'Shipped') backendStatus = 'SHIPPED';
    else if (newStatus === 'Delivered') backendStatus = 'DONE';

    setOrders((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: newStatus,
              color: getOrderStatusBadge(newStatus),
              rawBackendOrder: ord.rawBackendOrder
                ? { ...ord.rawBackendOrder, status: backendStatus }
                : { status: backendStatus },
            }
          : ord
      )
    );

    if (newStatus === 'Delivered') {
      setNotifications((prev) => prev.filter((n) => n.orderId !== orderId));
    }

    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: backendStatus }),
      });
    } catch (err) {
      console.error('Failed to update status on server:', err);
    }
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  // Filtered lists
  const filteredCustomers = customers;

  const filteredProducts = products.filter((p) => {
    return productCatFilter === 'All Categories' || p.cat === productCatFilter;
  });

  const isOrderCompleted = (o: OrderItem) => {
    const rawStatus = String(o.rawBackendOrder?.status || '').toUpperCase();
    return (
      o.status === 'Delivered' ||
      rawStatus === 'DONE' ||
      rawStatus === 'COMPLETED' ||
      rawStatus === 'DELIVERED'
    );
  };

  const activeOrdersList = orders.filter((o) => !isOrderCompleted(o));

  const filteredOrders = activeOrdersList.filter((o) => {
    return orderStatusFilter === 'All' || o.status === orderStatusFilter;
  });

  const completedOrdersList = orders.filter((o) => isOrderCompleted(o));

  // Reset page when filters change
  React.useEffect(() => {
    setCustomerPage(1);
  }, [categoryFilter, timeframeFilter]);

  React.useEffect(() => {
    setProductPage(1);
  }, [productCatFilter]);

  React.useEffect(() => {
    setOrderPage(1);
  }, [orderStatusFilter]);

  // Paginated lists (Max 15 items per page)
  const paginatedCustomers = filteredCustomers.slice(
    (customerPage - 1) * ITEMS_PER_PAGE,
    customerPage * ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (productPage - 1) * ITEMS_PER_PAGE,
    productPage * ITEMS_PER_PAGE
  );

  const paginatedOrders = filteredOrders.slice(
    (orderPage - 1) * ITEMS_PER_PAGE,
    orderPage * ITEMS_PER_PAGE
  );

  const paginatedCompletedOrders = completedOrdersList.slice(
    (completedOrderPage - 1) * ITEMS_PER_PAGE,
    completedOrderPage * ITEMS_PER_PAGE
  );

  const renderPagination = (currentPage: number, totalItems: number, onPageChange: (p: number) => void) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-500 dark:text-slate-400">
        <div>
          Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem}</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{endItem}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> entries (Max 15 per page)
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-1 font-medium transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-lg border font-semibold flex items-center justify-center transition-colors ${
                currentPage === p
                  ? 'bg-[#4f46e5] text-white border-[#4f46e5]'
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-1 font-medium transition-colors"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  const dynamicBarData = React.useMemo(() => {
    if (revenueTimeframe === 'Yearly') {
      const years = ['2023', '2024', '2025', '2026'];
      const totals: Record<string, number> = { '2023': 0, '2024': 0, '2025': 0, '2026': 0 };
      orders.forEach((ord: any) => {
        const raw = ord.rawBackendOrder || ord;
        const d = raw.createdAt ? new Date(raw.createdAt) : new Date();
        const y = isNaN(d.getTime()) ? '2026' : String(d.getFullYear());
        const grandTotal = raw.pricing?.grandTotal || parseInt(String(ord.total).replace(/\D/g, '')) || 0;
        if (totals[y] !== undefined) totals[y] += grandTotal;
        else totals['2026'] += grandTotal;
      });
      const maxVal = Math.max(...Object.values(totals), 1);
      return years.map((y) => {
        const rev = totals[y];
        const pct = rev > 0 ? Math.max(Math.round((rev / maxVal) * 100), 15) : 8;
        return { month: y, h: `${pct}%`, amount: `Rp ${rev.toLocaleString('id-ID')}`, rawAmount: rev };
      });
    }

    if (revenueTimeframe === 'Weekly') {
      const weeks = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'];
      const totals = [0, 0, 0, 0, 0];
      orders.forEach((ord: any) => {
        const raw = ord.rawBackendOrder || ord;
        const d = raw.createdAt ? new Date(raw.createdAt) : new Date();
        const dateNum = isNaN(d.getTime()) ? 1 : d.getDate();
        const weekIdx = Math.min(Math.floor((dateNum - 1) / 7), 4);
        const grandTotal = raw.pricing?.grandTotal || parseInt(String(ord.total).replace(/\D/g, '')) || 0;
        totals[weekIdx] += grandTotal;
      });
      const maxVal = Math.max(...totals, 1);
      return weeks.map((w, idx) => {
        const rev = totals[idx];
        const pct = rev > 0 ? Math.max(Math.round((rev / maxVal) * 100), 15) : 8;
        return { month: w, h: `${pct}%`, amount: `Rp ${rev.toLocaleString('id-ID')}`, rawAmount: rev };
      });
    }

    if (revenueTimeframe === 'Daily') {
      const days: { month: string; dateStr: string; total: number }[] = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
        const dateStr = d.toISOString().split('T')[0];
        days.push({ month: label, dateStr, total: 0 });
      }

      orders.forEach((ord: any) => {
        const raw = ord.rawBackendOrder || ord;
        const d = raw.createdAt ? new Date(raw.createdAt) : new Date();
        const dateStr = d.toISOString().split('T')[0];
        const foundDay = days.find((item) => item.dateStr === dateStr);
        const grandTotal = raw.pricing?.grandTotal || parseInt(String(ord.total).replace(/\D/g, '')) || 0;
        if (foundDay) foundDay.total += grandTotal;
      });

      const maxVal = Math.max(...days.map((d) => d.total), 1);
      return days.map((d) => {
        const pct = d.total > 0 ? Math.max(Math.round((d.total / maxVal) * 100), 15) : 8;
        return { month: d.month, h: `${pct}%`, amount: `Rp ${d.total.toLocaleString('id-ID')}`, rawAmount: d.total };
      });
    }

    // Default: Monthly
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthlyTotals = new Array(12).fill(0);

    orders.forEach((ord: any) => {
      const raw = ord.rawBackendOrder || ord;
      const d = raw.createdAt ? new Date(raw.createdAt) : new Date();
      const monthIdx = isNaN(d.getTime()) ? new Date().getMonth() : d.getMonth();
      const grandTotal = raw.pricing?.grandTotal || parseInt(String(ord.total).replace(/\D/g, '')) || 0;
      monthlyTotals[monthIdx] += grandTotal;
    });

    const maxVal = Math.max(...monthlyTotals, 1);
    const currentMonthIdx = new Date().getMonth();
    const activeMonthsCount = Math.max(currentMonthIdx + 1, 6);

    return monthNames.slice(0, activeMonthsCount).map((month, idx) => {
      const rev = monthlyTotals[idx];
      const pct = rev > 0 ? Math.max(Math.round((rev / maxVal) * 100), 15) : 8;
      return {
        month,
        h: `${pct}%`,
        amount: `Rp ${rev.toLocaleString('id-ID')}`,
        rawAmount: rev,
      };
    });
  }, [revenueTimeframe, orders]);

  return (
    <div className={`min-h-screen font-sans antialiased flex transition-colors duration-200 bg-[#f4f5f8] dark:bg-[#0f172a] text-gray-800 dark:text-slate-100 ${isDarkMode ? 'dark' : ''}`}>
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between z-20 shadow-sm transition-all duration-300 ${isSidebarMinimized ? 'w-20 p-3' : 'w-64 p-6'}`}>
        <div>
          {/* Logo & Sidebar Toggle */}
          <div className={`flex items-center mb-10 ${isSidebarMinimized ? 'flex-col gap-4 justify-center' : 'justify-between px-2'}`}>
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveNav('Dashboard')}>
              <img
                src="/images/logo.png"
                alt="Botani Logo"
                className="w-10 h-10 object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              {!isSidebarMinimized && (
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Botani</span>
              )}
            </div>

            {/* Sidebar Minimize Button */}
            <button
              onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
              title={isSidebarMinimized ? 'Expand Sidebar' : 'Minimize Sidebar'}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { label: t('dashboard'), key: 'Dashboard', icon: LayoutDashboard },
              { label: t('order'), key: 'Order', icon: FileText },
              { label: language === 'en' ? 'Completed Orders' : 'Pesanan Selesai', key: 'CompletedOrders', icon: CheckCircle2 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  title={isSidebarMinimized ? item.label : undefined}
                  className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
                  } ${
                    isActive
                      ? 'bg-[#f0edff] dark:bg-indigo-950/80 text-[#5b46e8] dark:text-indigo-400 font-semibold shadow-xs'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white hover:translate-x-0.5'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#5b46e8] dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`} />
                  {!isSidebarMinimized && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="space-y-1.5 pt-4">
          <div className="my-2 border-t border-gray-200 dark:border-slate-700/80" />

          <button
            onClick={onLogout || onGoHome}
            title={isSidebarMinimized ? t('logout') : undefined}
            className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium text-gray-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ${
              isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-slate-500" />
            {!isSidebarMinimized && <span>{t('logout')}</span>}
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#f4f5f8] dark:bg-[#0f172a] transition-all duration-300 ${isSidebarMinimized ? 'ml-20' : 'ml-64'}`}>
        {/* TOP NAVIGATION */}
        <header className="h-20 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200">
          <div></div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
                className="h-9 px-3 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-300 transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'id' ? 'ID' : 'EN'}</span>
              </button>


              {/* Refresh Data Button */}
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                title="Refresh / Muat Ulang Pesanan Terbaru"
                className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-300 transition-all active:scale-95 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
              </button>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-amber-400 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notification Button & Dropdown Popover */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  title="Notifikasi Pesanan Masuk"
                  className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors relative cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center absolute -top-1 -right-1 ring-2 ring-white dark:ring-slate-900 animate-bounce">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 py-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 pb-3 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Notifikasi Pesanan</h4>
                        <p className="text-[11px] text-gray-400 dark:text-slate-400">{unreadNotifCount > 0 ? `${unreadNotifCount} belum dibaca` : 'Semua sudah dibaca'}</p>
                      </div>
                      {unreadNotifCount > 0 && (
                        <button
                          onClick={markAllNotifsAsRead}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                        >
                          Tandai Dibaca
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700/60">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 dark:text-slate-500 text-xs">
                          Belum ada notifikasi pesanan baru.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotifAsRead(n.id);
                              if (n.rawOrder) setSelectedOrderDetail(n.rawOrder);
                              else setActiveNav('Orders');
                              setIsNotificationOpen(false);
                            }}
                            className={`p-3.5 hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer flex items-start gap-3 ${n.unread ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className="text-xs font-bold text-gray-900 dark:text-slate-100 truncate">{n.title}</p>
                                <span className="text-[10px] text-gray-400 dark:text-slate-400 shrink-0">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-slate-300 mt-0.5 line-clamp-2">{n.message}</p>
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1 inline-flex items-center gap-1">
                                Lihat Selengkapnya →
                              </span>
                            </div>
                            {n.unread && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="px-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-center">
                      <button
                        onClick={() => { setActiveNav('Orders'); setIsNotificationOpen(false); }}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                      >
                        Lihat Semua Daftar Pesanan →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 pl-3 border-l border-gray-100 dark:border-slate-800 cursor-pointer select-none"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{adminName}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium leading-tight">Admin Operasional</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 ml-1" />
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (onLogout) onLogout();
                      else if (onGoHome) onGoHome();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 border-t border-gray-100 dark:border-slate-700 mt-1 pt-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="p-8 space-y-8 flex-1 bg-[#f4f5f8] dark:bg-[#0f172a] text-gray-800 dark:text-slate-100">
          {/* ============================================================ */}
          {/* VIEW: DASHBOARD */}
          {/* ============================================================ */}
          {activeNav === 'Dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('executiveSummary')}</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">{t('executiveSubtitle')}</p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsReportMenuOpen(!isReportMenuOpen)}
                    className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4338ca] transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('downloadReport')}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isReportMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isReportMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-1.5 border-b border-gray-100 dark:border-slate-700/80 text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                        {t('selectFormat')}
                      </div>

                      <button
                        onClick={handleDownloadPDF}
                        className="w-full px-4 py-3 text-left text-xs font-semibold text-gray-800 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-3 transition-colors border-b border-gray-50 dark:border-slate-700/50 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-rose-200/50 dark:border-rose-800/50">
                          PDF
                        </div>
                        <div>
                          <p className="font-bold">{t('formatPdf')}</p>
                          <p className="text-[10px] text-gray-400 dark:text-slate-400 font-normal">Document PDF</p>
                        </div>
                      </button>

                      <button
                        onClick={handleDownloadExcel}
                        className="w-full px-4 py-3 text-left text-xs font-semibold text-gray-800 dark:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-3 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-emerald-200/50 dark:border-emerald-800/50">
                          XLS
                        </div>
                        <div>
                          <p className="font-bold">{t('formatExcel')}</p>
                          <p className="text-[10px] text-gray-400 dark:text-slate-400 font-normal">Spreadsheet Excel (.csv)</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">{t('totalRevenue')}</span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-[#5b46e8] dark:text-indigo-300">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rp {(summaryStats.totalRevenue || 0).toLocaleString('id-ID')}</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Live Backend Data
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">{t('totalOrders')}</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-300">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(summaryStats.totalOrders || 0).toLocaleString('id-ID')}</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Live Backend Data
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Total Paket Terjual</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-300">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(summaryStats.totalPackages || 0).toLocaleString('id-ID')} paket</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Terhitung Otomatis
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Pesanan Terverifikasi</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(summaryStats.paidCount || 0).toLocaleString('id-ID')} lunas</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Terkonfirmasi Server
                  </span>
                </div>
              </div>

              {/* Chart & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Ringkasan Pendapatan Penjualan</h3>
                      <p className="text-xs text-gray-400 dark:text-slate-400">Grafik tren omset aktual dari transaksi masuk</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {selectedHoverBar && (
                        <span className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-300 font-semibold rounded-full animate-fade-in">
                          {selectedHoverBar.month}: {selectedHoverBar.amount}
                        </span>
                      )}
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700/70 p-1 rounded-full text-xs border border-gray-200/60 dark:border-slate-600/60">
                        {[
                          { key: 'Yearly', label: 'Tahun' },
                          { key: 'Monthly', label: 'Bulan' },
                          { key: 'Weekly', label: 'Minggu' },
                          { key: 'Daily', label: 'Hari' },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setRevenueTimeframe(item.key as any)}
                            className={`px-3 py-1 font-semibold rounded-full transition-all cursor-pointer ${
                              revenueTimeframe === item.key
                                ? 'bg-[#5b46e8] text-white shadow-xs'
                                : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-gray-100 dark:border-slate-700">
                    {dynamicBarData.map((b, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => setSelectedHoverBar(b)}
                        onMouseLeave={() => setSelectedHoverBar(null)}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                      >
                        <div className="w-full relative flex items-end justify-center h-full">
                          <div
                            className={`w-full transition-all duration-300 rounded-t-xl ${
                              b.rawAmount > 0
                                ? 'bg-[#5b46e8] dark:bg-indigo-500 group-hover:bg-[#4338ca] dark:group-hover:bg-indigo-400 shadow-sm'
                                : 'bg-indigo-100/60 dark:bg-slate-700/60 group-hover:bg-indigo-200 dark:group-hover:bg-slate-600'
                            }`}
                            style={{ height: b.h }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-slate-400 font-medium group-hover:text-[#5b46e8] dark:group-hover:text-indigo-400 transition-colors">
                          {b.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Aktivitas Terbaru</h3>
                  {orders.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 dark:text-slate-500 text-xs">
                      Belum ada aktivitas transaksi atau pesanan masuk.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 6).map((order) => {
                        let badgeText = 'Pesanan Baru';
                        let bgStyle = 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60';
                        if (order.status === 'Processing') {
                          badgeText = 'Terverifikasi';
                          bgStyle = 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60';
                        } else if (order.status === 'Shipped') {
                          badgeText = 'Pengiriman';
                          bgStyle = 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60';
                        } else if (order.status === 'Delivered') {
                          badgeText = 'Selesai';
                          bgStyle = 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60';
                        }

                        return (
                          <div key={order.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0 group">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2 group-hover:scale-125 transition-transform"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900 dark:text-slate-100 truncate">
                                Pesanan {order.id} - {order.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-gray-400 dark:text-slate-400">{order.date}</span>
                                <span className="text-[10px] font-bold text-gray-700 dark:text-slate-300">{order.total}</span>
                              </div>
                            </div>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold shrink-0 ${bgStyle}`}>
                              {badgeText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: PRODUCTS */}
          {/* ============================================================ */}
          {activeNav === 'Products' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('productsCatalog')}</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">{t('productsSubtitle')}</p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4338ca] flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> {t('addProduct')}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {['All Categories', 'Seeds', 'Fertilizers', 'Tools'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProductCatFilter(cat)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                          productCatFilter === cat
                            ? 'bg-[#f0edff] dark:bg-indigo-950/80 text-[#5b46e8] dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 font-semibold shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-slate-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-300 bg-gray-50/50 dark:bg-slate-700/50">
                        <th className="py-3 px-4">{t('productName')}</th>
                        <th className="py-3 px-4">{t('sku')}</th>
                        <th className="py-3 px-4">{t('category')}</th>
                        <th className="py-3 px-4">{t('price')}</th>
                        <th className="py-3 px-4">{t('stock')}</th>
                        <th className="py-3 px-4">{t('status')}</th>
                        <th className="py-3 px-4 text-center">{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {paginatedProducts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-slate-400 text-sm italic">
                            No products found.
                          </td>
                        </tr>
                      ) : (
                        paginatedProducts.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors group">
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-400 group-hover:scale-110 transition-transform">
                                <Package className="w-4 h-4" />
                              </div>
                              <span>{item.name}</span>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono text-gray-500 dark:text-slate-400">{item.sku}</td>
                            <td className="py-4 px-4 text-xs text-gray-600 dark:text-slate-300">{item.cat}</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{item.price}</td>
                            <td className="py-4 px-4 text-xs font-medium text-gray-700 dark:text-slate-300">{item.stock} units</td>
                            <td className="py-4 px-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${item.badge}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleDeleteProduct(item.id)}
                                title="Delete Product"
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/50 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {renderPagination(productPage, filteredProducts.length, setProductPage)}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: ORDER */}
          {/* ============================================================ */}
          {activeNav === 'Order' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('orderManagement')}</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">{t('orderSubtitle')}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Memuat Data...' : 'Refresh Pesanan'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'Pending', 'Processing', 'Shipped'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderStatusFilter(status)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                          orderStatusFilter === status
                            ? 'bg-[#f0edff] dark:bg-indigo-950/80 text-[#5b46e8] dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 font-semibold shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-slate-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-300 bg-gray-50/50 dark:bg-slate-700/50">
                        <th className="py-3 px-4">{t('orderId')}</th>
                        <th className="py-3 px-4">{t('customer')}</th>
                        <th className="py-3 px-4">{t('date')}</th>
                        <th className="py-3 px-4">{t('items')}</th>
                        <th className="py-3 px-4">{t('totalAmount')}</th>
                        <th className="py-3 px-4">Status Action</th>
                        <th className="py-3 px-4 text-center">{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {paginatedOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-slate-400 text-sm italic">
                            No orders matching filter.
                          </td>
                        </tr>
                      ) : (
                        paginatedOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="py-4 px-4 font-mono text-xs font-bold text-gray-900 dark:text-slate-100">{ord.id}</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100">{ord.name}</td>
                            <td className="py-4 px-4 text-xs text-gray-500 dark:text-slate-400">{ord.date}</td>
                            <td className="py-4 px-4 text-xs text-gray-600 dark:text-slate-300">{ord.items} items</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{ord.total}</td>
                            <td className="py-4 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderItem['status'])}
                                className={`text-xs px-2.5 py-1 rounded-full font-bold cursor-pointer outline-none border transition-all ${ord.color}`}
                              >
                                <option value="Pending" className="bg-white text-amber-600 dark:bg-slate-800 dark:text-amber-400 font-semibold">Pending</option>
                                <option value="Processing" className="bg-white text-blue-600 dark:bg-slate-800 dark:text-blue-400 font-semibold">Processing</option>
                                <option value="Shipped" className="bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 font-semibold">Shipped</option>
                                <option value="Delivered" className="bg-white text-emerald-600 dark:bg-slate-800 dark:text-emerald-400 font-semibold">Delivered</option>
                              </select>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedOrderDetail(ord.rawBackendOrder || ord)}
                                  title="View Details"
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(ord.id)}
                                  title="Delete Order"
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/50 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {renderPagination(orderPage, filteredOrders.length, setOrderPage)}
              </div>
            </div>
          )}
          {/* ============================================================ */}
          {/* VIEW: COMPLETED ORDERS */}
          {/* ============================================================ */}
          {activeNav === 'CompletedOrders' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span>{language === 'en' ? 'Completed Orders Archive' : 'Arsip Pesanan Selesai'}</span>
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">
                    {language === 'en' ? 'All orders successfully delivered & verified.' : 'Riwayat seluruh pemesanan yang telah berhasil terkirim & lunas.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {completedOrdersList.length} {language === 'en' ? 'Completed Orders' : 'Pesanan Selesai'}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-300 bg-gray-50/50 dark:bg-slate-700/50">
                        <th className="py-3 px-4">{t('orderId')}</th>
                        <th className="py-3 px-4">{t('customer')}</th>
                        <th className="py-3 px-4">{t('date')}</th>
                        <th className="py-3 px-4">{t('items')}</th>
                        <th className="py-3 px-4">{t('totalAmount')}</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {paginatedCompletedOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-slate-400 text-sm italic">
                            Belum ada data pesanan yang diselesaikan.
                          </td>
                        </tr>
                      ) : (
                        paginatedCompletedOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="py-4 px-4 font-mono text-xs font-bold text-gray-900 dark:text-slate-100">{ord.id}</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100">{ord.name}</td>
                            <td className="py-4 px-4 text-xs text-gray-500 dark:text-slate-400">{ord.date}</td>
                            <td className="py-4 px-4 text-xs text-gray-600 dark:text-slate-300">{ord.items} items</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{ord.total}</td>
                            <td className="py-4 px-4">
                              <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60 inline-flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Selesai
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedOrderDetail(ord.rawBackendOrder || ord)}
                                  title="Lihat Detail Pesanan Selesai"
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(ord.id)}
                                  title="Delete Order"
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/50 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {renderPagination(completedOrderPage, completedOrdersList.length, setCompletedOrderPage)}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: INVENTORY */}
          {/* ============================================================ */}
          {activeNav === 'Inventory' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('inventoryStatus')}</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">{t('inventorySubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Total SKUs</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{products.length} Items</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-[#5b46e8] dark:text-indigo-300">
                    <Boxes className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Low Stock Alert</p>
                    <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                      {products.filter((p) => p.status === 'Low Stock').length} Items
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Out of Stock</p>
                    <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                      {products.filter((p) => p.status === 'Out of Stock').length} Items
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Stock Level Breakdown</h3>
                <div className="space-y-4">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-gray-100 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-900 dark:text-slate-100">{p.name}</span>
                        <span className="text-xs font-mono text-gray-500 dark:text-slate-400">{p.stock} units ({p.status})</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            p.stock === 0
                              ? 'bg-rose-500'
                              : p.stock < 20
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min((p.stock / 200) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: CUSTOMERS */}
          {/* ============================================================ */}
          {activeNav === 'Customers' && (
            <div className="space-y-8">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Customers Overview</h2>

                <div className="flex items-center gap-4">

                  {/* Add Customer Button */}
                  <button
                    onClick={() => setIsAddCustomerOpen(true)}
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Customer</span>
                  </button>
                </div>
              </div>

              {/* TOP CARDS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Total Customer</span>
                    <button className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center gap-1 font-medium transition-colors">
                      <span>Weekly</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 my-4">
                    <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-xs">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{customers.length}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium">
                    <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                    <span>0% vs Last Week</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">New Customer</span>
                    <button className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center gap-1 font-medium transition-colors">
                      <span>Weekly</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 my-4">
                    <div className="w-11 h-11 rounded-full bg-[#2dd4bf] flex items-center justify-center text-white shadow-xs">
                      <UserPlus className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {customers.filter((c) => c.status === 'New').length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium">
                    <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                    <span>0% vs Last Week</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-slate-700 flex items-start justify-between min-h-[140px] hover:shadow-md transition-shadow">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Top 10 Customers this Week!</h3>
                    {customers.length === 0 ? (
                      <p className="text-xs text-gray-400 dark:text-slate-400 italic py-2">No top customers recorded.</p>
                    ) : (
                      <div className="space-y-3">
                        {customers.slice(0, 3).map((user) => (
                          <div key={user.id} className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 dark:ring-slate-700"
                            />
                            <div>
                              <p className="text-xs font-semibold text-gray-900 dark:text-slate-100 leading-tight">{user.name}</p>
                              <p className="text-[11px] text-gray-400 dark:text-slate-400 leading-tight">{user.totalSpent}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-1.5 h-12 bg-gray-200 dark:bg-slate-700 rounded-full self-center flex-shrink-0" />
                </div>
              </div>

              {/* DATA TABLE */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-gray-100 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Customers List</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setCategoryFilter(categoryFilter === 'Electronics' ? 'All' : 'Electronics')
                      }
                      className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3.5 py-1.5 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <span>{categoryFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-400" />
                    </button>
                    <button
                      onClick={() => setTimeframeFilter(timeframeFilter === 'All' ? 'Weekly' : 'All')}
                      className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3.5 py-1.5 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <span>{timeframeFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-300 bg-gray-50/50 dark:bg-slate-700/50">
                        <th className="py-3 px-4 rounded-l-xl">
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-slate-200">
                            <span>Customer Name</span>
                            <ArrowUpDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-4">
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-slate-200">
                            <span>Joining Date</span>
                            <ArrowUpDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-4">
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-slate-200">
                            <span>Email Address</span>
                            <ArrowUpDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-4">
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-slate-200">
                            <span>Total Spent</span>
                            <ArrowUpDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-4">
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-slate-200">
                            <span>Status</span>
                            <ArrowUpDown className="w-3 h-3 text-gray-400 dark:text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-4 rounded-r-xl text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {paginatedCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-400 dark:text-slate-400 text-sm italic">
                            No customers found. Click "+ Add Customer" above to add one.
                          </td>
                        </tr>
                      ) : (
                        paginatedCustomers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors group">
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100">
                              <div className="flex items-center gap-3">
                                <img
                                  src={customer.avatar}
                                  alt={customer.name}
                                  className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-100 dark:ring-slate-700 group-hover:scale-105 transition-transform"
                                />
                                <span>{customer.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-slate-300 text-xs">{customer.joiningDate}</td>
                            <td className="py-4 px-4 text-gray-600 dark:text-slate-300 text-xs font-mono">{customer.email}</td>
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{customer.totalSpent}</td>
                            <td className="py-4 px-4">
                              {customer.status === 'VIP' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60">
                                  VIP
                                </span>
                              )}
                              {customer.status === 'Returning' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/60">
                                  Returning
                                </span>
                              )}
                              {customer.status === 'New' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200/50 dark:border-slate-600">
                                  New
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleDeleteCustomer(customer.id)}
                                title="Delete Customer"
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/50 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {renderPagination(customerPage, filteredCustomers.length, setCustomerPage)}
              </div>
            </div>
          )}


        </main>
      </div>

      {/* ============================================================ */}
      {/* MODAL: ADD CUSTOMER */}
      {/* ============================================================ */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t('addNewCustomer')}</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('fullNamePlaceholder')}
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('emailAddress')}</label>
                <input
                  type="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('totalSpent')}</label>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  value={newCustomer.totalSpent}
                  onChange={(e) => setNewCustomer({ ...newCustomer, totalSpent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('customerStatus')}</label>
                <select
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value as 'VIP' | 'Returning' | 'New' })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                >
                  <option value="New">New</option>
                  <option value="Returning">Returning</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-[#4f46e5] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4338ca] shadow-sm"
                >
                  {t('saveCustomer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ============================================================ */}
      {/* MODAL: ADD PRODUCT */}
      {/* ============================================================ */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t('addNewProduct')}</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('productName')}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Benih Cabai Rawit"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('category')}</label>
                <select
                  value={newProduct.cat}
                  onChange={(e) => setNewProduct({ ...newProduct, cat: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                >
                  <option value="Seeds">{t('seeds')}</option>
                  <option value="Fertilizers">{t('fertilizers')}</option>
                  <option value="Tools">{t('tools')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('price')}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('initialStock')}</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-[#4f46e5] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4338ca] shadow-sm"
                >
                  {t('saveProduct')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ============================================================ */}
      {/* FLOATING TOAST: NEW ORDER NOTIFICATION */}
      {/* ============================================================ */}
      {newOrderToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 max-w-sm animate-in fade-in slide-in-from-top-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-emerald-400">{newOrderToast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5">{newOrderToast.message}</p>
            <button
              onClick={() => {
                if (newOrderToast.rawOrder) setSelectedOrderDetail(newOrderToast.rawOrder);
                else setActiveNav('Order');
                setNewOrderToast(null);
              }}
              className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Lihat Detail Pesanan →
            </button>
          </div>
          <button onClick={() => setNewOrderToast(null)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ORDER DETAIL */}
      {/* ============================================================ */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                  <span>Detail Pesanan #{selectedOrderDetail.orderNumber || selectedOrderDetail.id}</span>
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Dibuat pada: {selectedOrderDetail.createdAt ? new Date(selectedOrderDetail.createdAt).toLocaleString('id-ID') : selectedOrderDetail.date || 'Hari ini'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 text-xs text-gray-700 dark:text-slate-200">
              {/* INFORMASI PEMBELI */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-500" /> Data Pemesan
                  </h4>
                  {selectedOrderDetail.buyer?.whatsapp && (
                    <a
                      href={`https://wa.me/${selectedOrderDetail.buyer.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo ${selectedOrderDetail.buyer?.name || ''}, kami dari PT Botani Seed Indonesia mengenai pesanan #${selectedOrderDetail.orderNumber || ''}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Chat WhatsApp
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <div>
                    <span className="text-gray-400 dark:text-slate-400">Nama Lengkap:</span>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedOrderDetail.buyer?.name || selectedOrderDetail.name || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-slate-400">No. WhatsApp / HP:</span>
                    <p className="font-bold font-mono text-gray-900 dark:text-white">{selectedOrderDetail.buyer?.whatsapp || '-'}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-gray-400 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> Alamat Pengiriman Lengkap:
                  </span>
                  <p className="font-semibold text-gray-800 dark:text-slate-200 mt-1 leading-relaxed">
                    {selectedOrderDetail.buyer?.address ? (
                      <>
                        {selectedOrderDetail.buyer.address}, Desa/Kel. {selectedOrderDetail.buyer.village || '-'}, Kec. {selectedOrderDetail.buyer.district || '-'}, {selectedOrderDetail.buyer.city || '-'}, {selectedOrderDetail.buyer.province || '-'} ({selectedOrderDetail.buyer.postal || '-'})
                      </>
                    ) : (
                      'Alamat tidak ditentukan'
                    )}
                  </p>
                  {selectedOrderDetail.buyer?.note && (
                    <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/60">
                      <strong>Catatan Tambahan:</strong> "{selectedOrderDetail.buyer.note}"
                    </p>
                  )}
                </div>
              </div>

              {/* RINCIAN PRODUK */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Item Produk Dipesan</h4>
                <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-300 font-semibold border-b border-gray-200 dark:border-slate-700">
                      <tr>
                        <th className="py-2.5 px-3">Produk</th>
                        <th className="py-2.5 px-3 text-center">Jumlah</th>
                        <th className="py-2.5 px-3 text-right">Harga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
                      {selectedOrderDetail.cart?.items ? (
                        selectedOrderDetail.cart.items.map((item: any, idx: number) => (
                          <tr key={idx}>
                            <td className="py-2.5 px-3 font-semibold text-gray-900 dark:text-slate-100">{item.name}</td>
                            <td className="py-2.5 px-3 text-center font-mono">{item.qty} pcs</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Paket Benih Utama</td>
                          <td className="py-2.5 px-3 text-center font-mono">{selectedOrderDetail.items || 1} pcs</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold">{selectedOrderDetail.total}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RINCIAN BIAYA & TOTAL */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-slate-300">
                  <span>Subtotal Produk:</span>
                  <span className="font-mono">Rp {(selectedOrderDetail.pricing?.productTotal || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-slate-300">
                  <span>Ongkos Kirim ({selectedOrderDetail.shippingService?.code?.toUpperCase() || 'JNE'}):</span>
                  <span className="font-mono">Rp {(selectedOrderDetail.pricing?.shippingTotal || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-emerald-700 dark:text-emerald-300 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                  <span>Total Pembayaran:</span>
                  <span className="text-base font-mono">
                    {selectedOrderDetail.pricing?.grandTotal ? `Rp ${selectedOrderDetail.pricing.grandTotal.toLocaleString('id-ID')}` : selectedOrderDetail.total}
                  </span>
                </div>
              </div>

              {/* UBAH STATUS CEPEAT */}
              <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-slate-700">
                <span className="text-xs font-semibold text-gray-500">Update Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderDetail.orderNumber || selectedOrderDetail.id, 'Processing');
                      setSelectedOrderDetail((prev: any) => ({ ...prev, status: 'PAID' }));
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Verifikasi Lunas
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderDetail.orderNumber || selectedOrderDetail.id, 'Shipped');
                      setSelectedOrderDetail((prev: any) => ({ ...prev, status: 'SHIPPED' }));
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Tandai Dikirim
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderDetail.orderNumber || selectedOrderDetail.id, 'Delivered');
                      setSelectedOrderDetail((prev: any) => ({ ...prev, status: 'DONE' }));
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BotaniDashboard(props: BotaniDashboardProps = {}) {
  return (
    <LanguageProvider>
      <BotaniDashboardContent {...props} />
    </LanguageProvider>
  );
}

export default BotaniDashboard;

