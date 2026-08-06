import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalQty: number;
  normalTotal: number;
  discountTotal: number;
  subtotal: number;
  isPromoEligible: boolean;
  onUpdateQty: (id: string, qty: number) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  totalQty,
  normalTotal,
  discountTotal,
  subtotal,
  isPromoEligible,
  onUpdateQty,
  onClearCart,
  onOpenCheckout
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    onOpenCheckout();
  };

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={e => e.stopPropagation()}>
        <header className="cart-drawer-header">
          <div className="header-title">
            <span className="drawer-icon">🛒</span>
            <h3 id="cart-title">Keranjang Belanja</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Tutup keranjang">
            ×
          </button>
        </header>

        <div className="cart-drawer-body">
          {totalQty === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-icon">🌱</span>
              <p>Keranjang belanja Anda masih kosong.</p>
              <button className="empty-action-btn" onClick={onClose}>
                Lihat Promo & Pesan Benih
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {items.map(item => (
                  <div className="cart-item-card" key={item.id}>
                    <div className="item-icon">🌱</div>
                    <div className="item-details">
                      <strong className="item-name">{item.name}</strong>
                      <span className="item-price">Rp {item.price.toLocaleString('id-ID')} / paket</span>
                      <div className="item-qty-control">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isPromoEligible ? (
                <div className="cart-promo-banner success">
                  🎉 Diskon 20% aktif! Hemat Rp {discountTotal.toLocaleString('id-ID')}
                </div>
              ) : items.some((item) => item.id === 'paket-benih-sayur') ? (
                <div className="cart-promo-banner info">
                  💡 Tambah {5 - (items.find((item) => item.id === 'paket-benih-sayur')?.qty || 0)} paket promo lagi untuk klaim diskon 20%!
                </div>
              ) : null}

              <div className="cart-summary-box">
                <div className="summary-row">
                  <span>Harga Normal:</span>
                  <strong>Rp {normalTotal.toLocaleString('id-ID')}</strong>
                </div>
                <div className="summary-row discount">
                  <span>Diskon Promo (20%):</span>
                  <strong>−Rp {discountTotal.toLocaleString('id-ID')}</strong>
                </div>
                <div className="summary-row subtotal">
                  <span>Subtotal Produk:</span>
                  <strong>Rp {subtotal.toLocaleString('id-ID')}</strong>
                </div>
                <small className="summary-note">
                  * Ongkir JNE dihitung otomatis pada langkah pengiriman checkout.
                </small>
              </div>
            </>
          )}
        </div>

        {totalQty > 0 && (
          <footer className="cart-drawer-footer">
            <button className="start-checkout-btn" onClick={handleCheckoutClick}>
              Lanjut ke Pemesanan (Checkout)
            </button>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Kosongkan Keranjang
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};
