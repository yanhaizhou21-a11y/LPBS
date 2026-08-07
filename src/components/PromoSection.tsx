import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, ShoppingCart, Video, Zap } from 'lucide-react';

interface PromoSectionProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onAddToCart, onOpenCheckout }) => {
  return (
    <section id="promo" className="promo-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">PROMO HEMAT TERBATAS</span>
          <h2 className="section-title">
            Beli 5 Paket <span className="text-gradient">Hemat 20%</span>
          </h2>
          <p className="section-desc">
            Manfaatkan harga promo paket hemat budidaya sayuran unggul sebelum batas penyesuaian harga promo berakhir.
          </p>
        </div>

        <div className="promo-notice-banner">
          <div className="notice-icon"><AlertTriangle size={26} aria-hidden="true" /></div>
          <div className="notice-content">
            <strong>PEMBERITAHUAN PENYESUAIAN HARGA PROMO:</strong>
            <p>
              Promo hemat 20% berlaku untuk setiap pembelian kelipatan 5 paket benih. 
              Harga normal 5 paket <strong>Rp 100.000</strong> menjadi hanya <strong>Rp 80.000</strong> (Rp 16.000/paket). 
              Penyesuaian tarif promo berikutnya akan diberlakukan mulai <strong>24 Agustus 2026</strong>.
            </p>
          </div>
        </div>

        <div className="promo-grid">
          <div className="promo-video-wrap">
            <div className="video-responsive">
              <iframe
                src="https://www.youtube.com/embed/5aC8q20T52E"
                title="Video Perkenalan & Budidaya Benih Sayur Botani Seed"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <span className="video-caption"><Video size={17} aria-hidden="true" /> Video Panduan & Informasi Benih Sayur Botani Seed</span>
          </div>

          <div className="promo-details-card">
            <span className="card-tag">PAKET PROMO HEMAT 5+</span>
            <h3>Hitungan Hemat Pembelian Promo</h3>

            <div className="promo-price-compare">
              <div className="price-box normal">
                <span>Harga Normal 5 Paket</span>
                <strong>Rp 100.000</strong>
              </div>
              <div className="price-arrow"><ArrowRight size={24} aria-hidden="true" /></div>
              <div className="price-box discount">
                <span>Harga Promo (Diskon 20%)</span>
                <strong>Rp 80.000</strong>
                <small>Hemat Rp 20.000!</small>
              </div>
            </div>

            <ul className="promo-feature-list">
              <li><CheckCircle2 size={18} aria-hidden="true" /> Isian 10 jenis benih sayur pilihan unggul bersertifikat</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Daya kecambah & pertumbuhan tinggi (di atas 85%)</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Dilengkapi panduan cara penyemaian & perawatan</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Ongkir JNE dihitung otomatis dan akurat sesuai tujuan</li>
            </ul>

            <div className="promo-card-actions">
              <button className="promo-add-btn" onClick={() => onAddToCart(5)}>
                <ShoppingCart size={18} aria-hidden="true" /> Tambahkan 5 Paket ke Keranjang (Rp 80.000)
              </button>
              <button className="promo-checkout-btn" onClick={onOpenCheckout}>
                <Zap size={18} aria-hidden="true" /> Pesan Langsung Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
