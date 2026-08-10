import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Building2, Home, Menu, PackageSearch, ShoppingBag, X } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggleButton } from './ThemeToggleButton';

export interface NavbarProps {
  cartQty?: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}

const NotchCurve = ({ side }: { side: 'left' | 'right' }) => (
  <div className={`notch-curve notch-curve-${side}`} aria-hidden="true">
    <svg viewBox="0 0 50 64" preserveAspectRatio="none">
      <path d={side === 'left' ? 'M0 39.5 C25 39.5 25 63.5 50 63.5' : 'M0 63.5 C25 63.5 25 39.5 50 39.5'} />
      <path d={side === 'left' ? 'M0 36.5 C25 36.5 25 60.5 50 60.5' : 'M0 60.5 C25 60.5 25 36.5 50 36.5'} />
    </svg>
  </div>
);

export function Navbar({ cartQty = 0, onOpenCart, onOpenCheckout }: NavbarProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const links = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.products'), href: '/products', icon: PackageSearch },
    { label: t('nav.about'), href: '/#profil', icon: Building2 },
  ];

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (menuOpen || current < 72 || current < lastScrollY.current) setVisible(true);
      else if (current > lastScrollY.current + 4) setVisible(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menuOpen) return;
      setMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openCart = () => {
    closeMenu();
    onOpenCart();
  };

  return <>
    <motion.header
      className="notch-navbar"
      aria-label={t('nav.primary')}
      animate={{ y: visible ? 0 : -82 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
    >
      <div className="notch-side" aria-hidden="true" />
      <div className="notch-shell">
        <NotchCurve side="left" />
        <div className="notch-content">
          <button
            ref={menuButtonRef}
            type="button"
            className="notch-icon-button mobile-menu-trigger"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className="notch-links" aria-label={t('nav.primary')}>
            {links.slice(0, 2).map(({ label, href, icon: Icon }) => (
              <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>
            ))}
          </nav>
          <a href="/" className="notch-brand" aria-label="Botani Seed">
            <img src={ASSETS.logo} alt="" />
            <span>Botani Seed</span>
          </a>
          <button type="button" className="notch-cart mobile-cart-trigger" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
            <ShoppingBag size={19} />
            {cartQty > 0 && <span className="notch-cart-badge">{cartQty}</span>}
          </button>
          <nav className="notch-links notch-links-right" aria-label={t('nav.secondary')}>
            {links.slice(2).map(({ label, href, icon: Icon }) => (
              <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>
            ))}
            <LanguageToggle className="notch-language-toggle" />
            <ThemeToggleButton className="notch-theme-toggle" />
            <button type="button" className="notch-cart" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
              <ShoppingBag size={18} />
              <span className="notch-cart-label">{t('nav.cart')}</span>
              {cartQty > 0 && <span className="notch-cart-badge">{cartQty}</span>}
            </button>
            <button type="button" className="notch-order" onClick={onOpenCheckout}>{t('nav.orderNow')}</button>
          </nav>
        </div>
        <NotchCurve side="right" />
      </div>
      <div className="notch-side" aria-hidden="true" />
    </motion.header>
    <div className="notch-spacer" aria-hidden="true" />
    <AnimatePresence>
      {menuOpen && visible && (
        <motion.nav
          id="mobile-navigation"
          className="mobile-navigation"
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
          aria-label={t('nav.mobile')}
        >
          {links.map(({ label, href, icon: Icon }) => (
            <a key={href} href={href} onClick={closeMenu}><Icon size={19} />{label}</a>
          ))}
          <div className="mobile-nav-actions">
            <LanguageToggle className="mobile-language-toggle" />
            <ThemeToggleButton className="mobile-theme-toggle" />
            <button type="button" className="mobile-order" onClick={() => { closeMenu(); onOpenCheckout(); }}>
              {t('nav.orderNow')}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  </>;
}

export default Navbar;
