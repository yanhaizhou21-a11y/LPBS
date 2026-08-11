import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ShoppingBag, MessageCircle, ShieldCheck, Award, Truck, Sprout } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface HeroSectionProps {
  onAddToCart?: (qty: number) => void;
  onOpenCheckout: () => void;
  variant?: 1 | 2;
}

export function HeroSection({ onOpenCheckout, variant = 1 }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const isV2 = variant === 2;

  const waLink = "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20tertarik%20dengan%20Paket%20Benih%20Sayur%20IPB%20University.%20Mohon%20info%20pemesanan.";

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-emerald-950/25 dark:via-zinc-950 dark:to-zinc-950 py-10 sm:py-16 md:py-20 lg:py-24" id="top">
      {/* BACKGROUND ACCENT GLOW (SUBTLE & AUTHENTIC, NO AI SLOP DOTS) */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* TEXT & CTA CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* EYEBROW BADGE */}
            <motion.div {...enter(0.05)} className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-100/90 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 shadow-xs dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                {isV2 ? <Sparkles className="size-3.5 text-amber-500" /> : <Sprout className="size-3.5 text-emerald-600" />}
                <span>{isV2 ? 'SOLUSI PANEN MAKSIMAL · IPB UNIVERSITY' : 'PELUANG USAHA SAYURAN RUMAHAN'}</span>
              </span>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.h1
              {...enter(0.12)}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl/tight font-black tracking-tight text-zinc-900 dark:text-zinc-50 break-words max-w-2xl"
            >
              {isV2 ? (
                <>
                  Kenapa Sayuran Kebun Tetangga Bisa{' '}
                  <span className="text-emerald-700 dark:text-emerald-400">
                    Jauh Lebih Subur?
                  </span>
                </>
              ) : (
                <>
                  Dari Budidaya Sayuran Rumahan, Bisa Hasilkan Omzet{' '}
                  <span className="text-emerald-700 dark:text-emerald-400">
                    2 Digit/Bulan?
                  </span>
                </>
              )}
            </motion.h1>

            {/* LEAD DESCRIPTION */}
            <motion.p
              {...enter(0.2)}
              className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-xl"
            >
              {isV2
                ? 'Kuncinya ada pada kemurnian benih unggul tropis dan panduan nutrisi seimbang. Dapatkan paket 10 varietas benih sayuran bersertifikat IPB untuk panen melimpah dari rumah.'
                : 'Kisah nyata alumni & mitra IPB membuktikan usaha sayur daun dan buah dapat berkembang konsisten. Dipandu modul SOP tanam praktis dengan garansi daya kecambah >85%.'}
            </motion.p>

            {/* ACTION BUTTONS */}
            <motion.div {...enter(0.3)} className="mt-6 sm:mt-8 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
              {isV2 ? (
                <>
                  <button type="button" onClick={onOpenCheckout} className="btn-hero-cta">
                    <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">Pesan Sekarang (Diskon 20%)</span>
                    <span className="circle" />
                    <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </button>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 sm:px-6 text-sm font-bold text-zinc-800 shadow-xs transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <MessageCircle className="size-4.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Chat WhatsApp</span>
                  </a>
                </>
              ) : (
                <>
                  <a href="#kisah" className="btn-hero-cta">
                    <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">Simak Kisah Sukses Mitra</span>
                    <span className="circle" />
                    <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    onClick={onOpenCheckout}
                    className="inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 sm:px-6 text-sm font-bold text-emerald-800 shadow-xs transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-950"
                  >
                    <ShoppingBag className="size-4.5" />
                    <span>Pesan Paket 10 Benih</span>
                  </button>
                </>
              )}
            </motion.div>

            {/* TRUST BADGES & VALUE METRICS */}
            <motion.div
              {...enter(0.4)}
              className="mt-6 sm:mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Daya Tumbuh &gt;85%</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <Award className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Riset Resmi IPB</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <Truck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>COD Seluruh Indonesia</span>
              </div>
            </motion.div>

            <motion.p {...enter(0.45)} className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500 italic">
              {isV2
                ? '*Pengiriman kilat aman langsung dari gudang resmi IPB Dramaga Bogor.'
                : '*Hasil panen dan omzet dipengaruhi luas lahan, ketekunan perawatan, dan manajemen pasar.'}
            </motion.p>
          </div>

          {/* HERO VISUAL POSTER CARD */}
          <motion.div {...enter(0.25)} className="lg:col-span-5 flex justify-center w-full">
            <div
              onClick={onOpenCheckout}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenCheckout(); }}
              aria-label="Pesan paket benih sayur unggul"
              className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-3 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={isV2 ? '/images/hero2-poster.png' : ASSETS.productBanner}
                  alt={isV2 ? 'Paket Benih Sayuran Subur - Botani Seed IPB' : 'Paket Benih Sayur Unggul IPB'}
                  loading="eager"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  width="600"
                  height="720"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-white shadow-md">
                    <Sparkles className="size-3 text-amber-300" />
                    <span>BEST SELLER 10 BENIH</span>
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Paket 10 Varietas Lengkap</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Free Modul SOP &amp; Nutrisi Semai</p>
                </div>
                <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-xs group-hover:bg-emerald-700">
                  Pesan →
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
