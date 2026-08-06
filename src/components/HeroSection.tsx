import React from 'react';

interface HeroSectionProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAddToCart, onOpenCheckout }) => {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-badge">🌱 BENIH SAYURAN UNGGUL BERSERTIFIKAT</span>
            <span className="eyebrow-sub">Pilihan Petani & Pengusaha Muda Indonesia</span>
          </div>

          <h1 className="hero-title">
            Mulailah Usaha Benih Sayuran <span className="text-gradient">Menguntungkan</span> Dari Rumah!
          </h1>

          <p className="hero-lead">
            Dapatkan Paket Benih Sayuran Unggul dari <strong>PT. Botani Seed Indonesia</strong>. 
            Solusi praktis untuk kebutuhan pangan harian, hobi berkebun, hingga peluang usaha pertanian modern bernilai tinggi.
          </p>

          <div className="hero-pills">
            <div className="hero-pill">
              <span className="pill-icon">✓</span>
              <span>Day Tumbuh Tinggi & Sertifikasi Resmi</span>
            </div>
            <div className="hero-pill">
              <span className="pill-icon">✓</span>
              <span>10+ Jenis Benih Pilihan Terfavorit</span>
            </div>
            <div className="hero-pill">
              <span className="pill-icon">✓</span>
              <span>Pengiriman Otomatis Tarif JNE Se-Indonesia</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="hero-primary-btn" onClick={onOpenCheckout}>
              <span>⚡ Pesan Sekarang</span>
            </button>
            <button className="hero-secondary-btn" onClick={() => onAddToCart(5)}>
              <span>🛒 Beli 5 Paket (Hemat 20%)</span>
            </button>
          </div>

          <div className="hero-guarantee-note">
            <small>🔒 Pembayaran Aman QRIS & Transfer Bank Resmi PT. Botani Seed Indonesia</small>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-product">
            <div className="product-badge-discount">Diskon 20% Beli 5+</div>
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?q=80&w=1000&auto=format&fit=crop" 
                alt="Paket Benih Sayur Botani Seed" 
                className="hero-product-img" 
              />
            </div>

            <div className="product-card-body">
              <span className="product-category">PAKET LENGKAP SIAP TANAM</span>
              <h3 className="product-card-title">Paket Benih Sayur Unggul Botani Seed</h3>
              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-score">4.9 / 5.0</span>
                <span className="rating-count">(1,240+ Ulasan Petani)</span>
              </div>

              <div className="price-tag-wrap">
                <div className="price-single">
                  <span className="price-label">Harga Satuan:</span>
                  <span className="price-val">Rp 20.000</span>
                </div>
                <div className="price-promo">
                  <span className="promo-label">Promo 5 Paket:</span>
                  <span className="promo-val">Rp 80.000</span>
                  <span className="normal-cross">Rp 100.000</span>
                </div>
              </div>

              <div className="product-card-footer">
                <button className="card-add-btn" onClick={() => onAddToCart(1)}>
                  + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
