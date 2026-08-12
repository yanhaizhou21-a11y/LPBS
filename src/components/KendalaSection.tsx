import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TrendingDown } from 'lucide-react';

// 1. Benih Sulit Tumbuh: Pot & media tanam dengan benih yang tidak kunjung berkecambah
const SeedStuckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 21h10l1.5-6H5.5L7 21z" fill="currentColor" fillOpacity="0.12" />
    <path d="M4.5 15h15" />
    <path d="M7.5 15c2-1 4-1 6 0" />
    <circle cx="10" cy="18" r="1.5" fill="currentColor" />
    <path d="M12 11V7" />
    <path d="M12 7c0-2 1.5-3.5 3.5-3.5" />
    <path d="M17.5 3.5l3 3m0-3l-3 3" className="stroke-amber-600 dark:stroke-amber-400" />
  </svg>
);

// 2. Tanaman Mudah Layu: Daun tanaman terkulai layu dengan simbol gelombang kekeringan/panas
const PlantWiltingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 21v-7c0-3.5-2.5-5.5-6.5-5" />
    <path d="M5.5 9C3.5 9.5 2 12.5 3.5 15.5c2.5 1 5.5-.5 5.5-3.5c0-1.5-1.5-3-3.5-3z" fill="currentColor" fillOpacity="0.12" />
    <path d="M12 14c3.5 0 6.5 1.5 6 4.5-2 .5-4.5-.5-5-2.5" />
    <path d="M16 4c.5 1.5-.5 2.5-1 3.5" className="stroke-orange-500" />
    <path d="M19 6c.5 1.5-.5 2.5-1 3.5" className="stroke-orange-500" />
  </svg>
);

export function KendalaSection() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const kendalaList = [
    {
      icon: SeedStuckIcon,
      title: 'Benih Sulit Tumbuh',
      desc: 'Sudah ditanam beberapa hari, tetapi belum terlihat tanda-tanda pertumbuhan.',
      badgeStyle: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
    },
    {
      icon: PlantWiltingIcon,
      title: 'Tanaman Mudah Layu',
      desc: 'Tanaman terlihat kurang sehat meskipun sudah disiram secara rutin.',
      badgeStyle: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300',
    },
    {
      icon: TrendingDown,
      title: 'Hasil Panen Sedikit',
      desc: 'Waktu dan tenaga sudah dikeluarkan, tetapi hasilnya belum sesuai harapan.',
      badgeStyle: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
    },
  ];

  return (
    <section id="kendala" className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* EYEBROW & TITLE */}
        <motion.div className="max-w-3xl mx-auto mb-12" {...enter(0.05)}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
            MASALAH YANG SERING TERJADI
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
                  <div className={`w-14 h-14 rounded-2xl ${item.badgeStyle} flex items-center justify-center mb-5 shrink-0 shadow-sm`}>
                    <Icon className="w-7 h-7" />
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
