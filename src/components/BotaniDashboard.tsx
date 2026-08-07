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
  Filter,
  Trash2,
  Edit,
  Eye,
  ShieldCheck,
  Building2,
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
}

const topCustomers: { name: string; avatar: string; spent: string }[] = [];

export function BotaniDashboard() {
  const [activeNav, setActiveNav] = useState('Customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [productCatFilter, setProductCatFilter] = useState('All Categories');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [timeframeFilter, setTimeframeFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedHoverBar, setSelectedHoverBar] = useState<{ month: string; amount: string } | null>(null);

  const ITEMS_PER_PAGE = 15;

  const [customerPage, setCustomerPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);

  // Dynamic Data States pre-seeded with multi-page sample datasets
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'c1', name: 'Jenny Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', joiningDate: '24/10/2025', email: 'michael.mitc@example.com', totalSpent: '$3,215', status: 'VIP' },
    { id: 'c2', name: 'Cameron Williamson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', joiningDate: '22/10/2025', email: 'bill.sanders@example.com', totalSpent: '$5,425', status: 'Returning' },
    { id: 'c3', name: 'Guy Hawkins', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joiningDate: '22/10/2025', email: 'debra.holt@example.com', totalSpent: '$5,445', status: 'New' },
    { id: 'c4', name: 'Kathryn Murphy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', joiningDate: '21/10/2025', email: 'felicia.reid@example.com', totalSpent: '$1,458', status: 'VIP' },
    { id: 'c5', name: 'Leslie Alexander', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', joiningDate: '19/10/2025', email: 'tim.jennings@example.com', totalSpent: '$1,457', status: 'VIP' },
    { id: 'c6', name: 'Dianne Russell', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', joiningDate: '18/10/2025', email: 'willie.jennings@example.com', totalSpent: '$5,445', status: 'Returning' },
    { id: 'c7', name: 'Devane Courtney', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', joiningDate: '16/10/2025', email: 'devane.c@example.com', totalSpent: '$2,890', status: 'VIP' },
    { id: 'c8', name: 'Jerome Bell', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', joiningDate: '15/10/2025', email: 'jerome.bell@example.com', totalSpent: '$3,100', status: 'Returning' },
    { id: 'c9', name: 'Eleanor Pena', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', joiningDate: '12/10/2025', email: 'eleanor.p@example.com', totalSpent: '$4,200', status: 'New' },
    { id: 'c10', name: 'Wade Warren', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', joiningDate: '10/10/2025', email: 'wade.w@example.com', totalSpent: '$2,150', status: 'Returning' },
    { id: 'c11', name: 'Jane Cooper', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80', joiningDate: '08/10/2025', email: 'jane.cooper@example.com', totalSpent: '$6,800', status: 'VIP' },
    { id: 'c12', name: 'Robert Fox', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', joiningDate: '05/10/2025', email: 'robert.fox@example.com', totalSpent: '$920', status: 'New' },
    { id: 'c13', name: 'Jacob Jones', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', joiningDate: '01/10/2025', email: 'jacob.jones@example.com', totalSpent: '$3,400', status: 'Returning' },
    { id: 'c14', name: 'Kristin Watson', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', joiningDate: '28/09/2025', email: 'kristin.w@example.com', totalSpent: '$7,250', status: 'VIP' },
    { id: 'c15', name: 'Cody Fisher', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', joiningDate: '25/09/2025', email: 'cody.fisher@example.com', totalSpent: '$890', status: 'New' },
    { id: 'c16', name: 'Esther Howard', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', joiningDate: '20/09/2025', email: 'esther.h@example.com', totalSpent: '$4,120', status: 'Returning' },
    { id: 'c17', name: 'Ronald Richards', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joiningDate: '15/09/2025', email: 'ronald.r@example.com', totalSpent: '$5,900', status: 'VIP' },
    { id: 'c18', name: 'Albert Flores', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', joiningDate: '10/09/2025', email: 'albert.f@example.com', totalSpent: '$1,100', status: 'New' },
    { id: 'c19', name: 'Savannah Nguyen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', joiningDate: '05/09/2025', email: 'savannah.n@example.com', totalSpent: '$8,400', status: 'VIP' },
    { id: 'c20', name: 'Floyd Miles', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', joiningDate: '01/09/2025', email: 'floyd.m@example.com', totalSpent: '$3,800', status: 'Returning' },
    { id: 'c21', name: 'Courtney Henry', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', joiningDate: '28/08/2025', email: 'courtney.h@example.com', totalSpent: '$750', status: 'New' },
    { id: 'c22', name: 'Theresa Webb', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', joiningDate: '22/08/2025', email: 'theresa.w@example.com', totalSpent: '$4,950', status: 'VIP' },
    { id: 'c23', name: 'Darrell Steward', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', joiningDate: '18/08/2025', email: 'darrell.s@example.com', totalSpent: '$2,300', status: 'Returning' },
    { id: 'c24', name: 'Ralph Edwards', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joiningDate: '12/08/2025', email: 'ralph.e@example.com', totalSpent: '$1,350', status: 'New' },
    { id: 'c25', name: 'Arlene McCoy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', joiningDate: '05/08/2025', email: 'arlene.m@example.com', totalSpent: '$6,100', status: 'VIP' },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: 'Benih Bayam Hijau Super', sku: 'SEED-001', cat: 'Seeds', price: '$12.00', stock: 150, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p2', name: 'Benih Tomat Cherry Red', sku: 'SEED-002', cat: 'Seeds', price: '$18.50', stock: 85, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p3', name: 'Pupuk Organik Cair Premium', sku: 'FERT-104', cat: 'Fertilizers', price: '$24.00', stock: 12, status: 'Low Stock', badge: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: 'p4', name: 'Sekop Taman Mini Ergonomis', sku: 'TOOL-088', cat: 'Tools', price: '$15.00', stock: 0, status: 'Out of Stock', badge: 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/60' },
    { id: 'p5', name: 'Benih Cabai Rawit Merah', sku: 'SEED-003', cat: 'Seeds', price: '$14.00', stock: 120, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p6', name: 'Benih Terong Ungu Hibrida', sku: 'SEED-004', cat: 'Seeds', price: '$16.00', stock: 95, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p7', name: 'Sprayer Tanaman 2 Litur Pro', sku: 'TOOL-090', cat: 'Tools', price: '$22.50', stock: 8, status: 'Low Stock', badge: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: 'p8', name: 'Media Tanam Cocopeat 5kg', sku: 'SOIL-012', cat: 'Fertilizers', price: '$9.50', stock: 200, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p9', name: 'Pot Tanaman Hitam 30cm', sku: 'POT-005', cat: 'Tools', price: '$5.00', stock: 0, status: 'Out of Stock', badge: 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/60' },
    { id: 'p10', name: 'Hydroponic Starter Kit 12 Holes', sku: 'HYD-001', cat: 'Tools', price: '$45.00', stock: 40, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p11', name: 'Benih Sawi Caisim Manis', sku: 'SEED-005', cat: 'Seeds', price: '$10.00', stock: 180, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p12', name: 'Benih Selada Keriting Hijau', sku: 'SEED-006', cat: 'Seeds', price: '$11.50', stock: 110, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p13', name: 'Pupuk NPK Mutiara 16-16-16', sku: 'FERT-105', cat: 'Fertilizers', price: '$28.00', stock: 15, status: 'Low Stock', badge: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: 'p14', name: 'Gunting Dahan Stenum Steel', sku: 'TOOL-092', cat: 'Tools', price: '$19.00', stock: 60, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p15', name: 'Benih Wortel Manis Bio', sku: 'SEED-007', cat: 'Seeds', price: '$13.00', stock: 75, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p16', name: 'Benih Semangka Tanpa Biji', sku: 'SEED-008', cat: 'Seeds', price: '$21.00', stock: 0, status: 'Out of Stock', badge: 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/60' },
    { id: 'p17', name: 'ZPT Pengatur Tumbuh 500ml', sku: 'FERT-108', cat: 'Fertilizers', price: '$17.50', stock: 45, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p18', name: 'Mulsa Plastik Hitam Perak 100m', sku: 'TOOL-095', cat: 'Tools', price: '$35.00', stock: 18, status: 'Low Stock', badge: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: 'p19', name: 'Irigasi Tetes Drip Kit 50m', sku: 'HYD-005', cat: 'Tools', price: '$52.00', stock: 30, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: 'p20', name: 'Benih Timun Suri Segar', sku: 'SEED-009', cat: 'Seeds', price: '$14.50', stock: 80, status: 'In Stock', badge: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
  ]);

  const [orders, setOrders] = useState<OrderItem[]>([
    { id: '#ORD-8825', name: 'Jenny Wilson', date: '06/08/2026', items: 3, total: '$145.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: '#ORD-8824', name: 'Cameron Williamson', date: '06/08/2026', items: 1, total: '$32.50', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
    { id: '#ORD-8823', name: 'Guy Hawkins', date: '05/08/2026', items: 5, total: '$210.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
    { id: '#ORD-8822', name: 'Kathryn Murphy', date: '04/08/2026', items: 2, total: '$84.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: '#ORD-8821', name: 'Leslie Alexander', date: '03/08/2026', items: 4, total: '$190.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: '#ORD-8820', name: 'Dianne Russell', date: '02/08/2026', items: 2, total: '$95.00', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
    { id: '#ORD-8819', name: 'Devane Courtney', date: '01/08/2026', items: 6, total: '$310.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
    { id: '#ORD-8818', name: 'Jerome Bell', date: '30/07/2026', items: 1, total: '$45.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: '#ORD-8817', name: 'Eleanor Pena', date: '29/07/2026', items: 3, total: '$128.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: '#ORD-8816', name: 'Wade Warren', date: '28/07/2026', items: 2, total: '$76.00', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
    { id: '#ORD-8815', name: 'Jane Cooper', date: '26/07/2026', items: 5, total: '$240.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
    { id: '#ORD-8814', name: 'Robert Fox', date: '25/07/2026', items: 1, total: '$22.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: '#ORD-8813', name: 'Jacob Jones', date: '24/07/2026', items: 4, total: '$165.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: '#ORD-8812', name: 'Kristin Watson', date: '22/07/2026', items: 7, total: '$410.00', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
    { id: '#ORD-8811', name: 'Cody Fisher', date: '20/07/2026', items: 2, total: '$58.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
    { id: '#ORD-8810', name: 'Esther Howard', date: '19/07/2026', items: 3, total: '$135.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
    { id: '#ORD-8809', name: 'Ronald Richards', date: '18/07/2026', items: 2, total: '$92.00', status: 'Pending', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
    { id: '#ORD-8808', name: 'Albert Flores', date: '15/07/2026', items: 1, total: '$34.00', status: 'Processing', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
    { id: '#ORD-8807', name: 'Savannah Nguyen', date: '12/07/2026', items: 5, total: '$285.00', status: 'Shipped', color: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/60' },
    { id: '#ORD-8806', name: 'Floyd Miles', date: '10/07/2026', items: 3, total: '$140.00', status: 'Delivered', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
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
  const [settingsTab, setSettingsTab] = useState('General');
  const [settingsForm, setSettingsForm] = useState({
    storeName: 'Botani Store',
    contactEmail: 'admin@botani.com',
    currency: 'USD ($)',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

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

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: newStatus,
              color: getOrderStatusBadge(newStatus),
            }
          : ord
      )
    );
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Filtered lists
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter((p) => {
    const matchesCat = productCatFilter === 'All Categories' || p.cat === productCatFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Reset page when filters change
  React.useEffect(() => {
    setCustomerPage(1);
  }, [searchQuery, categoryFilter, timeframeFilter]);

  React.useEffect(() => {
    setProductPage(1);
  }, [searchQuery, productCatFilter]);

  React.useEffect(() => {
    setOrderPage(1);
  }, [searchQuery, orderStatusFilter]);

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

  const barData = [
    { month: 'Jan', h: '60%', amount: '$27,160' },
    { month: 'Feb', h: '45%', amount: '$20,370' },
    { month: 'Mar', h: '75%', amount: '$33,960' },
    { month: 'Apr', h: '50%', amount: '$22,640' },
    { month: 'May', h: '85%', amount: '$38,480' },
    { month: 'Jun', h: '95%', amount: '$43,000' },
    { month: 'Jul', h: '70%', amount: '$31,690' },
  ];

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
            onClick={() => setActiveNav('Settings')}
            title={isSidebarMinimized ? 'Settings' : undefined}
            className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
              isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
            } ${
              activeNav === 'Settings'
                ? 'bg-[#f0edff] dark:bg-indigo-950/80 text-[#5b46e8] dark:text-indigo-400 font-semibold'
                : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Settings className={`w-5 h-5 flex-shrink-0 ${activeNav === 'Settings' ? 'text-[#5b46e8] dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`} />
            {!isSidebarMinimized && <span>Settings</span>}
          </button>
          <button
            title={isSidebarMinimized ? 'Log Out' : undefined}
            className={`w-full flex items-center py-3 rounded-2xl text-sm font-medium text-gray-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ${
              isSidebarMinimized ? 'justify-center px-0' : 'gap-3 px-4'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-slate-500" />
            {!isSidebarMinimized && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#f4f5f8] dark:bg-[#0f172a] transition-all duration-300 ${isSidebarMinimized ? 'ml-20' : 'ml-64'}`}>
        {/* TOP NAVIGATION */}
        <header className="h-20 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200">
          <div>
            <span className="block text-xs font-normal text-gray-400 dark:text-slate-400 leading-tight">Welcome Back!</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-none mt-0.5">Botani.</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Search Icon */}
              <div className="relative">
                <button className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-amber-400 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notification Button */}
              <button className="w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
              </button>
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
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Jenny Wilson</p>
                  <p className="text-xs text-gray-400 dark:text-slate-400 leading-tight">Manager</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 ml-1" />
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => { setActiveNav('Settings'); setIsProfileMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 text-gray-400" /> Store Settings
                  </button>
                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 border-t border-gray-100 dark:border-slate-700 mt-1 pt-2"
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Executive Summary</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Overview of sales performance and store metrics</p>
                </div>
                <button className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4338ca] transition-all shadow-sm active:scale-95">
                  Download Report
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
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

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
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

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
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

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
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
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Sales Revenue Overview</h3>
                      <p className="text-xs text-gray-400 dark:text-slate-400">Monthly revenue trends</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedHoverBar && (
                        <span className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950/70 text-[#5b46e8] dark:text-indigo-300 font-semibold rounded-full animate-fade-in">
                          {selectedHoverBar.month}: {selectedHoverBar.amount}
                        </span>
                      )}
                      <button className="text-xs text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 bg-white dark:bg-slate-700">
                        2026 Year
                      </button>
                    </div>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-gray-100 dark:border-slate-700">
                    {barData.map((b, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => setSelectedHoverBar(b)}
                        onMouseLeave={() => setSelectedHoverBar(null)}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                      >
                        <div
                          className="w-full bg-indigo-100 dark:bg-indigo-500/30 group-hover:bg-[#5b46e8] dark:group-hover:bg-indigo-400 transition-all duration-200 rounded-t-xl"
                          style={{ height: b.h }}
                        ></div>
                        <span className="text-xs text-gray-400 dark:text-slate-400 font-medium group-hover:text-[#5b46e8] dark:group-hover:text-indigo-400 transition-colors">{b.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'New order #ORD-9481', time: '5 mins ago', badge: 'New Order', bg: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60' },
                      { title: 'Stock low on Organic Tomato', time: '1 hour ago', badge: 'Inventory', bg: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/60' },
                      { title: 'Payment verified from customer', time: '3 hours ago', badge: 'Finance', bg: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/60' },
                      { title: 'Weekly report generated', time: '1 day ago', badge: 'System', bg: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300' },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0 group">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2 group-hover:scale-125 transition-transform"></div>
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

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative w-72">
                    <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-sm w-full text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b46e8]/30 focus:border-[#5b46e8] transition-all"
                    />
                  </div>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Track, process, and fulfill customer orders</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
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
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Status Action</th>
                        <th className="py-3 px-4 text-center">Action</th>
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
                                  onClick={() => alert(`Order Details:\nID: ${ord.id}\nCustomer: ${ord.name}\nTotal: ${ord.total}\nStatus: ${ord.status}`)}
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
          {/* VIEW: INVENTORY */}
          {/* ============================================================ */}
          {activeNav === 'Inventory' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Status</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">Real-time stock monitoring & reorder thresholds</p>
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
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search customer name or email..."
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

              <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs space-y-6">
                <div className="border-b border-gray-100 dark:border-slate-700 pb-4 flex gap-6">
                  {['General', 'Store Profile', 'Notifications', 'Security'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSettingsTab(tab)}
                      className={`text-xs font-semibold pb-2 border-b-2 transition-colors ${
                        settingsTab === tab
                          ? 'border-[#5b46e8] text-[#5b46e8] dark:text-indigo-400'
                          : 'border-transparent text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {settingsTab === 'General' && (
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
                )}

                {settingsTab !== 'General' && (
                  <div className="py-6 text-center text-xs text-gray-400 dark:text-slate-400 italic">
                    {settingsTab} configuration tab preview.
                  </div>
                )}
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
