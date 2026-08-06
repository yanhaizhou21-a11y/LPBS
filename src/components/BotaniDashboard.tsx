import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  Boxes,
  Users,
  User,
  Settings,
  LogOut,
  Search,
  Moon,
  Sun,
  Bell,
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
  Sliders,
  AlertTriangle,
  X,
  CheckCircle2,
  PanelLeft,
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

const topCustomers: { name: string; avatar: string; spent: string }[] = [];

export function BotaniDashboard() {
  const [activeNav, setActiveNav] = useState('Customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Electronics');
  const [timeframeFilter, setTimeframeFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Dynamic Data States
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([
    { name: 'Benih Bayam Hijau Super', sku: 'SEED-001', cat: 'Seeds', price: '$12.00', stock: 150, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60', id: '1' },
    { name: 'Benih Tomat Cherry Red', sku: 'SEED-002', cat: 'Seeds', price: '$18.50', stock: 85, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60', id: '2' },
    { name: 'Pupuk Organik Cair Premium', sku: 'FERT-104', cat: 'Fertilizers', price: '$24.00', stock: 12, status: 'Low Stock', badge: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60', id: '3' },
    { name: 'Sekop Taman Mini Ergonomis', sku: 'TOOL-088', cat: 'Tools', price: '$15.00', stock: 0, status: 'Out of Stock', badge: 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/60', id: '4' },
  ]);

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

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    storeName: 'Botani Store',
    contactEmail: 'admin@botani.com',
    currency: 'USD ($)',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const created: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joiningDate: new Date().toLocaleDateString('en-GB'),
      email: newCustomer.email,
      totalSpent: newCustomer.totalSpent ? `$${newCustomer.totalSpent.replace('$', '')}` : '$0',
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
      price: newProduct.price.startsWith('$') ? newProduct.price : `$${newProduct.price}`,
      stock: stockNum,
      status,
      badge,
    };

    setProducts([created, ...products]);
    setNewProduct({ name: '', sku: '', cat: 'Seeds', price: '', stock: '' });
    setIsAddProductOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-sans antialiased flex transition-colors duration-200 ${isDarkMode ? 'dark bg-[#0f172a] text-slate-100' : 'bg-[#f4f5f8] text-gray-800'}`}>
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between z-20 shadow-sm transition-all duration-300 ${isSidebarMinimized ? 'w-20 p-3' : 'w-64 p-6'}`}>
        <div>
          {/* Logo & Sidebar Toggle */}
          <div className={`flex items-center mb-10 ${isSidebarMinimized ? 'flex-col gap-4 justify-center' : 'justify-between px-2'}`}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('Dashboard')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4f46e5] via-[#2563eb] to-[#06b6d4] flex items-center justify-center p-2.5 shadow-md flex-shrink-0">
                <TrendingUp className="w-full h-full text-white stroke-[2.5]" />
              </div>
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
              { label: 'Dashboard', icon: LayoutDashboard },
              { label: 'Products', icon: Package },
              { label: 'Order', icon: FileText },
              { label: 'Inventory', icon: Boxes },
              { label: 'Customers', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  title={isSidebarMinimized ? item.label : undefined}
                  className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium transition-all ${
                    isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
                  } ${
                    isActive
                      ? 'bg-[#f0edff] dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-400 font-semibold'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
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
        <div className="space-y-1.5 pt-6 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={() => setActiveNav('Settings')}
            title={isSidebarMinimized ? 'Settings' : undefined}
            className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium transition-colors ${
              isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
            } ${
              activeNav === 'Settings'
                ? 'bg-[#f0edff] dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-400 font-semibold'
                : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Settings className={`w-5 h-5 flex-shrink-0 ${activeNav === 'Settings' ? 'text-[#5b46e8] dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`} />
            {!isSidebarMinimized && <span>Settings</span>}
          </button>
          <button
            title={isSidebarMinimized ? 'Log Out' : undefined}
            className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors ${
              isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-slate-500" />
            {!isSidebarMinimized && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarMinimized ? 'ml-20' : 'ml-64'}`}>
        {/* TOP NAVIGATION */}
        <header className="h-20 bg-white dark:bg-[#1e293b] border-b border-gray-100 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10 shadow-xs transition-colors duration-200">
          <div>
            <span className="block text-xs font-normal text-gray-400 dark:text-slate-400 leading-tight">Welcome Back!</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-none mt-0.5">Botani.</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              
              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-amber-400 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900"></span>
              </button>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-100 dark:border-slate-800 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">User</p>
                <p className="text-xs text-gray-400 dark:text-slate-400 leading-tight">Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 ml-1" />
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="p-8 space-y-8 flex-1">
          {/* ============================================================ */}
          {/* VIEW: DASHBOARD */}
          {/* ============================================================ */}
          {activeNav === 'Dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Executive Summary</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Overview of sales performance and store metrics</p>
                </div>
                <button className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4338ca] transition-all shadow-sm">
                  Download Report
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Total Revenue</span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-[#5b46e8] dark:text-indigo-300">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$45,280.00</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> +12.5% this month
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Total Orders</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-300">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,240</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> +8.2% this month
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Avg Order Value</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-300">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$36.50</h3>
                  <span className="text-xs text-rose-500 dark:text-rose-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingDown className="w-3.5 h-3.5" /> -1.4% vs last week
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-slate-300 font-medium">Conversion Rate</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3.4%</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" /> +0.6% improvement
                  </span>
                </div>
              </div>

              {/* Chart & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Sales Revenue Overview</h3>
                      <p className="text-xs text-gray-400 dark:text-slate-400">Monthly revenue trends</p>
                    </div>
                    <button className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 bg-white dark:bg-slate-700">
                      2026 Year
                    </button>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-gray-100 dark:border-slate-700">
                    {[
                      { month: 'Jan', h: '60%' },
                      { month: 'Feb', h: '45%' },
                      { month: 'Mar', h: '75%' },
                      { month: 'Apr', h: '50%' },
                      { month: 'May', h: '85%' },
                      { month: 'Jun', h: '95%' },
                      { month: 'Jul', h: '70%' },
                    ].map((b, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div
                          className="w-full bg-indigo-100 dark:bg-indigo-500/30 group-hover:bg-[#5b46e8] dark:group-hover:bg-indigo-400 transition-all rounded-t-xl"
                          style={{ height: b.h }}
                        ></div>
                        <span className="text-xs text-gray-400 dark:text-slate-400 font-medium">{b.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'New order #ORD-9481', time: '5 mins ago', badge: 'New Order', bg: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
                      { title: 'Stock low on Organic Tomato', time: '1 hour ago', badge: 'Inventory', bg: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
                      { title: 'Payment verified from customer', time: '3 hours ago', badge: 'Finance', bg: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
                      { title: 'Weekly report generated', time: '1 day ago', badge: 'System', bg: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300' },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-900 dark:text-slate-100">{act.title}</p>
                          <span className="text-[10px] text-gray-400 dark:text-slate-400">{act.time}</span>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${act.bg}`}>
                          {act.badge}
                        </span>
                      </div>
                    ))}
                  </div>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products Catalog</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Manage product inventory, pricing, and categories</p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4338ca] flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative w-72">
                    <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-sm w-full text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {['All Categories', 'Seeds', 'Fertilizers', 'Tools'].map((cat, i) => (
                      <button
                        key={i}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                          i === 0
                            ? 'bg-[#f0edff] dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-semibold'
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
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-400">
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
                            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 inline-flex items-center justify-center text-gray-400 dark:text-slate-400">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Track, process, and fulfill customer orders</p>
                </div>
                <div className="flex items-center gap-2">
                  {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status, i) => (
                    <button
                      key={i}
                      className={`text-xs px-3 py-1.5 rounded-full border ${
                        i === 0
                          ? 'bg-[#f0edff] dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-semibold'
                          : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-slate-300 border-gray-200 dark:border-slate-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-300 bg-gray-50/50 dark:bg-slate-700/50">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                      {[
                        { id: '#ORD-8821', name: 'Jenny Wilson', date: '06/08/2026', items: 3, total: '$145.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
                        { id: '#ORD-8820', name: 'Cameron Williamson', date: '06/08/2026', items: 1, total: '$32.50', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
                        { id: '#ORD-8819', name: 'Guy Hawkins', date: '05/08/2026', items: 5, total: '$210.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
                        { id: '#ORD-8818', name: 'Kathryn Murphy', date: '04/08/2026', items: 2, total: '$84.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
                      ].map((ord, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="py-4 px-4 font-mono text-xs font-bold text-gray-900 dark:text-slate-100">{ord.id}</td>
                          <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100">{ord.name}</td>
                          <td className="py-4 px-4 text-xs text-gray-500 dark:text-slate-400">{ord.date}</td>
                          <td className="py-4 px-4 text-xs text-gray-600 dark:text-slate-300">{ord.items} items</td>
                          <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{ord.total}</td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${ord.color}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 inline-flex items-center justify-center text-gray-400 dark:text-slate-400">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: INVENTORY */}
          {/* ============================================================ */}
          {activeNav === 'Inventory' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Status</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Real-time stock monitoring & reorder thresholds</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Total Items</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">348 SKUs</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-[#5b46e8] dark:text-indigo-300">
                    <Boxes className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Low Stock Alert</p>
                    <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">5 Items</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300 font-medium">Out of Stock</p>
                    <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">2 Items</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Stock Level Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Benih Sayur Kangkung', qty: 450, max: 500, status: 'Optimal' },
                    { name: 'Pupuk NPK Mutiara', qty: 40, max: 200, status: 'Low Stock' },
                    { name: 'Polybag 20x20 Pack', qty: 0, max: 100, status: 'Out of Stock' },
                  ].map((inv, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-900 dark:text-slate-100">{inv.name}</span>
                        <span className="text-xs font-mono text-gray-500 dark:text-slate-400">{inv.qty} / {inv.max}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            inv.qty === 0
                              ? 'bg-rose-500'
                              : inv.qty < 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(inv.qty / inv.max) * 100}%` }}
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
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm text-gray-700 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] w-72 shadow-xs transition-all"
                    />
                  </div>

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
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
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

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
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

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex items-start justify-between min-h-[140px]">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Top 10 Customers this Week!</h3>
                    {topCustomers.length === 0 ? (
                      <p className="text-xs text-gray-400 dark:text-slate-400 italic py-2">No top customers recorded.</p>
                    ) : (
                      <div className="space-y-3">
                        {topCustomers.map((user, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 dark:ring-slate-700"
                            />
                            <div>
                              <p className="text-xs font-semibold text-gray-900 dark:text-slate-100 leading-tight">{user.name}</p>
                              <p className="text-[11px] text-gray-400 dark:text-slate-400 leading-tight">{user.spent}</p>
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
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
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
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-400 dark:text-slate-400 text-sm italic">
                            No customers found. Click "+ Add Customer" above to add one.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-700/50 transition-colors group">
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-slate-100">
                              <div className="flex items-center gap-3">
                                <img
                                  src={customer.avatar}
                                  alt={customer.name}
                                  className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-100 dark:ring-slate-700"
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
                              <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200/80 dark:hover:bg-slate-600 inline-flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW: SETTINGS */}
          {/* ============================================================ */}
          {activeNav === 'Settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Store Settings</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Configure business preferences and account security</p>
              </div>

              {settingsSaved && (
                <div className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-medium animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-slate-700 pb-4 flex gap-6">
                  {['General', 'Store Profile', 'Notifications', 'Security'].map((tab, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`text-xs font-semibold pb-2 border-b-2 transition-colors ${
                        i === 0
                          ? 'border-[#5b46e8] text-[#5b46e8] dark:text-indigo-400'
                          : 'border-transparent text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Store Name</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Contact Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Currency</label>
                    <select
                      value={settingsForm.currency}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] transition-all"
                    >
                      <option>USD ($)</option>
                      <option>IDR (Rp)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-[#4f46e5] text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[#4338ca] shadow-sm transition-all active:scale-95"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
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
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Add New Customer</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jenny Wilson"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jenny@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Total Spent ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={newCustomer.totalSpent}
                  onChange={(e) => setNewCustomer({ ...newCustomer, totalSpent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Customer Status</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4f46e5] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4338ca] shadow-sm"
                >
                  Save Customer
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
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Add New Product</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Product Name</label>
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
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={newProduct.cat}
                  onChange={(e) => setNewProduct({ ...newProduct, cat: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Price ($)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Initial Stock</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4f46e5] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4338ca] shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotaniDashboard;
