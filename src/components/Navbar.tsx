import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpenText, Building2, Home, Menu, Package, ShoppingBag, Sprout, X } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ThemeToggleButton } from './ThemeToggleButton';

interface NavbarProps { cartQty: number; onOpenCart: () => void; onOpenCheckout: () => void; }
const links = [
  { label: 'Beranda', href: '/', icon: Home }, { label: 'Produk', href: '/products', icon: Package }, { label: 'Peluang', href: '/#peluang', icon: Sprout },
  { label: 'Cerita petani', href: '/#kisah', icon: BookOpenText }, { label: 'Tentang kami', href: '/#profil', icon: Building2 },
];
const NotchCurve = ({ side }: { side: 'left' | 'right' }) => <div className={`notch-curve notch-curve-${side}`} aria-hidden="true"><svg viewBox="0 0 50 64" preserveAspectRatio="none"><path d={side === 'left' ? 'M0 39.5 C25 39.5 25 63.5 50 63.5' : 'M0 63.5 C25 63.5 25 39.5 50 39.5'} /><path d={side === 'left' ? 'M0 36.5 C25 36.5 25 60.5 50 60.5' : 'M0 60.5 C25 60.5 25 36.5 50 36.5'} /></svg></div>;

export function Navbar({ cartQty, onOpenCart, onOpenCheckout }: NavbarProps) {
  const reduceMotion = useReducedMotion(); const [menuOpen, setMenuOpen] = useState(false); const [visible, setVisible] = useState(true); const lastScrollY = useRef(0);
  useEffect(() => { const onScroll = () => { const current = window.scrollY; if (menuOpen || current < 72 || current < lastScrollY.current) setVisible(true); else if (current > lastScrollY.current + 4) setVisible(false); lastScrollY.current = current; }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, [menuOpen]);
  return <>
    <motion.header className="notch-navbar" aria-label="Navigasi utama" animate={{ y: visible ? 0 : -82 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}>
      <div className="notch-side" aria-hidden="true" /><div className="notch-shell"><NotchCurve side="left" /><div className="notch-content">
        <button className="notch-icon-button mobile-menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className="notch-links" aria-label="Navigasi utama kiri">{links.slice(0, 3).map(({ label, href, icon: Icon }) => <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>)}</nav>
        <a href="/" className="notch-brand" aria-label="Botani Seed — kembali ke beranda"><img src={ASSETS.logo} alt="" /><span>Botani Seed</span></a>
        <nav className="notch-links notch-links-right" aria-label="Navigasi utama kanan">{links.slice(3).map(({ label, href, icon: Icon }) => <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>)}<ThemeToggleButton className="notch-theme-toggle" /><button className="notch-cart" onClick={onOpenCart} aria-label={`Buka keranjang, ${cartQty} paket`}><ShoppingBag size={18} /><span className="notch-cart-label">Keranjang</span>{cartQty > 0 && <span className="notch-cart-badge">{cartQty}</span>}</button><button className="notch-order" onClick={onOpenCheckout}>Pesan</button></nav>
      </div><NotchCurve side="right" /></div><div className="notch-side" aria-hidden="true" />
    </motion.header><div className="notch-spacer" aria-hidden="true" />
    <AnimatePresence>{menuOpen && visible && <motion.nav id="mobile-navigation" className="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }} transition={{ duration: 0.2 }} aria-label="Menu seluler">{links.map(({ label, href, icon: Icon }) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><Icon size={19} />{label}</a>)}<div className="mobile-nav-actions"><ThemeToggleButton className="mobile-theme-toggle" /><button onClick={() => { setMenuOpen(false); onOpenCart(); }}><ShoppingBag size={18} /> Keranjang ({cartQty})</button><button className="mobile-order" onClick={() => { setMenuOpen(false); onOpenCheckout(); }}>Pesan sekarang</button></div></motion.nav>}</AnimatePresence>
  </>;
}
