import React, { useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';

interface ProductMainProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: (qty: number) => void;
}

export const ProductMain: React.FC<ProductMainProps> = ({ onAddToCart, onOpenCheckout }) => {
  const [qty, setQty] = useState(1);

  return (
    <section className="py-16 md:py-24 bg-amber-50/50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-50 border-b border-amber-100/60 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* IMAGE CARD */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-amber-500/10">
                <img
                  src="/images/step1-paket.jpg"
                  alt="Paket Benih Sayur Botani Seed"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-7 w-full text-left space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 w-fit">
              PESAN LANGSUNG
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
              Paket Benih Sayur Botani Seed
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Tambahkan produk ke keranjang, isi data penerima, pilih metode pengiriman, lalu lanjutkan ke tahap pembayaran.
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">
                Rp 20.000/pcs
              </span>
            </div>


            {/* QTY & ACTION BUTTONS */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Jumlah:</span>
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-2 font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-slate-900 dark:text-slate-100">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3.5 py-2 font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  className="botani-cta-pulse w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                  onClick={() => {
                    onAddToCart(qty);
                    onOpenCheckout(qty);
                  }}
                >
                  <ShoppingCart className="w-5 h-5" /> Tambahkan ke Keranjang
                </button>
                <button
                  type="button"
                  className="botani-cta-pulse w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                  onClick={() => onOpenCheckout(qty)}
                >
                  <Zap className="w-5 h-5" /> Pesan Sekarang
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pembelian minimal 5 pcs sebelum 24 Agustus 2026 memperoleh diskon 20%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
