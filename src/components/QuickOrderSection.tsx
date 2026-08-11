import React, { useState } from 'react';
import { Lightbulb, MessageCircle, PartyPopper, ShoppingBag } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface QuickOrderSectionProps {
  onSetQtyDirectly: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const QuickOrderSection: React.FC<QuickOrderSectionProps> = ({
  onSetQtyDirectly,
  onOpenCheckout
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(5);
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  const unitPrice = 20000;
  const isPromo = selectedQty >= 5;
  const normalTotal = selectedQty * unitPrice;
  const discountAmount = isPromo ? Math.round(normalTotal * 0.2) : 0;
  const subtotal = normalTotal - discountAmount;

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1) return;
    setSelectedQty(newQty);
  };

  const handleCheckoutClick = () => {
    onSetQtyDirectly(selectedQty);
    onOpenCheckout();
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Botani Seed, saya ingin memesan ${selectedQty} Paket Benih Sayur Unggul. Total: Rp ${subtotal.toLocaleString('id-ID')}.`
  );

  return (
    <section id="pesan-sekarang" ref={containerRef} className="quick-order-section">
      <div className="container">
        <div className="quick-order-grid">
          {/* LEFT PRODUCT DISPLAY CARD */}
          <div data-reveal className="quick-product-card">
            <div className="product-card-top-panel">
              <img src={ASSETS.productBanner} alt="Paket Benih Sayur Botani Seed" className="quick-product-img" />
              <div className="product-card-bottom-bar">
                <strong>PAKET BENIH SAYUR BOTANI SEED</strong>
                <span>1 PAKET = 10 BENIH SAYURAN</span>
              </div>
            </div>
          </div>

          {/* RIGHT ORDER CALCULATOR FORM */}
          <div data-reveal className="quick-order-form-panel">
            <span className="card-tag">PEMESANAN LANGSUNG</span>
            <h2 className="quick-title">Paket Benih Sayur Botani Seed</h2>
            <p className="quick-subtitle">
              Pilih jumlah paket yang ingin Anda pesan. Dapatkan diskon 20% otomatis untuk pemesanan 5 paket atau lebih.
            </p>

            <div className="qty-picker-box">
              <span className="qty-picker-label">Jumlah Pesanan:</span>
              <div className="qty-counter-row">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleQtyChange(selectedQty - 1)}
                  disabled={selectedQty <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={selectedQty}
                  onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
                  className="qty-input"
                />
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleQtyChange(selectedQty + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {isPromo ? (
              <div className="promo-status-msg success">
                <PartyPopper size={17} aria-hidden="true" /> Selamat! Anda berhak mendapatkan <strong>Diskon 20%</strong> (Hemat Rp {discountAmount.toLocaleString('id-ID')}).
              </div>
            ) : (
              <div className="promo-status-msg info">
                <Lightbulb size={17} aria-hidden="true" /> Tambah {5 - selectedQty} paket lagi untuk klaim <strong>Diskon 20%</strong>.
              </div>
            )}

            <div className="subtotal-display-card">
              <span>Total Harga Produk:</span>
              <strong className="subtotal-amount">Rp {subtotal.toLocaleString('id-ID')}</strong>
              {isPromo && <small className="normal-strike">Rp {normalTotal.toLocaleString('id-ID')}</small>}
            </div>

            <div className="quick-action-buttons">
              <button
                type="button"
                className="btn-buy-now-green"
                onClick={handleCheckoutClick}
              >
                <ShoppingBag size={18} aria-hidden="true" /> Beli Sekarang
              </button>
              <a
                href={`https://wa.me/6281299450708?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-order-wa-orange"
              >
                <MessageCircle size={18} aria-hidden="true" /> Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickOrderSection;
