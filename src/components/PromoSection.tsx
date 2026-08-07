import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle, Play, ShoppingCart, Video, Zap } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface PromoSectionProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onAddToCart, onOpenCheckout }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="promo" className="promo-section">
      <div className="container">
        {/* VALUE HIGHLIGHT ROW (Section 5) */}
        <motion.div
          className="value-highlight-wrapper"
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="video-card-dark">
            {!isPlayingVideo ? (
              <div className="video-thumb-overlay" onClick={() => setIsPlayingVideo(true)} role="button" tabIndex={0}>
                <div className="play-circle-btn">
                  <Play size={28} fill="currentColor" />
                </div>
                <strong>PUTAR VIDEO (1:45)</strong>
                <h4>Panduan & Informasi Benih Sayur</h4>
                <p>Perkenalan lengkap isian paket benih dan panduan tanam.</p>
              </div>
            ) : (
              <div className="video-responsive">
                <iframe
                  src="https://www.youtube.com/embed/5aC8q20T52E?autoplay=1"
                  title="Video Perkenalan & Budidaya Benih Sayur Botani Seed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="value-content-col">
            <h2 className="value-title">
              Rp20.000 sudah bisa dapat paket berisi 10 jenis benih.
            </h2>
            <p className="value-desc">
              Setiap paket berisi varietas pilihan dengan daya berkecambah di atas 85% untuk kebutuhan tanam rumah tangga maupun usaha tani.
            </p>
            <button className="value-order-btn" onClick={onOpenCheckout}>
              Pesan Paket Benih
            </button>
          </div>
        </motion.div>

        {/* PROMO 5 PAKET SECTION (Section 6) */}
        <motion.div
          className="promo-5-wrapper"
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="promo-poster-col">
            <div className="promo-poster-card" onClick={onOpenCheckout} role="button" tabIndex={0}>
              <img src={ASSETS.productBanner} alt="Beli 5 Paket Hemat 20% Botani Seed" className="promo-poster-img" />
            </div>
          </div>

          <div className="promo-details-card">
            <span className="card-tag">PROMO HEMAT TERBATAS</span>
            <h2 className="promo-title">Beli 5 Paket, Hemat 20%</h2>
            <p className="promo-subtitle">
              Dari harga normal Rp100.000 menjadi hanya Rp80.000. Berlaku untuk kelipatan 5 paket benih.
            </p>

            <div className="promo-notice-box">
              <AlertTriangle size={18} aria-hidden="true" />
              <span>
                <strong>PEMBERITAHUAN PENYESUAIAN HARGA PROMO:</strong> Promo diskon 20% ini berlaku sebelum penyesuaian tarif berikutnya.
              </span>
            </div>

            <div className="promo-price-bar">
              <div className="price-item normal">
                <span>Harga Normal</span>
                <strong>Rp 100.000</strong>
              </div>
              <div className="price-item promo">
                <span>Harga Promo</span>
                <strong>Rp 80.000</strong>
              </div>
            </div>

            <div className="promo-card-actions">
              <button className="promo-add-btn" onClick={() => { onAddToCart(5); onOpenCheckout(); }}>
                <ShoppingCart size={18} aria-hidden="true" /> Beli 5 Paket Sekarang (Rp 80.000)
              </button>
              <button className="promo-checkout-btn" onClick={onOpenCheckout}>
                <Zap size={18} aria-hidden="true" /> Pesan Langsung Sekarang
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
