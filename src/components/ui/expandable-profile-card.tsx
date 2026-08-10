import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExpandableProfileCardProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: React.ReactNode;
  className?: string;
}

export function ExpandableProfileCard({
  imageSrc = "https://images.unsplash.com/photo-1592417817098-8f3d6eb22657?auto=format&fit=crop&q=80&w=1000",
  title = "Diyah Rahmawati",
  subtitle = "Alumni SV IPB & Petani Muda",
  badge,
  content,
  className,
}: ExpandableProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-profile-card-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative h-72 w-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
      >
        <motion.img
          layoutId={`image-${layoutId}`}
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
              <Sparkles className="size-3" />
              {badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 transition-transform duration-300">
          <motion.p
            layoutId={`subtitle-${layoutId}`}
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 dark:text-emerald-300"
          >
            {subtitle}
          </motion.p>
          <motion.h3
            layoutId={`title-${layoutId}`}
            className="text-lg font-bold tracking-tight text-white sm:text-xl drop-shadow-sm"
          >
            {title}
          </motion.h3>
          <p className="mt-2 text-xs text-zinc-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Klik untuk membaca kisah lengkap →
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 md:flex-row"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                aria-label="Tutup"
                className="absolute top-4 right-4 z-30 flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 shadow-md backdrop-blur-md transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>

              <div className="relative h-60 w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
                <motion.img
                  layoutId={`image-${layoutId}`}
                  src={imageSrc}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </div>

              <div className="flex w-full flex-col overflow-y-auto p-6 sm:p-8 md:w-1/2">
                <motion.p
                  layoutId={`subtitle-${layoutId}`}
                  className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
                >
                  {subtitle}
                </motion.p>
                <motion.h3
                  layoutId={`title-${layoutId}`}
                  className="mb-4 border-b border-zinc-100 pb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:border-zinc-800 dark:text-zinc-50 sm:text-3xl"
                >
                  {title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 }}
                  className="grow space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                >
                  {content || (
                    <div className="space-y-4">
                      <p>
                        Memulai budidaya sayuran dengan benih bersertifikat dari PT Botani Seed Indonesia. Memanfaatkan ketahanan varietas unggul IPB untuk panen berulang dengan kualitas pasar swalayan dan restoran.
                      </p>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-950/40 dark:bg-emerald-950/20">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                          Kunci Keberhasilan
                        </h4>
                        <p className="mt-1 text-xs text-emerald-900 dark:text-emerald-300">
                          Memilih benih dengan daya kecambah di atas 85%, nutrisi terukur, dan disiplin penyiraman harian.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Tutup & Lanjut Eksplorasi
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
