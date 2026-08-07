import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Salad, Store, TrendingUp } from 'lucide-react';

export const PeluangSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const opportunities = [
    {
      icon: Salad,
      iconBg: '#dcfce7',
      iconColor: '#166534',
      title: 'Kebutuhan harian',
      desc: 'Rumah tangga, warung makan, dan usaha kuliner membutuhkan pasokan sayuran secara rutin.'
    },
    {
      icon: Store,
      iconBg: '#ffedd5',
      iconColor: '#c2410c',
      title: 'Pasar beragam',
      desc: 'Penjualan dapat dilakukan ke tetangga, pasar, warung, komunitas, dan kanal pemesanan online.'
    },
    {
      icon: TrendingUp,
      iconBg: '#ccfbf1',
      iconColor: '#0f766e',
      title: 'Bisa berkembang bertahap',
      desc: 'Mulai dari satu komoditas, lalu tambah pilihan produk ketika permintaan dan kemampuan meningkat.'
    }
  ];

  return (
    <section id="peluang" className="peluang-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title peluang-main-title">
            Kenapa jualan sayur punya peluang?
          </h2>
          <p className="section-desc peluang-main-subtitle">
            Sayuran dibutuhkan setiap hari dan dapat dipasarkan melalui lingkungan sekitar maupun kanal digital.
          </p>
        </motion.div>

        <motion.div
          className="opportunities-grid"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          {opportunities.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <motion.div
              className="opportunity-card"
              key={title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <div className="card-corner-shape" aria-hidden="true" />
              <div className="card-icon-badge" style={{ backgroundColor: iconBg, color: iconColor }}>
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="card-title">{title}</h3>
              <p className="card-desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
