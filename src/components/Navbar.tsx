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
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const homeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSheetRef = useRef<HTMLElement>(null);
  const homeMenuRef = useRef<HTMLDivElement>(null);
  const pathname = currentPath.split('#')[0] || '/';
  const homepageItems = PUBLIC_PAGES.filter((page) => page.navigationVisible && page.group === 'homepages');
  const productPage = PUBLIC_PAGES.find((page) => page.id === 'products' && page.navigationVisible);
  const homeGroupActive = homepageItems.some((page) => page.path === pathname);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setVisible(menuOpen || homeMenuOpen || current < 80 || current < lastScrollY.current || current <= lastScrollY.current + 4);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [homeMenuOpen, menuOpen]);

  useEffect(() => {
    if (!homeMenuOpen) return;
    const close = (event: PointerEvent) => {
      if (!homeMenuRef.current?.contains(event.target as Node)) setHomeMenuOpen(false);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
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
      const items = [...(mobileSheetRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])];
      const first = items[0];
      const last = items[items.length - 1];
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
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setHomeMenuOpen(false);
        requestAnimationFrame(() => homeButtonRef.current?.focus());
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [homeMenuOpen]);

  const closeMobileMenu = () => setMenuOpen(false);
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

  const homepageLinks = homepageItems.map((page) => {
    const active = page.path === pathname;
    return (
      <a key={page.id} href={page.path} className={`botani-home-option${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => setHomeMenuOpen(false)}>
        <span className="botani-home-icon"><Home size={18} aria-hidden="true" /></span>
        <span className="botani-home-copy">
          <strong>{t(page.labelKey)}</strong>
          {page.descriptionKey && <small>{t(page.descriptionKey)}</small>}
        </span>
        {active && <Check size={18} aria-label={t('nav.currentPage')} />}
      </a>
    );
  });

  return (
    <>
      <motion.header className="botani-navbar" animate={{ y: visible ? 0 : -100 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 40 }}>
        <div className="botani-navbar-inner">
          <a href="/" className="botani-brand" aria-label="Botani Seed">
            <img src={ASSETS.logo} alt="" width="42" height="42" />
            <span>Botani Seed</span>
          </a>

          <nav className="botani-desktop-nav" aria-label={t('nav.primary')}>
            <div className="botani-home-menu" ref={homeMenuRef}>
              <button ref={homeButtonRef} type="button" className={`botani-nav-link${homeGroupActive ? ' is-active' : ''}`} aria-expanded={homeMenuOpen} aria-controls="homepage-popover" onClick={() => setHomeMenuOpen((open) => !open)}>
                {t('nav.homepages')}
                <ChevronDown size={16} className={homeMenuOpen ? 'is-open' : ''} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {homeMenuOpen && (
                  <motion.div id="homepage-popover" className="botani-home-popover" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}>
                    <p>{t('nav.homepagesDescription')}</p>
                    {homepageLinks}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {productPage && <a href={productPage.path} className={`botani-nav-link${pathname === productPage.path ? ' is-active' : ''}`} aria-current={pathname === productPage.path ? 'page' : undefined}>{t(productPage.labelKey)}</a>}
            <a href="/#profil" className={`botani-nav-link${currentPath === '/#profil' ? ' is-active' : ''}`}>{t('nav.about')}</a>
          </nav>

          <div className="botani-desktop-actions">
            <LanguageToggle className="botani-language" />
            <ThemeToggleButton className="botani-theme-toggle" />
            <button type="button" className="botani-cart-button" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
              <ShoppingBag size={19} aria-hidden="true" />
              <span>{t('nav.cart')}</span>
              {cartQty > 0 && <b>{cartQty}</b>}
            </button>
            <button type="button" className="botani-order-button" onClick={openCheckout}>{t('nav.orderNow')}</button>
          </div>

          <div className="botani-mobile-actions">
            <button type="button" className="botani-icon-button" onClick={openCart} aria-label={`${t('nav.cart')}: ${cartQty}`}>
              <ShoppingBag size={21} aria-hidden="true" />
              {cartQty > 0 && <b>{cartQty}</b>}
            </button>
            <button ref={menuButtonRef} type="button" className="botani-icon-button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={t('nav.openMenu')}>
              <Menu size={23} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>
      <div className="botani-navbar-spacer" aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="botani-mobile-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
            <button type="button" className="botani-mobile-backdrop" onClick={() => { closeMobileMenu(); menuButtonRef.current?.focus(); }} aria-label={t('nav.closeMenu')} />
            <motion.aside ref={mobileSheetRef} id="mobile-navigation" className="botani-mobile-sheet" role="dialog" aria-modal="true" aria-label={t('nav.mobile')} initial={reduceMotion ? false : { x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 38 }}>
              <div className="botani-mobile-heading">
                <a href="/" className="botani-brand" onClick={closeMobileMenu}><img src={ASSETS.logo} alt="" width="40" height="40" /><span>Botani Seed</span></a>
                <button type="button" className="botani-icon-button" onClick={closeMobileMenu} aria-label={t('nav.closeMenu')}><X size={22} /></button>
              </div>
              <nav className="botani-mobile-nav" aria-label={t('nav.primary')}>
                <p>{t('nav.homepages')}</p>
                {homepageItems.map((page) => <a key={page.id} href={page.path} className={page.path === pathname ? 'is-active' : ''} onClick={closeMobileMenu}><Home size={19} /><span>{t(page.labelKey)}</span>{page.path === pathname && <Check size={18} />}</a>)}
                <div className="botani-mobile-divider" />
                {productPage && <a href={productPage.path} className={pathname === productPage.path ? 'is-active' : ''} onClick={closeMobileMenu}><PackageSearch size={19} /><span>{t(productPage.labelKey)}</span></a>}
                <a href="/#profil" onClick={closeMobileMenu}><Building2 size={19} /><span>{t('nav.about')}</span></a>
              </nav>
              <div className="botani-mobile-footer">
                <div><LanguageToggle className="botani-language" /><ThemeToggleButton className="botani-theme-toggle" /></div>
                <button type="button" className="botani-order-button" onClick={openCheckout}><ShoppingBag size={19} />{t('nav.orderNow')}</button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
