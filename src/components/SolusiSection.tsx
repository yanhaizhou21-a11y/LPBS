import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Leaf, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface SolusiSectionProps {
  onOpenCheckout: () => void;
}

export function SolusiSection({ onOpenCheckout }: SolusiSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const points = [
    {
      title: 'Praktis untuk mulai',
      desc: 'Satu paket sudah berisi 10 jenis benih sayuran pilihan.',
      icon: Leaf,
    },
    {
      title: 'Cocok untuk pemula',
      desc: 'Pilihan sederhana untuk belajar berkebun dari rumah.',
      icon: ShieldCheck,
    },
    {
      title: 'Bisa ditanam di lahan terbatas',
      desc: 'Gunakan pekarangan, pot, atau polybag sesuai kebutuhan.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="solusi" className="w-full py-16 md:py-24 bg-[#faf6f0] dark:bg-slate-900/90 text-slate-900 dark:text-slate-50 border-t border-amber-100/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT POSTER IMAGE */}
          <motion.div className="lg:col-span-5 w-full flex justify-center" {...enter(0.1)}>
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-100 dark:border-slate-700">
              <img
                src="/images/solusi-pupuk.png"
                alt="Ternyata Bukan Cuma Soal Pupuk - Botani Seed"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
                width="600"
                height="750"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div className="lg:col-span-7 w-full text-left" {...enter(0.2)}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
              INI RAHASIANYA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-4">
              Ternyata, Bukan Cuma Soal Pupuk
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Pupuk dan penyiraman memang penting. Namun, benih menjadi fondasi awal pertumbuhan tanaman.
            </p>

            {/* ORANGE CALLOUT BOX */}
            <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/80 border-l-4 border-l-orange-500 p-4 sm:p-5 rounded-2xl text-orange-950 dark:text-orange-200 text-sm sm:text-base leading-relaxed mb-6">
              <p className="font-semibold">
                <strong className="font-extrabold text-orange-600 dark:text-orange-400">Mulai berkebun lebih praktis dengan Paket Benih Sayuran dari Botani Seed:</strong> satu paket pilihan untuk membantu Anda menyiapkan kebun sayuran di rumah.
              </p>
            </div>

            {/* FEATURE POINTS LIST */}
            <div className="space-y-4 mb-8">
              {points.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div key={pt.title} className="flex items-start gap-3.5 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-slate-100 font-bold text-base">
                        {pt.title}
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-0.5">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORANGE CTA BUTTON */}
            <button
              type="button"
              onClick={onOpenCheckout}
              className="botani-cta-pulse w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
            >
              <span>LIHAT ISI PAKET ↓</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SolusiSection;
