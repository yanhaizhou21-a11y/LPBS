import React from 'react';
import { AlertTriangle, ShoppingCart, Sparkles, Zap } from 'lucide-react';
import { PromoBundleVisual } from './ProductArtwork';

interface BundlePromoProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: (qty: number) => void;
}

export const BundlePromo: React.FC<BundlePromoProps> = ({ onAddToCart, onOpenCheckout }) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* POSTER CARD */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div
              className="w-full max-w-md bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              onClick={() => onOpenCheckout(5)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCheckout(5)}
              aria-label="Pesan paket promo 5"
            >
              <PromoBundleVisual />
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-7 w-full text-left space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 w-fit">
              <Sparkles className="w-4 h-4" />
              PROMO PAKET BENIH SAYURAN
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
              Beli 5 Paket, Hemat 20%
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Dapatkan 5 pcs Paket Benih Sayuran dengan harga promo khusus untuk mulai berkebun atau berbagi bersama keluarga.
            </p>

            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 border-l-4 border-l-amber-500 p-4 rounded-2xl text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="font-extrabold">BELI SEKARANG, SEBELUM HARGA NAIK!</strong><br />Mulai 24 Agustus 2026, harga akan menjadi Rp35.000/pcs.
              </span>
            </div>

            <div className="rounded-2xl border border-dashed border-amber-400 p-4 text-sm text-slate-700 dark:text-slate-300">
              <strong>Syarat dan ketentuan:</strong> Minimal pembelian 5 pcs Paket Benih Sayuran akan mendapatkan Diskon 20%.
            </div>

            {/* PRICE BAR */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col justify-center">
                <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Harga Normal
                </span>
                <strong className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 line-through">
                  Rp100.000
                </strong>
              </div>
              <div className="bg-amber-500 text-white p-4 rounded-2xl flex flex-col justify-center shadow-lg shadow-amber-500/25">
                <span className="text-xs uppercase font-extrabold text-amber-100 mb-1">
                  Harga Promo
                </span>
                <strong className="text-xl sm:text-2xl font-black text-white">
                  Rp80.000
                </strong>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                className="botani-cta-pulse w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                onClick={() => onOpenCheckout(5)}
              >
                <ShoppingCart className="w-5 h-5" /> Dapatkan Promonya via WhatsApp
              </button>
              <button
                type="button"
                className="botani-cta-pulse w-full py-3.5 px-6 rounded-2xl font-extrabold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border-2 border-emerald-700 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800 active:scale-[0.98] flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                onClick={() => onAddToCart(5)}
              >
                <Zap className="w-5 h-5" /> Tambah 5 Paket ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundlePromo;
