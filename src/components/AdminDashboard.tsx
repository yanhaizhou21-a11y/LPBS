import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PackageCheck,
  TrendingUp,
  Clock,
  LogOut,
  RefreshCw,
  Search,
  Truck,
  ShieldCheck,
  Home,
  ExternalLink
} from 'lucide-react';
import { AdminProductsPanel } from './AdminProductsPanel';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggleButton } from './ThemeToggleButton';
import { readJsonResponse } from '../lib/http';

interface OrderItem {
  orderNumber: string;
  buyer: {
    name: string;
    whatsapp: string;
    city: string;
    province: string;
    address: string;
    village: string;
    district: string;
    postal: string;
    note?: string;
  };
  cart: {
    totalQty: number;
  };
  shippingService?: {
    code: string;
    totalFee: number;
  };
  paymentMethod: string;
  pricing: {
    productTotal: number;
    shippingTotal: number;
    grandTotal: number;
  };
  status: string;
  createdAt: string;
}

interface AdminDashboardProps {
  adminName: string;
  onLogout: () => void;
  onGoHome: () => void;
  onUnauthorized: () => void;
}

export function AdminDashboard({ adminName, onLogout, onGoHome, onUnauthorized }: AdminDashboardProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalPackages: 0,
    pendingCount: 0,
    paidCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [updatingOrderNum, setUpdatingOrderNum] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setDataError(null);
    try {
      const [ordersRes, summaryRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/orders/analytics/summary')
      ]);

      if (ordersRes.status === 401 || summaryRes.status === 401) {
        onUnauthorized();
        return;
      }

      const ordersData = await readJsonResponse(ordersRes, 'Data pesanan tidak dapat dibaca.');
      const summaryData = await readJsonResponse(summaryRes, 'Ringkasan pesanan tidak dapat dibaca.');

      if (ordersData.success) {
        setOrders(ordersData.orders || []);
      }
      if (summaryData.success) {
        setSummary(summaryData.summary);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setDataError('Data admin belum dapat dimuat. Periksa koneksi server lalu coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    setUpdatingOrderNum(orderNumber);
    try {
      const res = await fetch(`/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await readJsonResponse(res, 'Status pesanan belum dapat diperbarui.');
      if (data.success) {
        setOrders(prev =>
          prev.map(o => (o.orderNumber === orderNumber ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setDataError('Status pesanan belum dapat diperbarui.');
    } finally {
      setUpdatingOrderNum(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyer.whatsapp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyer.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'ALL' ? true : o.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-dashboard admin-portal">
      <aside className="admin-sidebar">
        <a href="#overview" className="admin-sidebar-brand" aria-label="Dashboard Botani Seed">
          <span><LayoutDashboard size={20} aria-hidden="true" /></span>
          <div><strong>Botani Seed</strong><small>Admin Portal</small></div>
        </a>
        <nav aria-label="Navigasi dashboard admin">
          <p>Workspace</p>
          <a href="#overview" className="active"><Home size={19} aria-hidden="true" /><span>Ringkasan</span></a>
          <a href="#catalog"><PackageCheck size={19} aria-hidden="true" /><span>Katalog produk</span></a>
          <a href="#orders"><Truck size={19} aria-hidden="true" /><span>Daftar pesanan</span></a>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-account"><ShieldCheck size={18} aria-hidden="true" /><div><strong>{adminName}</strong><small>Super Admin</small></div></div>
          <button type="button" onClick={onLogout}><LogOut size={18} aria-hidden="true" /> Keluar</button>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-header">
          <div>
            <p>PT Botani Seed Indonesia</p>
            <h1>Dashboard operasional</h1>
          </div>
          <div className="admin-header-actions">
            <LanguageToggle />
            <ThemeToggleButton />
            <button type="button" className="admin-website-button" onClick={onGoHome}><ExternalLink size={17} aria-hidden="true" /><span>Lihat website</span></button>
            <button type="button" className="admin-logout-button" onClick={onLogout} aria-label="Keluar dari portal admin" title="Keluar Admin"><LogOut size={18} aria-hidden="true" /></button>
          </div>
        </header>

        <nav className="admin-mobile-nav" aria-label="Navigasi dashboard mobile">
          <a href="#overview"><Home size={17} aria-hidden="true" /> Ringkasan</a>
          <a href="#catalog"><PackageCheck size={17} aria-hidden="true" /> Produk</a>
          <a href="#orders"><Truck size={17} aria-hidden="true" /> Pesanan</a>
        </nav>

        <main>
        <section id="overview" className="admin-page-heading">
          <div><p>Overview</p><h2>Selamat datang, {adminName}</h2><span>Pantau aktivitas toko dan tindak lanjuti pesanan dari satu tempat.</span></div>
          <button type="button" onClick={fetchData} disabled={isLoading}><RefreshCw className={isLoading ? 'animate-spin' : ''} size={18} aria-hidden="true" /> {isLoading ? 'Memuat...' : 'Perbarui data'}</button>
        </section>
        {dataError && (
          <div className="admin-data-error" role="alert">
            {dataError}
          </div>
        )}
        <section className="admin-metrics" aria-label="Ringkasan penjualan">
          <article className="admin-metric"><span><PackageCheck size={19} /></span><p>Total pesanan</p><strong>{summary.totalOrders}</strong><small>Transaksi tersimpan</small></article>
          <article className="admin-metric"><span><TrendingUp size={19} /></span><p>Omzet bruto</p><strong>Rp {summary.totalRevenue.toLocaleString('id-ID')}</strong><small>Akumulasi pesanan</small></article>
          <article className="admin-metric"><span><Truck size={19} /></span><p>Paket terjual</p><strong>{summary.totalPackages} pcs</strong><small>Total paket benih</small></article>
          <article className="admin-metric"><span><Clock size={19} /></span><p>Perlu tindakan</p><strong>{summary.pendingCount}</strong><small>{summary.paidCount} pembayaran diterima</small></article>
        </section>

        <div id="catalog" className="admin-section-anchor">
          <AdminProductsPanel onUnauthorized={onUnauthorized} />
        </div>

        <section id="orders" className="admin-panel admin-orders-panel">
          <div className="admin-orders-heading">
            <div>
              <p>Operasional</p>
              <h2>Daftar pesanan</h2>
              <span>Telusuri pembeli dan perbarui status pemenuhan pesanan.</span>
            </div>

            <div className="admin-order-tools">
              <label className="admin-order-search">
                <Search size={18} aria-hidden="true" />
                <input
                  type="text"
                  aria-label="Cari pesanan"
                  placeholder="Cari ID, nama, kota, WA..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </label>

              <select
                aria-label="Filter status pesanan"
                value={selectedStatusFilter}
                onChange={e => setSelectedStatusFilter(e.target.value)}
              >
                <option value="ALL">Semua Status</option>
                <option value="PAYMENT_REPORTED">PAYMENT_REPORTED</option>
                <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                <option value="PAID">PAID</option>
                <option value="PROCESSED">PROCESSED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DONE">DONE</option>
              </select>

              <button
                onClick={fetchData}
                aria-label="Muat ulang data pesanan"
                title="Refresh Data"
              >
                <RefreshCw className={isLoading ? 'animate-spin' : ''} size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="admin-orders-table-wrap">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th className="py-3 px-4">No. Pesanan</th>
                  <th className="py-3 px-4">Pembeli</th>
                  <th className="py-3 px-4">Tujuan</th>
                  <th className="py-3 px-4">Jumlah</th>
                  <th className="py-3 px-4">Total Biaya</th>
                  <th className="py-3 px-4">Metode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="admin-orders-empty">
                      Tidak ada data pesanan yang sesuai.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.orderNumber}>
                      <td className="admin-order-number">
                        {order.orderNumber}
                      </td>
                      <td>
                        <strong>{order.buyer.name}</strong>
                        <small>{order.buyer.whatsapp}</small>
                      </td>
                      <td className="admin-order-destination">
                        <div>{order.buyer.city}, {order.buyer.province}</div>
                        <small>{order.buyer.address}</small>
                      </td>
                      <td>
                        {order.cart.totalQty} paket
                      </td>
                      <td className="admin-order-total">
                        Rp {order.pricing.grandTotal.toLocaleString('id-ID')}
                      </td>
                      <td>
                        {order.paymentMethod}
                      </td>
                      <td>
                        <span
                          className={`admin-order-status ${
                            order.status === 'PAID' || order.status === 'COMPLETED' || order.status === 'DONE'
                              ? 'success'
                              : order.status === 'SHIPPED'
                              ? 'info'
                              : 'warning'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          aria-label={`Ubah status pesanan ${order.orderNumber}`}
                          value={order.status}
                          disabled={updatingOrderNum === order.orderNumber}
                          onChange={e => handleStatusChange(order.orderNumber, e.target.value)}
                        >
                          <option value="PAYMENT_REPORTED">PAYMENT_REPORTED</option>
                          <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                          <option value="PAID">PAID</option>
                          <option value="PROCESSED">PROCESSED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="DONE">DONE</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
