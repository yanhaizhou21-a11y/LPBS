import { motion, useReducedMotion } from 'motion/react';
import { Sprout } from 'lucide-react';

interface PaketIsiSectionProps {
  onOpenCheckout: () => void;
}

export function PaketIsiSection({ onOpenCheckout }: PaketIsiSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const vegItems = [
    { title: 'Cabai Rawit Merah', sub: 'Cabai Rawit Merah' },
    { title: 'Cabai Keriting', sub: 'Cabai Keriting' },
    { title: 'Sawi Caisim', sub: 'Sawi Caisim' },
    { title: 'Terong Ungu', sub: 'Terong Ungu' },
    { title: 'Tomat', sub: 'Tomat' },
    { title: 'Bayam Hijau', sub: 'Bayam Hijau' },
    { title: 'Kangkung Darat', sub: 'Kangkung Darat' },
    { title: 'Seledri Amigo', sub: 'Seledri Amigo' },
    { title: 'Timun Suri', sub: 'Timun Suri' },
    { title: 'Gambas', sub: 'Gambas' },
  ];

  return (
    <section id="paket" className="section dark paket-isi-section">
      <div className="container">
        <div className="section-title text-center">
          <motion.span className="eyebrow eyebrow-badge-orange" {...enter(0.05)}>
            ISI PAKET
          </motion.span>
          <motion.h2 {...enter(0.12)}>
            Apa Saja yang Ada di Dalam Paket?
          </motion.h2>
          <motion.p {...enter(0.2)}>
            10 Jenis Benih Sayuran Favorit Keluarga dalam 1 Paket
          </motion.p>
        </div>

        <div className="paket-grid">
          {vegItems.map((item, idx) => (
            <motion.div
              key={item.title}
              className="paket-card"
              {...enter(0.15 + idx * 0.05)}
            >
              <div className="paket-icon">
                <Sprout size={24} className="text-emerald-600" />
              </div>
              <div className="paket-name">{item.title}</div>
              <div className="paket-sub">{item.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div className="paket-bottom-banner" {...enter(0.5)}>
          <div className="paket-price-tag">
            <span className="price-label">1 Paket</span>
            <strong className="price-val">Rp20.000</strong>
          </div>
          <button
            type="button"
            onClick={onOpenCheckout}
            className="hero-green-btn paket-buy-btn"
          >
            Beli Paket Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
}
