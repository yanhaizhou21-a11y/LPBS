import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, MapPin, CheckCircle2, Award, Quote, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProfileDetailInfo {
  omzet?: string;
  lokasi?: string;
  komoditas?: string;
  dayaKecambah?: string;
  quote?: string;
  fullBio?: string;
  tipsSukses?: string[];
}

export interface ExpandableProfileCardProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  details?: ProfileDetailInfo;
  content?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onSelect?: () => void;
}

export function ExpandableProfileCard({
  imageSrc = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
  title = "Diyah Rahmawati",
  subtitle = "Alumni SV IPB & Petani Muda",
  badge,
  details,
  content,
  className,
  isActive = false,
  onSelect,
}: ExpandableProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.();
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        onClick={handleCardClick}
        className={cn(
          "group relative h-84 sm:h-92 w-full cursor-pointer overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 dark:bg-zinc-900",
          isActive
            ? "border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10"
            : "border-zinc-200/90 dark:border-zinc-800/90 hover:border-emerald-300 dark:hover:border-emerald-800",
          className
        )}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md ring-1 ring-white/20">
              <Sparkles className="size-3.5 text-amber-300" />
              {badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 transition-transform duration-300">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-400 drop-shadow-xs">
            {subtitle}
          </p>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
            {title}
          </h3>

          {details?.lokasi && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
              <MapPin className="size-3 text-emerald-400 shrink-0" />
              <span className="truncate">{details.lokasi}</span>
            </p>
          )}

          <div className="mt-3.5 flex items-center justify-between border-t border-white/15 pt-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:text-emerald-200">
              <span>Buka Kisah Lengkap</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
            {details?.omzet && (
              <span className="rounded-lg bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs">
                {details.omzet}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* EXPANDED MODAL DIALOG */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 md:flex-row"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup modal"
                className="absolute top-4 right-4 z-30 flex size-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 text-zinc-700 shadow-lg backdrop-blur-md transition-all hover:bg-zinc-100 hover:text-zinc-950 hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>

              {/* IMAGE PANEL */}
              <div className="relative h-60 w-full shrink-0 overflow-hidden md:h-auto md:w-5/12">
                <img
                  src={imageSrc}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                {badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-bold text-white shadow-lg">
                      <Sparkles className="size-3.5 text-amber-300" />
                      {badge}
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT PANEL */}
              <div className="flex w-full flex-col overflow-y-auto p-6 sm:p-8 md:w-7/12">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                </div>

                {/* STATS HIGHLIGHT */}
                {details && (
                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-emerald-50/80 p-4 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                    {details.omzet && (
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                          <TrendingUp className="size-3.5" /> Capaian Hasil
                        </span>
                        <p className="mt-0.5 text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">
                          {details.omzet}
                        </p>
                      </div>
                    )}
                    {details.dayaKecambah && (
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                          <Award className="size-3.5" /> Daya Tumbuh
                        </span>
                        <p className="mt-0.5 text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">
                          {details.dayaKecambah}
                        </p>
                      </div>
                    )}
                    {details.komoditas && (
                      <div className="col-span-2 border-t border-emerald-200/60 dark:border-emerald-900/50 pt-2.5 mt-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400">
                          Varietas Benih Ditanam:
                        </span>
                        <p className="mt-0.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
                          {details.komoditas}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* QUOTE */}
                {details?.quote && (
                  <div className="mt-4 flex items-start gap-3 rounded-2xl border-l-4 border-emerald-500 bg-zinc-50 p-3.5 text-xs italic text-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300">
                    <Quote className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>"{details.quote}"</span>
                  </div>
                )}

                {/* DETAILED CONTENT */}
                <div className="mt-4 grow space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {content || (
                    <p>
                      {details?.fullBio ||
                        "Memulai budidaya sayuran dengan memilih benih bersertifikat dari PT Botani Seed Indonesia. Memanfaatkan ketahanan varietas unggul IPB untuk panen seragam dan berulang."}
                    </p>
                  )}

                  {details?.tipsSukses && details.tipsSukses.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                        Kunci & Rahasia Sukses Panen
                      </h4>
                      <ul className="space-y-2 pl-1">
                        {details.tipsSukses.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                            <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* MODAL FOOTER ACTION */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20tertarik%20dengan%20paket%20benih%20sayur%20seperti%20kisah%20mitra."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700 hover:shadow-md"
                  >
                    <span>💬 Konsultasi Tanam WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExpandableProfileCard;
