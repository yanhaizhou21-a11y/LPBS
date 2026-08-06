import React, { useState } from 'react';

interface QuickOrderSectionProps {
  onSetQtyDirectly: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const QuickOrderSection: React.FC<QuickOrderSectionProps> = ({
  onSetQtyDirectly,
  onOpenCheckout
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(5);

  const unitPrice = 20000;
  const isPromo = selectedQty >= 5;
  const normalTotal = selectedQty * unitPrice;
  const discountAmount = isPromo ? Math.round(normalTotal * 0.2) : 0;
  const subtotal = normalTotal - discountAmount;

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1) return;
    setSelectedQty(newQty);
  };

  const handleQuickPreset = (qty: number) => {
    setSelectedQty(qty);
  };

  const handleAddToCartClick = () => {
    onSetQtyDirectly(selectedQty);
  };

  const handleCheckoutClick = () => {
    onSetQtyDirectly(selectedQty);
    onOpenCheckout();
  };

  return (
    <section id="pesan-sekarang" className="quick-order-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">SIMULASI & PEMESANAN LANGSUNG</span>
          <h2 className="section-title">
            Hitung & Pesan <span className="text-gradient">Paket Benih Sayur</span>
          </h2>
          <p className="section-desc">
            Pilih jumlah paket yang ingin Anda pesan. Dapatkan harga hemat 20% otomatis dengan memesan 5 paket atau lebih.
          </p>
        </div>

        <div className="quick-order-calculator">
          <div className="calculator-card">
            <h3>Tentukan Jumlah Pesanan</h3>

            <div className="preset-buttons">
              <button
                type="button"
                className={`preset-btn ${selectedQty === 1 ? 'active' : ''}`}
                onClick={() => handleQuickPreset(1)}
              >
                1 Paket (Rp 20.000)
              </button>
              <button
                type="button"
                className={`preset-btn ${selectedQty === 5 ? 'active' : ''}`}
                onClick={() => handleQuickPreset(5)}
              >
                5 Paket (Hemat 20% — Rp 80.000)
              </button>
              <button
                type="button"
                className={`preset-btn ${selectedQty === 10 ? 'active' : ''}`}
                onClick={() => handleQuickPreset(10)}
              >
                10 Paket (Hemat 20% — Rp 160.000)
              </button>
            </div>

            <div className="qty-control-wrap">
              <label htmlFor="customQty">Jumlah Paket Custom:</label>
              <div className="qty-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => handleQtyChange(selectedQty - 1)}
                  disabled={selectedQty <= 1}
                >
                  −
                </button>
                <input
                  id="customQty"
                  type="number"
                  min="1"
                  value={selectedQty}
                  onChange={e => handleQtyChange(parseInt(e.target.value) || 1)}
                  className="counter-input"
                />
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => handleQtyChange(selectedQty + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {isPromo ? (
              <div className="promo-status-msg success">
                🎉 Selamat! Anda berhak mendapatkan <strong>Diskon 20%</strong> karena memesan {selectedQty} paket!
              </div>
            ) : (
              <div className="promo-status-msg info">
                💡 Tambah {5 - selectedQty} paket lagi untuk mendapatkan <strong>Diskon 20%</strong> (Hemat Rp 20.000)!
              </div>
            )}

            <div className="calc-summary-rows">
              <div className="calc-row">
                <span>Harga Normal ({selectedQty} paket × Rp 20.000):</span>
                <strong>Rp {normalTotal.toLocaleString('id-ID')}</strong>
              </div>
              <div className="calc-row discount">
                <span>Diskon Promo (20%):</span>
                <strong>−Rp {discountAmount.toLocaleString('id-ID')}</strong>
              </div>
              <div className="calc-row subtotal">
                <span>Subtotal Produk:</span>
                <strong>Rp {subtotal.toLocaleString('id-ID')}</strong>
              </div>
              <small className="calc-footnote">* Ongkos kirim JNE akan dihitung otomatis pada tahap pengiriman.</small>
            </div>

            <div className="calculator-actions">
              <button
                type="button"
                className="calc-cart-btn"
                onClick={handleAddToCartClick}
              >
                🛒 Tambahkan ke Keranjang
              </button>
              <button
                type="button"
                className="calc-checkout-btn"
                onClick={handleCheckoutClick}
              >
                ⚡ Lanjut ke Pemesanan (Checkout)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
