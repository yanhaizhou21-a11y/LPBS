import React from 'react';
import { Salad, Store, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PeluangSection: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.12, y: 35 });

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
    <section id="peluang" ref={containerRef} className="peluang-section">
      <div className="container">
        <div data-reveal className="section-header text-center">
          <h2 className="section-title peluang-main-title">
            Kenapa jualan sayur punya peluang?
          </h2>
          <p className="section-desc peluang-main-subtitle">
            Sayuran dibutuhkan setiap hari dan dapat dipasarkan melalui lingkungan sekitar maupun kanal digital.
          </p>
        </div>

        <div className="opportunities-grid">
          {opportunities.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <div data-reveal className="opportunity-card" key={title}>
              <div className="card-corner-shape" aria-hidden="true" />
              <div className="card-icon-badge" style={{ backgroundColor: iconBg, color: iconColor }}>
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="card-title">{title}</h3>
              <p className="card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeluangSection;
