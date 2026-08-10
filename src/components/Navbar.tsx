import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpenText, Building2, Home, Menu, Sprout, X } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggleButton } from './ThemeToggleButton';

interface NavbarProps { cartQty?: number; onOpenCart?: () => void; onOpenCheckout: () => void; }
const NotchCurve = ({ side }: { side: 'left' | 'right' }) => <div className={`notch-curve notch-curve-${side}`} aria-hidden="true"><svg viewBox="0 0 50 64" preserveAspectRatio="none"><path d={side === 'left' ? 'M0 39.5 C25 39.5 25 63.5 50 63.5' : 'M0 63.5 C25 63.5 25 39.5 50 39.5'} /><path d={side === 'left' ? 'M0 36.5 C25 36.5 25 60.5 50 60.5' : 'M0 60.5 C25 60.5 25 36.5 50 36.5'} /></svg></div>;

export function Navbar({ onOpenCheckout }: NavbarProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isHome2 = typeof window !== 'undefined' && window.location.pathname === '/home2';
  const links = isHome2 ? [
    { label: t('nav.home'), href: '/home2#top', icon: Home },
    { label: 'Kendala', href: '/home2#kendala', icon: Sprout },
    { label: 'Solusi', href: '/home2#solusi', icon: BookOpenText },
    { label: t('nav.about'), href: '/home2#profil', icon: Building2 },
  ] : [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.opportunity'), href: '/#peluang', icon: Sprout },
    { label: t('nav.stories'), href: '/#kisah', icon: BookOpenText },
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

  return <>
    <motion.header className="notch-navbar" aria-label="Main navigation" animate={{ y: visible ? 0 : -82 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}>
      <div className="notch-side" aria-hidden="true" /><div className="notch-shell"><NotchCurve side="left" /><div className="notch-content">
        <button className="notch-icon-button mobile-menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className="notch-links" aria-label="Primary navigation">{links.slice(0, 2).map(({ label, href, icon: Icon }) => <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>)}</nav>
        <a href="/" className="notch-brand" aria-label="Botani Seed"><img src={ASSETS.logo} alt="" /><span>Botani Seed</span></a>
        <nav className="notch-links notch-links-right" aria-label="Secondary navigation">{links.slice(2).map(({ label, href, icon: Icon }) => <a key={href} href={href}><Icon size={16} /><span>{label}</span></a>)}<LanguageToggle className="notch-language-toggle" /><ThemeToggleButton className="notch-theme-toggle" /><button className="notch-order" onClick={onOpenCheckout}>{t('nav.order')}</button></nav>
      </div><NotchCurve side="right" /></div><div className="notch-side" aria-hidden="true" />
    </motion.header><div className="notch-spacer" aria-hidden="true" />
    <AnimatePresence>{menuOpen && visible && <motion.nav id="mobile-navigation" className="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }} transition={{ duration: 0.2 }} aria-label="Mobile menu">{links.map(({ label, href, icon: Icon }) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><Icon size={19} />{label}</a>)}<div className="mobile-nav-actions"><LanguageToggle className="mobile-language-toggle" /><ThemeToggleButton className="mobile-theme-toggle" /><button className="mobile-order" onClick={() => { setMenuOpen(false); onOpenCheckout(); }}>{t('nav.orderNow')}</button></div></motion.nav>}</AnimatePresence>
  </>;
}
