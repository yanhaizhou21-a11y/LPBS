import React, { useState } from 'react';
import { Lightbulb, MessageCircle, Minus, PartyPopper, Plus, ShoppingBag } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface QuickOrderSectionProps {
  onSetQtyDirectly: (qty: number) => void;
  onOpenCheckout: () => void;
}

export const QuickOrderSection: React.FC<QuickOrderSectionProps> = ({
  onSetQtyDirectly,
  onOpenCheckout
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(5);
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  const unitPrice = 20000;
  const isPromo = selectedQty >= 5;
  const normalTotal = selectedQty * unitPrice;
  const discountAmount = isPromo ? Math.round(normalTotal * 0.2) : 0;
  const subtotal = normalTotal - discountAmount;

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1) return;
    setSelectedQty(newQty);
  };

  const handleCheckoutClick = () => {
    onSetQtyDirectly(selectedQty);
    onOpenCheckout();
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Botani Seed, saya ingin memesan ${selectedQty} Paket Benih Sayur Unggul. Total: Rp ${subtotal.toLocaleString('id-ID')}.`
  );

  return (
    <section id="pesan-sekarang" ref={containerRef} className="quick-order-section py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="quick-order-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT PRODUCT DISPLAY CARD */}
          <div data-reveal className="quick-product-card lg:col-span-5 w-full max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/10">
            <div className="product-card-top-panel bg-gradient-to-br from-orange-500 to-orange-600 p-6 md:p-8 text-center flex flex-col items-center justify-center">
              <img
                src={ASSETS.productBanner}
                alt="Paket Benih Sayur Botani Seed"
                className="quick-product-img w-full max-w-[280px] h-auto rounded-2xl shadow-xl object-cover"
                loading="lazy"
              />
            </div>
            <div className="product-card-bottom-bar bg-emerald-950 text-white py-4 px-6 text-center flex flex-col items-center justify-center gap-1 border-t border-emerald-900">
              <strong className="text-white text-sm md:text-base font-extrabold tracking-wider">
                PAKET BENIH SAYUR BOTANI SEED
              </strong>
              <span className="text-emerald-300 text-xs font-semibold tracking-wide">
                1 PAKET = 10 BENIH SAYURAN
              </span>
            </div>
          </div>

          {/* RIGHT ORDER CALCULATOR FORM */}
          <div data-reveal className="quick-order-form-panel lg:col-span-7 w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-100">
            <span className="card-tag inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-100 text-orange-700 font-extrabold text-xs tracking-wider uppercase rounded-full border border-orange-200 mb-3">
              PEMESANAN LANGSUNG
            </span>

            <h2 className="quick-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
              Paket Benih Sayur Botani Seed
            </h2>

            <p className="quick-subtitle text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Pilih jumlah paket yang ingin Anda pesan. Dapatkan diskon 20% otomatis untuk pemesanan 5 paket atau lebih.
            </p>

            {/* QTY COUNTER */}
            <div className="qty-picker-box flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
              <span className="qty-picker-label font-bold text-slate-700 text-sm sm:text-base">
                Jumlah Pesanan:
              </span>
              <div className="qty-counter-row flex items-center gap-2">
                <button
                  type="button"
                  className="qty-btn w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold text-xl flex items-center justify-center hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
                  onClick={() => handleQtyChange(selectedQty - 1)}
                  disabled={selectedQty <= 1}
                  aria-label="Kurangi 1 paket"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={selectedQty}
                  onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
                  className="qty-input w-14 sm:w-16 h-10 sm:h-11 text-center font-extrabold text-lg text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  aria-label="Jumlah pesanan paket"
                />
                <button
                  type="button"
                  className="qty-btn w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold text-xl flex items-center justify-center hover:bg-slate-100 active:scale-95 shadow-sm transition-all"
                  onClick={() => handleQtyChange(selectedQty + 1)}
                  aria-label="Tambah 1 paket"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* PROMO STATUS BADGE */}
            {isPromo ? (
              <div className="promo-status-msg success flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium mb-5" role="status">
                <PartyPopper size={20} className="text-emerald-600 flex-shrink-0" />
                <span>
                  Selamat! Anda berhak mendapatkan <strong className="font-extrabold text-emerald-900">Diskon 20%</strong> (Hemat Rp {discountAmount.toLocaleString('id-ID')}).
                </span>
              </div>
            ) : (
              <div className="promo-status-msg info flex items-center gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium mb-5" role="status">
                <Lightbulb size={20} className="text-amber-600 flex-shrink-0" />
                <span>
                  Tambah <strong className="font-extrabold text-amber-900">{5 - selectedQty} paket lagi</strong> untuk klaim <strong className="font-extrabold">Diskon 20%</strong>.
                </span>
              </div>
            )}

            {/* SUBTOTAL CARD */}
            <div className="subtotal-display-card flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-4 sm:p-5 rounded-2xl mb-6 gap-2">
              <span className="subtotal-label font-bold text-orange-950 text-sm sm:text-base">
                Total Harga Produk:
              </span>
              <div className="subtotal-price-group flex items-baseline gap-2.5">
                <strong className="subtotal-amount text-2xl sm:text-3xl font-black text-orange-600">
                  Rp {subtotal.toLocaleString('id-ID')}
                </strong>
                {isPromo && (
                  <small className="normal-strike text-xs sm:text-sm font-semibold text-slate-400 line-through">
                    Rp {normalTotal.toLocaleString('id-ID')}
                  </small>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="quick-action-buttons grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                className="btn-buy-now-green w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 text-base transition-all"
                onClick={handleCheckoutClick}
              >
                <ShoppingBag size={20} /> Beli Sekarang
              </button>
              <a
                href={`https://wa.me/6281299450708?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-order-wa-orange w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 text-base transition-all"
              >
                <MessageCircle size={20} /> Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickOrderSection;
