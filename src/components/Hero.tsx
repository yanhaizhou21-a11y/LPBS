import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface HeroProps {
  onOpenCheckout?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  const scrollToStory = () => {
    const storyEl = document.getElementById('kisah-sukses');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-50/60 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-12 md:py-20 overflow-hidden border-b border-emerald-100/50 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>PELUANG USAHA PERTANIAN INDONESIA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]">
              Hanya dari jualan sayuran bisa menghasilkan{' '}
              <span className="text-amber-600 dark:text-amber-400 underline underline-offset-4 decoration-amber-500/40">
                2 digit?
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              Jelajahi potensi bisnis pertanian lokal dari rumah. Mulai dari benih unggul bersertifikat IPB hingga pendampingan panen melimpah.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={scrollToStory}
                className="px-6 py-3.5 rounded-2xl font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-lg shadow-amber-600/25 flex items-center gap-2 text-base transition-all cursor-pointer"
              >
                <span>Klik Kisahnya</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {onOpenCheckout && (
                <button
                  type="button"
                  onClick={onOpenCheckout}
                  className="px-6 py-3.5 rounded-2xl font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-300/60 dark:border-emerald-800 transition-all cursor-pointer text-base"
                >
                  Pesan Benih Sekarang
                </button>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                100% Benih Unggul IPB
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Sertifikat Resmi BPSB
              </span>
            </div>
          </div>

          {/* Right Column: Promo Poster Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden p-3.5 sm:p-5 hover:scale-[1.01] transition-all">
              {/* Discount Badge */}
              <div className="absolute top-5 right-5 z-10 bg-amber-500 text-white px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md uppercase tracking-wider animate-pulse">
                Diskon 20%
              </div>

              {/* Poster Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-900 mb-4">
                <img
                  src={ASSETS.productBanner}
                  alt="Poster Promo Jualan Sayuran Bisa Menghasilkan 2 Digit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Botani Seed Official
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight drop-shadow-md text-white">
                    Jualan Sayuran Bisa Menghasilkan 2 Digit
                  </h3>
                </div>
              </div>

              <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
                PT Botani Seed Indonesia • Anak Perusahaan PT BLST IPB University
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
