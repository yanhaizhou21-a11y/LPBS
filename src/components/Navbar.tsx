import React from 'react';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface NavbarProps {
  cartQty: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartQty, onOpenCart, onOpenCheckout }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        <a href="#" className="nav-brand">
          <img src={ASSETS.logo} alt="Logo Botani Seed" className="nav-logo-img" />
          <div className="nav-brand-text">
            <span className="brand-name">PT. Botani Seed Indonesia</span>
            <span className="brand-tagline">Solusi Benih Sayuran Unggul</span>
          </div>
        </a>

        <nav className="nav-menu">
          <a href="#peluang" className="nav-link">{t('businessOpportunities')}</a>
          <a href="#kisah" className="nav-link">{t('farmerStories')}</a>
          <a href="#profil" className="nav-link">{t('companyProfile')}</a>
          <a href="#promo" className="nav-link nav-link-highlight">{t('promo5Packs')}</a>
          <a href="#faq" className="nav-link">{t('faq')}</a>
        </nav>

        <div className="nav-actions flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            title={language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
            className="lang-switcher-btn flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button className="cart-trigger-btn" onClick={onOpenCart} aria-label={t('cart')}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">{t('cart')}</span>
            {cartQty > 0 && <span className="cart-badge">{cartQty}</span>}
          </button>

          <button className="nav-order-btn" onClick={onOpenCheckout}>
            {t('orderNow')}
          </button>
        </div>
      </div>
    </header>
  );
};
