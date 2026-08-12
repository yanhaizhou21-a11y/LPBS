import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

interface BottomCTASectionProps {
  onOpenCheckout: () => void;
}

export function BottomCTASection({ onOpenCheckout }: BottomCTASectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const waLink = "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20tertarik%20dengan%20Paket%20Benih%20Sayur%20IPB.%20Mohon%20info%20pemesanan.";

  return (
    <section className="w-full bg-[#164e27] dark:bg-[#0c2f17] text-white py-16 md:py-24 text-center border-t border-emerald-900/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <motion.div {...enter(0.05)}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
            SAATNYA MULAI
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md"
          {...enter(0.12)}
        >
          Jangan Cuma Lihat Kebun Tetangga
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed"
          {...enter(0.2)}
        >
          Mulai kebun sayuran Anda sendiri dengan satu paket berisi 10 jenis benih pilihan.
        </motion.p>

        <motion.div
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          {...enter(0.3)}
        >
          <button
            type="button"
            onClick={onOpenCheckout}
            className="botani-cta-pulse w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>TAMBAH KE KERANJANG</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="botani-cta-pulse w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base"
          >
            <MessageCircle className="w-5 h-5 text-emerald-300" />
            <span>KONSULTASI VIA WHATSAPP →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default BottomCTASection;
