import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

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
    'Cabai Rawit Tegak',
    'Sawi Hijau',
    'Kangkung',
    'Kacang Panjang',
    'Tomat',
    'Bayam Hijau',
    'Jagung Manis',
    'Cabai Keriting',
    'Mentimun',
    'Oyong',
  ];

  return (
    <section id="paket" className="w-full bg-[#0d2340] dark:bg-[#071322] text-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* SECTION TITLE */}
        <motion.div className="max-w-3xl mx-auto mb-12" {...enter(0.05)}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            ISI PAKET
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Apa Saja yang Ada di Dalam Paket?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Satu paket berisi 10 jenis benih sayuran favorit untuk mulai berkebun dari rumah.
          </p>
        </motion.div>

        {/* 5x2 GRID (DESKTOP) / 2-COL (MOBILE) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 mb-12 text-left">
          {vegItems.map((item, idx) => (
            <motion.div
              key={item}
              className="bg-white text-slate-900 rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-100 flex flex-col hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              {...enter(0.1 + idx * 0.04)}
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-50 to-lime-100 border border-emerald-100 flex items-center justify-center px-2 text-center">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-800">Foto {item}</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight mt-3 px-1 pb-1">
                {item}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM PRICE & CTA CARD */}
        <motion.div
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          {...enter(0.45)}
        >
          <div className="text-left">
            <span className="block text-xs uppercase font-bold text-slate-300 tracking-wider">
              Harga satu paket
            </span>
            <strong className="text-2xl sm:text-3xl font-black text-amber-400">
              Rp20.000
            </strong>
          </div>
          <button
            type="button"
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Beli Paket Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default PaketIsiSection;
