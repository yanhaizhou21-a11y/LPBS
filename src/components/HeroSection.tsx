import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag, MessageCircle, ShieldCheck, Award, Truck, Sprout } from 'lucide-react';
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
    <section className="premium-hero" id="top">
      <div className="container">
        <div className="premium-hero-grid">
          {/* TEXT & CTA CONTENT */}
          <div className="premium-hero-copy">
            {/* EYEBROW BADGE */}
            <motion.div {...enter(0.05)}>
              <span className="premium-eyebrow">
                {isV2 ? <Sparkles className="size-3.5 text-amber-500" /> : <Sprout className="size-3.5 text-emerald-600" />}
                <span>{isV2 ? 'SOLUSI PANEN MAKSIMAL · IPB UNIVERSITY' : 'PELUANG USAHA SAYURAN RUMAHAN'}</span>
              </span>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.h1
              {...enter(0.12)}
              className="premium-hero-title"
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
              className="premium-hero-lead"
            >
              {isV2
                ? 'Kuncinya ada pada kemurnian benih unggul tropis dan panduan nutrisi seimbang. Dapatkan paket 10 varietas benih sayuran bersertifikat IPB untuk panen melimpah dari rumah.'
                : 'Kisah nyata alumni & mitra IPB membuktikan usaha sayur daun dan buah dapat berkembang konsisten. Dipandu modul SOP tanam praktis dengan garansi daya kecambah >85%.'}
            </motion.p>

            {/* ACTION BUTTONS */}
            <motion.div {...enter(0.3)} className="premium-hero-actions">
              {isV2 ? (
                <>
                  <button type="button" onClick={onOpenCheckout} className="premium-button premium-button-primary">
                    <ShoppingBag size={18} />
                    <span>Pesan Paket — Diskon 20%</span>
                    <ArrowRight size={18} />
                  </button>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button premium-button-secondary"
                  >
                    <MessageCircle className="size-4.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Chat WhatsApp</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onOpenCheckout}
                    className="premium-button premium-button-primary"
                  >
                    <ShoppingBag size={18} />
                    <span>Pesan Paket 10 Benih</span>
                    <ArrowRight size={18} />
                  </button>
                  <a href="#kisah" className="premium-button premium-button-secondary">
                    <span>Lihat Kisah Mitra</span>
                  </a>
                </>
              )}
            </motion.div>

            {/* TRUST BADGES & VALUE METRICS */}
            <motion.div
              {...enter(0.4)}
              className="premium-hero-trust"
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

            <motion.p {...enter(0.45)} className="premium-hero-note">
              {isV2
                ? '*Pengiriman kilat aman langsung dari gudang resmi IPB Dramaga Bogor.'
                : '*Hasil panen dan omzet dipengaruhi luas lahan, ketekunan perawatan, dan manajemen pasar.'}
            </motion.p>
          </div>

          {/* HERO VISUAL POSTER CARD */}
          <motion.div {...enter(0.25)} className="premium-hero-visual">
            <div
              onClick={onOpenCheckout}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenCheckout(); }}
              aria-label="Pesan paket benih sayur unggul"
              className="premium-product-showcase"
            >
              <div className="premium-product-image">
                <img
                  src={isV2 ? '/images/hero2-poster.png' : ASSETS.productBanner}
                  alt={isV2 ? 'Paket Benih Sayuran Subur - Botani Seed IPB' : 'Paket Benih Sayur Unggul IPB'}
                  loading="eager"
                  className="h-auto w-full object-cover"
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

              <div className="premium-product-meta">
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Paket 10 Varietas Lengkap</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Free Modul SOP &amp; Nutrisi Semai</p>
                </div>
                <span className="premium-product-link">
                  Pesan <ArrowRight size={14} />
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
