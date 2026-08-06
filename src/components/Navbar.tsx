import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpenText, Building2, Menu, Moon, Package, ShoppingBag, Sprout, Sun, X } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface NavbarProps {
  cartQty: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}

const links = [
  { label: 'Peluang', href: '#peluang', icon: Sprout },
  { label: 'Cerita petani', href: '#kisah', icon: BookOpenText },
  { label: 'Tentang kami', href: '#profil', icon: Building2 },
  { label: 'Promo', href: '#promo', icon: Package },
];

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

export function Navbar({ cartQty, onOpenCart, onOpenCheckout }: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('botani_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => applyTheme(isDark), [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    const update = () => {
      setIsDark(next);
      localStorage.setItem('botani_theme', next ? 'dark' : 'light');
      applyTheme(next);
    };
    if (!reduceMotion && document.startViewTransition) document.startViewTransition(update);
    else update();
  };

  return (
    <>
      <header className="notch-navbar" aria-label="Navigasi utama">
        <div className="notch-side" aria-hidden="true" />
        <div className="notch-shell">
          <div className="notch-curve notch-curve-left" aria-hidden="true" />
          <div className="notch-content">
            <button className="notch-icon-button mobile-menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Buka menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className="notch-links" aria-label="Bagian halaman">
              {links.slice(0, 2).map(({ label, href, icon: Icon }) => (
                <a key={href} href={href}><Icon size={16} />{label}</a>
              ))}
            </nav>

            <a href="#top" className="notch-brand" aria-label="Botani Seed — kembali ke atas">
              <img src={ASSETS.logo} alt="" />
              <span>Botani Seed</span>
            </a>

            <nav className="notch-links notch-links-right" aria-label="Tindakan utama">
              {links.slice(2).map(({ label, href, icon: Icon }) => (
                <a key={href} href={href}><Icon size={16} />{label}</a>
              ))}
              <button className="notch-icon-button" onClick={toggleTheme} aria-label={isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}>
                <motion.span animate={{ rotate: isDark && !reduceMotion ? 180 : 0 }} transition={{ duration: 0.4 }}>
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </button>
              <button className="notch-cart" onClick={onOpenCart} aria-label={`Buka keranjang, ${cartQty} paket`}>
                <ShoppingBag size={18} /><span className="notch-cart-label">Keranjang</span>
                {cartQty > 0 && <span className="notch-cart-badge">{cartQty}</span>}
              </button>
              <button className="notch-order" onClick={onOpenCheckout}>Pesan</button>
            </nav>
          </div>
          <div className="notch-curve notch-curve-right" aria-hidden="true" />
        </div>
        <div className="notch-side" aria-hidden="true" />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            aria-label="Menu seluler"
          >
            {links.map(({ label, href, icon: Icon }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}><Icon size={19} />{label}</a>
            ))}
            <div className="mobile-nav-actions">
              <button onClick={toggleTheme}>{isDark ? <Sun size={18} /> : <Moon size={18} />} Ganti tema</button>
              <button onClick={() => { setMenuOpen(false); onOpenCart(); }}><ShoppingBag size={18} /> Keranjang ({cartQty})</button>
              <button className="mobile-order" onClick={() => { setMenuOpen(false); onOpenCheckout(); }}>Pesan sekarang</button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
