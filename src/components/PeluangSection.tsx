import React from 'react';
import { Salad, Store, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PeluangSection: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.12, y: 35 });

  const opportunities = [
    {
      icon: Salad,
      title: 'Kebutuhan harian',
      desc: 'Rumah tangga, warung makan, dan usaha kuliner membutuhkan pasokan sayuran secara rutin.'
    },
    {
      icon: Store,
      title: 'Pasar beragam',
      desc: 'Penjualan dapat dilakukan ke tetangga, pasar, warung, komunitas, dan kanal pemesanan online.'
    },
    {
      icon: TrendingUp,
      title: 'Bisa berkembang bertahap',
      desc: 'Mulai dari satu komoditas, lalu tambah pilihan produk ketika permintaan dan kemampuan meningkat.'
    }
  ];

  return (
    <section id="peluang" ref={containerRef} className="peluang-section premium-opportunity-section">
      <div className="container premium-section-shell">
        <div data-reveal className="section-header premium-section-header">
          <h2 className="section-title peluang-main-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-3">
            Kenapa jualan sayur punya peluang?
          </h2>
          <p className="section-desc peluang-main-subtitle text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sayuran dibutuhkan setiap hari dan dapat dipasarkan melalui lingkungan sekitar maupun kanal digital.
          </p>
        </div>

        <div className="opportunities-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {opportunities.map(({ icon: Icon, title, desc }) => (
            <div
              data-reveal
              className="opportunity-card premium-opportunity-card"
              key={title}
            >
              <div className="card-icon-badge premium-card-icon">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="card-title text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
              <p className="card-desc text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeluangSection;
