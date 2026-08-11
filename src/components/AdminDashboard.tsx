import { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  Home,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  Truck,
  Clock,
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
  };
  cart: { totalQty: number };
  paymentMethod: string;
  pricing: { grandTotal: number };
  status: string;
}

interface AdminDashboardProps {
  adminName: string;
  onLogout: () => void;
  onGoHome: () => void;
  onUnauthorized: () => void;
}

const ORDER_STATUSES = [
  'PAYMENT_REPORTED',
  'PENDING_PAYMENT',
  'PAID',
  'PROCESSED',
  'SHIPPED',
  'COMPLETED',
  'DONE',
] as const;

const statusTone = (status: string) => {
  if (status === 'PAID' || status === 'COMPLETED' || status === 'DONE') return 'success';
  if (status === 'SHIPPED') return 'info';
  return 'warning';
};

export function AdminDashboard({ adminName, onLogout, onGoHome, onUnauthorized }: AdminDashboardProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalPackages: 0,
    pendingCount: 0,
    paidCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setDataError(null);
    try {
      const [ordersResponse, summaryResponse] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/orders/analytics/summary'),
      ]);

      if (ordersResponse.status === 401 || summaryResponse.status === 401) {
        onUnauthorized();
        return;
      }

      const ordersData = await readJsonResponse(ordersResponse, 'Data pesanan tidak dapat dibaca.');
      const summaryData = await readJsonResponse(summaryResponse, 'Ringkasan pesanan tidak dapat dibaca.');
      if (!ordersResponse.ok || !summaryResponse.ok) {
        throw new Error(ordersData.message || summaryData.message || 'Data dashboard belum dapat dimuat.');
      }
      if (ordersData.success) setOrders(ordersData.orders || []);
      if (summaryData.success) setSummary(summaryData.summary);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      setDataError('Data admin belum dapat dimuat. Periksa koneksi server lalu coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery = !query || [
        order.orderNumber,
        order.buyer.name,
        order.buyer.whatsapp,
        order.buyer.city,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesQuery && (statusFilter === 'ALL' || order.status === statusFilter);
    });
  }, [orders, searchQuery, statusFilter]);

  const handleStatusChange = async (orderNumber: string, status: string) => {
    setUpdatingOrder(orderNumber);
    setDataError(null);
    try {
      const response = await fetch(`/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await readJsonResponse(response, 'Status pesanan belum dapat diperbarui.');
      if (!response.ok || !data.success) throw new Error(data.message || 'Status pesanan belum dapat diperbarui.');
      setOrders((current) => current.map((order) => (
        order.orderNumber === orderNumber ? { ...order, status } : order
      )));
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Status pesanan belum dapat diperbarui.');
    } finally {
      setUpdatingOrder(null);
    }
  };

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
          <div className="admin-sidebar-account">
            <ShieldCheck size={18} aria-hidden="true" />
            <div><strong>{adminName}</strong><small>Super Admin</small></div>
          </div>
          <button type="button" onClick={onLogout}><LogOut size={18} aria-hidden="true" /> Keluar</button>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-header">
          <div><p>PT Botani Seed Indonesia</p><h1>Dashboard operasional</h1></div>
          <div className="admin-header-actions">
            <LanguageToggle />
            <ThemeToggleButton />
            <button type="button" className="admin-website-button" onClick={onGoHome}>
              <ExternalLink size={17} aria-hidden="true" /><span>Lihat website</span>
            </button>
            <button type="button" className="admin-logout-button" onClick={onLogout} aria-label="Keluar dari portal admin" title="Keluar admin">
              <LogOut size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <nav className="admin-mobile-nav" aria-label="Navigasi dashboard mobile">
          <a href="#overview"><Home size={17} aria-hidden="true" /> Ringkasan</a>
          <a href="#catalog"><PackageCheck size={17} aria-hidden="true" /> Produk</a>
          <a href="#orders"><Truck size={17} aria-hidden="true" /> Pesanan</a>
        </nav>

        <main>
          <section id="overview" className="admin-page-heading">
            <div>
              <p>Overview</p>
              <h2>Selamat datang, {adminName}</h2>
              <span>Pantau toko, katalog, dan pesanan dari satu ruang kerja.</span>
            </div>
            <button type="button" onClick={() => void fetchData()} disabled={isLoading}>
              <RefreshCw className={isLoading ? 'animate-spin' : ''} size={18} aria-hidden="true" />
              {isLoading ? 'Memuat…' : 'Perbarui data'}
            </button>
          </section>

          {dataError && <div className="admin-data-error" role="alert">{dataError}</div>}

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
              <div><p>Operasional</p><h2>Daftar pesanan</h2><span>Cari pembeli dan perbarui status pemenuhan.</span></div>
              <div className="admin-order-tools">
                <label className="admin-order-search">
                  <Search size={18} aria-hidden="true" />
                  <input type="search" aria-label="Cari pesanan" placeholder="Cari ID, nama, kota, WA…" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                </label>
                <select aria-label="Filter status pesanan" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="ALL">Semua status</option>
                  {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <button type="button" onClick={() => void fetchData()} aria-label="Muat ulang data pesanan" title="Perbarui data">
                  <RefreshCw className={isLoading ? 'animate-spin' : ''} size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="admin-orders-table-wrap">
              <table className="admin-orders-table">
                <thead><tr><th>No. pesanan</th><th>Pembeli</th><th>Tujuan</th><th>Jumlah</th><th>Total biaya</th><th>Metode</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr><td colSpan={8} className="admin-orders-empty">{isLoading ? 'Memuat pesanan…' : 'Tidak ada pesanan yang sesuai.'}</td></tr>
                  ) : filteredOrders.map((order) => (
                    <tr key={order.orderNumber}>
                      <td className="admin-order-number">{order.orderNumber}</td>
                      <td><strong>{order.buyer.name}</strong><small>{order.buyer.whatsapp}</small></td>
                      <td className="admin-order-destination"><div>{order.buyer.city}, {order.buyer.province}</div><small>{order.buyer.address}</small></td>
                      <td>{order.cart.totalQty} paket</td>
                      <td className="admin-order-total">Rp {order.pricing.grandTotal.toLocaleString('id-ID')}</td>
                      <td>{order.paymentMethod}</td>
                      <td><span className={`admin-order-status ${statusTone(order.status)}`}>{order.status}</span></td>
                      <td>
                        <select aria-label={`Ubah status pesanan ${order.orderNumber}`} value={order.status} disabled={updatingOrder === order.orderNumber} onChange={(event) => void handleStatusChange(order.orderNumber, event.target.value)}>
                          {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
