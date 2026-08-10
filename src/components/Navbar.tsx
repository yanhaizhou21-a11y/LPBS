import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Building2, Check, ChevronDown, Home, Menu, PackageSearch, ShoppingBag, X } from 'lucide-react';
import { PUBLIC_PAGES } from '../config/public-pages';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggleButton } from './ThemeToggleButton';

export interface NavbarProps {
  cartQty?: number;
  currentPath: string;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar({ cartQty = 0, currentPath, onOpenCart, onOpenCheckout }: NavbarProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const homeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSheetRef = useRef<HTMLElement>(null);
  const homeMenuRef = useRef<HTMLDivElement>(null);
  const pathname = currentPath.split('#')[0] || '/';
  const homepageItems = PUBLIC_PAGES.filter((page) => page.navigationVisible && page.group === 'homepages');
  const productPage = PUBLIC_PAGES.find((page) => page.id === 'products');
  const homeGroupActive = homepageItems.some((page) => page.path === pathname);
  const directLinks = [
    productPage && { label: t(productPage.labelKey), href: productPage.path, icon: PackageSearch, active: pathname === productPage.path },
    { label: t('nav.about'), href: '/#profil', icon: Building2, active: currentPath === '/#profil' },
  ].filter(Boolean) as { label: string; href: string; icon: typeof PackageSearch; active: boolean }[];

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (menuOpen || homeMenuOpen || current < 72 || current < lastScrollY.current) setVisible(true);
      else if (current > lastScrollY.current + 4) setVisible(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [homeMenuOpen, menuOpen]);

  useEffect(() => {
    if (!homeMenuOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!homeMenuRef.current?.contains(event.target as Node)) setHomeMenuOpen(false);
    };
    window.addEventListener('pointerdown', closeOnOutsideClick);
    return () => window.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [homeMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => mobileSheetRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus());

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...(mobileSheetRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', trapFocus);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!homeMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setHomeMenuOpen(false);
      requestAnimationFrame(() => homeButtonRef.current?.focus());
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [homeMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMobileMenu = (restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };
  const openCart = () => {
    setHomeMenuOpen(false);
    closeMobileMenu();
    onOpenCart();
  };
  const openCheckout = () => {
    setHomeMenuOpen(false);
    closeMobileMenu();
    onOpenCheckout();
  };

  const homepageLinks = (mobile = false) => homepageItems.map((page) => {
    const active = page.path === pathname;
    return (
      <a
        key={page.id}
        href={page.path}
        className={`homepage-link${active ? ' active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={() => mobile ? closeMobileMenu() : setHomeMenuOpen(false)}
      >
        <span className="homepage-link-icon"><Home size={18} aria-hidden="true" /></span>
        <span className="homepage-link-copy">
          <strong>{t(page.labelKey)}</strong>
          {page.descriptionKey && <small>{t(page.descriptionKey)}</small>}
        </span>
        {active && <Check size={17} aria-label={t('nav.currentPage')} />}
      </a>
    );
  });

  return <>
    <motion.header
      className="site-header"
      animate={{ y: visible ? 0 : -96 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
    >
      <div className="site-header-shell">
        <a href="/" className="site-brand" aria-label="Botani Seed">
          <img src={ASSETS.logo} alt="" />
          <span>Botani Seed</span>
        </a>

        <nav className="site-nav" aria-label={t('nav.primary')}>
          <div className="homepage-menu" ref={homeMenuRef}>
            <button
              ref={homeButtonRef}
              type="button"
              className={`site-nav-link${homeGroupActive ? ' active' : ''}`}
              aria-expanded={homeMenuOpen}
              aria-controls="homepage-popover"
              aria-label={homeMenuOpen ? t('nav.closeHomepages') : t('nav.openHomepages')}
              onClick={() => setHomeMenuOpen((open) => !open)}
            >
              {t('nav.homepages')} <ChevronDown size={16} className={homeMenuOpen ? 'rotated' : ''} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {homeMenuOpen && (
                <motion.div
                  id="homepage-popover"
                  className="homepage-popover"
                  initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                >
                  <p>{t('nav.homepagesDescription')}</p>
                  <div>{homepageLinks()}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {directLinks.map(({ label, href, active }) => (
            <a key={href} href={href} className={`site-nav-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined}>{label}</a>
          ))}
        </nav>

        <div className="site-header-actions" aria-label={t('nav.secondary')}>
          <LanguageToggle className="site-language-toggle" />
          <ThemeToggleButton className="site-theme-toggle" />
          <button type="button" className="site-cart" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
            <ShoppingBag size={18} aria-hidden="true" />
            <span className="site-cart-label">{t('nav.cart')}</span>
            {cartQty > 0 && <span className="site-cart-badge">{cartQty}</span>}
          </button>
          <button type="button" className="site-order" onClick={openCheckout}>{t('nav.orderNow')}</button>
        </div>

        <div className="mobile-header-actions">
          <button type="button" className="site-icon-button" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
            <ShoppingBag size={20} aria-hidden="true" />
            {cartQty > 0 && <span className="site-cart-badge">{cartQty}</span>}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="site-icon-button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={t('nav.openMenu')}
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.header>
    <div className="site-header-spacer" aria-hidden="true" />

    <AnimatePresence>
      {menuOpen && (
        <motion.div className="mobile-nav-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
          <button type="button" className="mobile-nav-backdrop" onClick={() => closeMobileMenu(true)} aria-label={t('nav.closeMenu')} />
          <motion.aside
            ref={mobileSheetRef}
            id="mobile-navigation"
            className="mobile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.mobile')}
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="mobile-nav-heading">
              <a href="/" className="site-brand" onClick={() => closeMobileMenu()}>
                <img src={ASSETS.logo} alt="" /><span>Botani Seed</span>
              </a>
              <button type="button" className="site-icon-button" onClick={() => closeMobileMenu(true)} aria-label={t('nav.closeMenu')}>
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-nav-content" aria-label={t('nav.primary')}>
              <button
                type="button"
                className={`mobile-home-trigger${homeGroupActive ? ' active' : ''}`}
                onClick={() => setMobileHomeOpen((open) => !open)}
                aria-expanded={mobileHomeOpen}
                aria-controls="mobile-homepage-links"
              >
                <span>{t('nav.homepages')}</span>
                <ChevronDown size={18} className={mobileHomeOpen ? 'rotated' : ''} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {mobileHomeOpen && (
                  <motion.div
                    id="mobile-homepage-links"
                    className="mobile-homepage-links"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {homepageLinks(true)}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mobile-direct-links">
                {directLinks.map(({ label, href, icon: Icon, active }) => (
                  <a key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} onClick={() => closeMobileMenu()}>
                    <Icon size={19} aria-hidden="true" /><span>{label}</span>{active && <Check size={17} aria-label={t('nav.currentPage')} />}
                  </a>
                ))}
              </div>
            </nav>

            <div className="mobile-nav-footer">
              <div className="mobile-nav-utilities">
                <LanguageToggle className="mobile-language-toggle" />
                <ThemeToggleButton className="mobile-theme-toggle" />
              </div>
              <button type="button" className="site-order" onClick={openCheckout}>{t('nav.orderNow')}</button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}

export default Navbar;
