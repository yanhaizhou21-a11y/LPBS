import React from 'react';
import { AlertTriangle, ShoppingCart, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PromoBundleVisual } from './ProductArtwork';

interface PromoSectionProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onAddToCart, onOpenCheckout }) => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 35 });

  return (
    <section id="promo" ref={containerRef} className="promo-section py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* PROMO 5 PAKET */}
        <div data-reveal className="promo-5-wrapper grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* POSTER CARD */}
          <div className="promo-poster-col lg:col-span-5 w-full flex justify-center">
            <div
              className="promo-poster-card w-full max-w-sm bg-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border border-slate-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/10"
              onClick={onOpenCheckout}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCheckout()}
              role="button"
              tabIndex={0}
              aria-label="Buka formulir pemesanan promo 5 paket"
            >
              <PromoBundleVisual />
            </div>
          </div>

          {/* PROMO DETAILS */}
          <div className="promo-details-card lg:col-span-7 w-full flex flex-col">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 w-fit mb-3">
              <Sparkles size={14} aria-hidden="true" />
              PROMO PAKET BENIH SAYURAN
            </span>

            <h2 className="promo-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-2">
              Beli 5 Paket, Hemat 20%
            </h2>

            <p className="promo-subtitle text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
              Dapatkan 5 pcs Paket Benih Sayuran dengan harga promo khusus untuk mulai berkebun atau berbagi bersama keluarga.
            </p>

            {/* NOTICE BOX */}
            <div className="promo-notice-box flex items-start gap-3 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/80 border-l-4 border-l-orange-500 p-3.5 sm:p-4 rounded-2xl text-orange-950 dark:text-orange-200 text-xs sm:text-sm leading-relaxed mb-6">
              <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="font-extrabold">Amankan Harga Sekarang, Sebelum Harga Naik!</strong><br />Mulai 24 Agustus, Harga akan menjadi Rp35.000
              </span>
            </div>

            {/* PRICE COMPARISON BAR */}
            <div className="promo-price-bar grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div className="price-item normal bg-slate-50 dark:bg-slate-800/90 border-2 border-dashed border-slate-300 dark:border-slate-700 p-3.5 sm:p-4 rounded-2xl flex flex-col justify-center">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Harga Normal
                </span>
                <strong className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 line-through">
                  Rp100.000
                </strong>
              </div>
              <div
                className="price-item promo p-3.5 sm:p-4 rounded-2xl flex flex-col justify-center shadow-lg shadow-orange-500/25 border border-orange-400"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                }}
              >
                <span className="text-xs uppercase tracking-wider font-extrabold text-orange-100 mb-1" style={{ color: '#ffedd5' }}>
                  Harga Promo
                </span>
                <strong className="text-xl sm:text-2xl font-black text-white" style={{ color: '#ffffff' }}>
                  Rp80.000
                </strong>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-orange-400 p-4 mb-6 text-sm text-slate-700 dark:text-slate-300">
              <strong>Syarat dan ketentuan:</strong> Minimal pembelian 5 pcs Paket Benih Sayuran akan mendapatkan Diskon 20%
            </div>

            {/* BUTTONS */}
            <div className="promo-card-actions">
              <button
                className="promo-add-btn botani-cta-pulse w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                onClick={() => {
                  onAddToCart(5);
                  onOpenCheckout();
                }}
              >
                <ShoppingCart size={20} aria-hidden="true" /> MASUKKAN 5 PAKET KE KERANJANG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;

