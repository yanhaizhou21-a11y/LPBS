import React from 'react';
import { Utensils, Store, TrendingUp } from 'lucide-react';

export const WhyOpportunity: React.FC = () => {
  const opportunities = [
    {
      id: 'kebutuhan-harian',
      icon: Utensils,
      title: 'Kebutuhan harian',
      description: 'Rumah tangga, warung makan, dan usaha kuliner membutuhkan pasokan sayuran secara rutin.',
    },
    {
      id: 'pasar-beragam',
      icon: Store,
      title: 'Pasar beragam',
      description: 'Penjualan dapat dilakukan ke tetangga, pasar, warung, komunitas, dan kanal pemesanan online.',
    },
    {
      id: 'berkembang-bertahap',
      icon: TrendingUp,
      title: 'Bisa berkembang bertahap',
      description: 'Mulai dari skala komoditas, lalu tambah pilihan produk ketika permintaan dan kemampuan meningkat.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Kenapa jualan sayur punya peluang?
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Sayuran dibutuhkan setiap hari dan dapat dipasarkan melalui lingkungan sekitar maupun kanal digital.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
          {opportunities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyOpportunity;
