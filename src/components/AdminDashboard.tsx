import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PackageCheck,
  TrendingUp,
  Clock,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Truck,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

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

      const ordersData = await ordersRes.json();
      const summaryData = await summaryRes.json();

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
      const data = await res.json();
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">Dashboard Admin Penjualan</h1>
            <p className="text-xs text-slate-400">PT Botani Seed Indonesia</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            Lihat Website
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{adminName}</span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Keluar Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {dataError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300" role="alert">
            {dataError}
          </div>
        )}
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Total Pesanan</span>
              <PackageCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold">{summary.totalOrders}</div>
            <p className="text-[11px] text-slate-500 mt-1">Transaksi masuk di MongoDB</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              Rp {summary.totalRevenue.toLocaleString('id-ID')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Estimasi nilai omset bruto</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Paket Terjual</span>
              <Truck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold">{summary.totalPackages} pcs</div>
            <p className="text-[11px] text-slate-500 mt-1">Total kantong benih dipesan</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Status Pesanan</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">{summary.pendingCount}</span>
              <span className="text-xs text-slate-400">Pending</span>
              <span className="text-2xl font-bold text-emerald-400 ml-2">{summary.paidCount}</span>
              <span className="text-xs text-slate-400">Paid</span>
            </div>
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Daftar Pesanan Benih</h2>
              <p className="text-xs text-slate-400">Kelola dan perbarui status pesanan dari pembeli</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari ID, Nama, Kota, WA..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-64"
                />
              </div>

              <select
                value={selectedStatusFilter}
                onChange={e => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                <option value="PAID">PAID</option>
                <option value="PROCESSED">PROCESSED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <button
                onClick={fetchData}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
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
                    <td colSpan={8} className="py-8 text-center text-slate-500">
                      Tidak ada data pesanan yang sesuai.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.orderNumber} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-emerald-400">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{order.buyer.name}</div>
                        <div className="text-[11px] text-slate-400">{order.buyer.whatsapp}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        <div>{order.buyer.city}, {order.buyer.province}</div>
                        <div className="text-[11px] text-slate-500 truncate">{order.buyer.address}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {order.cart.totalQty} paket
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">
                        Rp {order.pricing.grandTotal.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            order.status === 'PAID' || order.status === 'COMPLETED'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : order.status === 'SHIPPED'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={order.status}
                          disabled={updatingOrderNum === order.orderNumber}
                          onChange={e => handleStatusChange(order.orderNumber, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-[11px] text-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                          <option value="PAID">PAID</option>
                          <option value="PROCESSED">PROCESSED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
