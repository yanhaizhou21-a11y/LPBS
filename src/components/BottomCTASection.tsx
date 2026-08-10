import { motion, useReducedMotion } from 'motion/react';

interface BottomCTASectionProps {
  onOpenCheckout: () => void;
}

export function BottomCTASection({ onOpenCheckout }: BottomCTASectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const waLink = "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20melihat%20Paket%20Benih%20Sayur%20dari%20Google.%20Saya%20ingin%20memesan.";

  return (
    <section className="section dark bottom-cta-section">
      <div className="container cta-box text-center">
        <motion.span className="eyebrow eyebrow-badge-orange" {...enter(0.05)}>
          MULAI SEKARANG
        </motion.span>
        <motion.h2 className="cta-headline" {...enter(0.12)}>
          Jangan Cuma Lihat Kebun Tetangga
        </motion.h2>
        <motion.p className="cta-sub" {...enter(0.2)}>
          Mulai tanam sendiri sayuran segar favoritmu sekarang di rumah.
        </motion.p>
        <motion.div className="cta-buttons-group" {...enter(0.3)}>
          <button
            type="button"
            onClick={onOpenCheckout}
            className="hero-green-btn cta-primary-btn"
          >
            Pesan Paket Sekarang
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-wa-btn cta-wa-btn"
          >
            💬 Konsultasi via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
