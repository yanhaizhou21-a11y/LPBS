import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../data/assets';

interface HeroSectionProps {
  onAddToCart?: (qty: number) => void;
  onOpenCheckout: () => void;
  variant?: 1 | 2;
}

export function HeroSection({ onOpenCheckout, variant = 1 }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const isV2 = variant === 2;

  const waLink = "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20melihat%20Paket%20Benih%20Sayur%20dari%20Google.%20Saya%20ingin%20memesan.";

  return (
    <section className="hero-section" id="top">
      <div className="hero-seed-grid" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div className="hero-eyebrow" {...enter(0.05)}>
            <span className={isV2 ? "eyebrow-badge eyebrow-badge-orange" : "eyebrow-badge eyebrow-badge-green"}>
              {isV2 ? 'PANEN LEBIH MAKSIMAL' : 'PELUANG USAHA SAYURAN DARI RUMAH'}
            </span>
          </motion.div>

          <motion.h1 className="hero-title" {...enter(0.12)}>
            {isV2 ? (
              <>Kok Sayuran Tetangga Bisa <span className="hero-text-highlight">Lebih Subur?</span></>
            ) : (
              <>Hanya dari jualan sayuran bisa menghasilkan <span className="hero-text-highlight">2 digit?</span></>
            )}
          </motion.h1>

          <motion.p className="hero-lead" {...enter(0.2)}>
            {isV2
              ? 'Bisa jadi rahasianya ada di media tanam & nutrisi yang tepat. Dengan Paket Sayur Botani Seed, tanamanmu bisa tumbuh lebat dan segar dari rumah.'
              : 'Dua kisah nyata menunjukkan bahwa usaha sayuran dapat berkembang ketika dijalankan konsisten, memahami pasokan, dan memanfaatkan saluran penjualan yang tepat.'}
          </motion.p>

          <motion.div className="hero-actions" {...enter(0.32)}>
            {isV2 ? (
              <div className="hero-buttons-group">
                <button
                  type="button"
                  onClick={onOpenCheckout}
                  className="hero-green-btn"
                >
                  Pesan Sekarang
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-wa-btn"
                >
                  💬 Pesan via WhatsApp
                </a>
              </div>
            ) : (
              <motion.a
                href="#kisah"
                className="hero-orange-btn"
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Simak Kisahnya ↓
              </motion.a>
            )}
          </motion.div>

          <motion.p className="hero-disclaimer-note" {...enter(0.4)}>
            {isV2
              ? '*Pengiriman cepat ke seluruh Indonesia'
              : '*Penghasilan bukan jaminan hasil. Omzet berbeda dengan laba dan dipengaruhi skala usaha, biaya, pasokan, lokasi, serta pemasaran.'}
          </motion.p>
        </div>

        <motion.div className="hero-visual" {...enter(0.28)}>
          <div
            className="hero-poster-card"
            onClick={onOpenCheckout}
            role="button"
            tabIndex={0}
            aria-label="Pesan paket benih sayur"
          >
            <img
              src={isV2 ? '/images/hero2-poster.png' : ASSETS.productBanner}
              alt={isV2 ? 'Kok Sayuran Tetangga Bisa Lebih Subur? - Botani Seed' : 'Hanya dari jualan sayuran bisa menghasilkan 2 digit - Botani Seed'}
              className="hero-poster-img"
              width="900"
              height="1100"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
