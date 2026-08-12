import React from 'react';
import { MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

interface CTAFooterProps {
  onOpenCheckout?: () => void;
}

export const CTAFooter: React.FC<CTAFooterProps> = ({ onOpenCheckout }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Halo Botani Seed, saya ingin tanya & pesan Paket Benih Sayur Botani.'
    );
    window.open(`https://wa.me/6281299450708?text=${message}`, '_blank');
  };

  return (
    <section className="w-full bg-[#164e27] dark:bg-[#0c2f17] text-white py-16 md:py-24 text-center border-t border-emerald-900/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          Mulai langkah pertamamu hari ini.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Dapatkan Benih Sayur Unggul Botani Seed Sekarang dan wujudkan potensi panen melimpah dari rumah Anda.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {onOpenCheckout && (
            <button
              type="button"
              onClick={onOpenCheckout}
              className="botani-cta-pulse w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-xl shadow-amber-900/40 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="botani-cta-pulse w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 text-base transition-all cursor-pointer border border-emerald-500/30"
          >
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <span>Tanya & Pesan via WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
