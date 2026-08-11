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
    <section id="peluang" ref={containerRef} className="peluang-section py-14 sm:py-20 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div data-reveal className="section-header text-center mb-10 sm:mb-14">
          <h2 className="section-title peluang-main-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-3">
            Kenapa jualan sayur punya peluang?
          </h2>
          <p className="section-desc peluang-main-subtitle text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sayuran dibutuhkan setiap hari dan dapat dipasarkan melalui lingkungan sekitar maupun kanal digital.
          </p>
        </div>

        <div className="opportunities-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {opportunities.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <div
              data-reveal
              className="opportunity-card bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700/60 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              key={title}
            >
              <div
                className="card-corner-shape absolute -top-6 -right-6 w-24 h-24 bg-orange-50 dark:bg-orange-950/20 rounded-full pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="card-icon-badge relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: iconBg, color: iconColor }}
              >
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
