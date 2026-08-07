import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../data/assets';

interface HeroSectionProps {
  onAddToCart?: (qty: number) => void;
  onOpenCheckout: () => void;
}

export function HeroSection({ onOpenCheckout }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero-section" id="top">
      <div className="hero-seed-grid" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div className="hero-eyebrow" {...enter(0.05)}>
            <span className="eyebrow-badge eyebrow-badge-green">
              PELUANG USAHA SAYURAN DARI RUMAH
            </span>
          </motion.div>

          <motion.h1 className="hero-title" {...enter(0.12)}>
            Hanya dari jualan sayuran bisa menghasilkan <span className="hero-text-highlight">2 digit?</span>
          </motion.h1>

          <motion.p className="hero-lead" {...enter(0.2)}>
            Dua kisah nyata menunjukkan bahwa usaha sayuran dapat berkembang ketika dijalankan konsisten, memahami pasokan, dan memanfaatkan saluran penjualan yang tepat.
          </motion.p>

          <motion.div className="hero-actions" {...enter(0.32)}>
            <motion.a
              href="#kisah"
              className="hero-orange-btn"
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              Simak Kisahnya ↓
            </motion.a>
          </motion.div>

          <motion.p className="hero-disclaimer-note" {...enter(0.4)}>
            *Penghasilan bukan jaminan hasil. Omzet berbeda dengan laba dan dipengaruhi skala usaha, biaya, pasokan, lokasi, serta pemasaran.
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
              src={ASSETS.productBanner}
              alt="Hanya dari jualan sayuran bisa menghasilkan 2 digit - Botani Seed"
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
