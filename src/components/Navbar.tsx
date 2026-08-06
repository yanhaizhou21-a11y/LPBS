import React from 'react';
import { ASSETS } from '../data/assets';

interface NavbarProps {
  cartQty: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartQty, onOpenCart, onOpenCheckout }) => {
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
          <a href="#peluang" className="nav-link">Peluang Usaha</a>
          <a href="#kisah" className="nav-link">Kisah Petani</a>
          <a href="#profil" className="nav-link">Profil Perusahaan</a>
          <a href="#promo" className="nav-link nav-link-highlight">Promo 5 Paket</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        <div className="nav-actions">
          <button className="cart-trigger-btn" onClick={onOpenCart} aria-label="Buka Keranjang">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Keranjang</span>
            {cartQty > 0 && <span className="cart-badge">{cartQty}</span>}
          </button>

          <button className="nav-order-btn" onClick={onOpenCheckout}>
            Pesan Sekarang
          </button>
        </div>
      </div>
    </header>
  );
};
