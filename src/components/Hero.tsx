import React from 'react';
import { Sparkles } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface HeroProps {
  onOpenCheckout?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const scrollToStory = () => {
    document.getElementById('kisah-sukses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-50/60 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-12 md:py-20 overflow-hidden border-b border-emerald-100/50 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>PELUANG USAHA SAYURAN DARI RUMAH</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]">
              Hanya dari jualan sayuran bisa menghasilkan{' '}
              <span className="text-amber-600 dark:text-amber-400">2 digit?</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              Dua kisah nyata menunjukkan bahwa usaha sayuran dapat berkembang ketika dijalankan konsisten, memahami pasokan, dan memanfaatkan saluran penjualan yang tepat.
            </p>

            <button
              type="button"
              onClick={scrollToStory}
              className="botani-cta-pulse px-6 py-3.5 rounded-2xl font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-lg shadow-amber-600/25 text-base transition-all cursor-pointer"
            >
              Simak Kisahnya ↓
            </button>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              *Penghasilan bukan jaminan hasil. Omzet berbeda dengan laba dan dipengaruhi skala usaha, biaya, pasokan, lokasi, serta pemasaran.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden p-3.5 sm:p-5 hover:scale-[1.01] transition-all">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-900">
                <img
                  src={ASSETS.productBanner}
                  alt="Poster Hanya dari jualan sayuran bisa menghasilkan 2 digit"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
