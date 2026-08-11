import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle, Ban, TrendingDown } from 'lucide-react';

export function KendalaSection() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const kendalaList = [
    {
      icon: Ban,
      title: 'Benih Sulit Tumbuh',
      desc: 'Sudah ditanam beberapa hari, tetapi belum terlihat tanda-tanda pertumbuhan.',
    },
    {
      icon: AlertCircle,
      title: 'Tanaman Mudah Layu',
      desc: 'Tanaman terlihat kurang sehat meskipun sudah disiram secara rutin.',
    },
    {
      icon: TrendingDown,
      title: 'Hasil Panen Sedikit',
      desc: 'Hasilnya tidak banyak meskipun sudah dirawat dan diberi pupuk.',
    },
  ];

  return (
    <section id="kendala" className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* EYEBROW & TITLE */}
        <motion.div className="max-w-3xl mx-auto mb-12" {...enter(0.05)}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
            MASALAH YANG SERING DIHADAPI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            Sudah Dirawat, Tapi Tanamannya Masih Begitu-Begitu Saja?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Menanam sayuran di rumah terlihat sederhana, tetapi hasilnya sering tidak sesuai harapan.
          </p>
        </motion.div>

        {/* 3 EQUAL HEIGHT ICON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
          {kendalaList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                {...enter(0.12 + idx * 0.08)}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center mb-5 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default KendalaSection;
