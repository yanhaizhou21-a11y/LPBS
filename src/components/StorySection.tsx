import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ExternalLink, Sparkles, Award } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ExpandableProfileCard } from './ui/expandable-profile-card';
import { CarouselNavigator, DEFAULT_BOTANI_THEMES } from './ui/carousel-navigator';

export const StorySection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoDelay = 5000;

  const profileStories = [
    {
      title: 'Diyah Rahmawati',
      subtitle: 'Alumni SV IPB · Petani Muda & Pengusaha',
      badge: 'Omzet Rp60 Juta/Bln',
      imageSrc: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22657?auto=format&fit=crop&q=80&w=1000',
      newsUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta',
      content: (
        <div className="space-y-4">
          <p>
            Diyah Rahmawati membuktikan bahwa usaha budidaya sayuran dapat memberikan omzet hingga puluhan juta rupiah per bulan dari lahan pekarangan dan kebun terpadu.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950/50 dark:bg-emerald-950/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Kunci Sukses Budidaya
            </h4>
            <p className="mt-1 text-xs text-emerald-900 dark:text-emerald-300">
              Memilih benih sayur unggul bersertifikasi dengan daya kecambah &gt;85%, nutrisi organik tepat dosis, serta kemitraan pemasaran rutin ke resto dan swalayan.
            </p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            *Liputan Radar Bogor & Media Nasional IPB University
          </p>
        </div>
      ),
    },
    {
      title: 'Pak Dodih',
      subtitle: 'Petani Mitra Budidaya Sayuran',
      badge: 'Omzet Rp100 Juta/Bln',
      imageSrc: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000',
      newsUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta',
      content: (
        <div className="space-y-4">
          <p>
            Pak Dodih mengelola budidaya sayuran segar untuk memasok kebutuhan pasar lokal, rumah makan, dan supermarket mitra binaan di wilayah Jabodetabek.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950/50 dark:bg-emerald-950/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Konsistensi Pasokan
            </h4>
            <p className="mt-1 text-xs text-emerald-900 dark:text-emerald-300">
              Vigor benih Botani Seed yang seragam mempercepat masa panen hingga 25-30 hari untuk sayur daun, memastikan rotasi tanam tanpa jeda.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Tim Pemulia Pakar IPB',
      subtitle: 'Divisi Riset & Perbenihan Hortikultura',
      badge: 'Daya Kecambah >85%',
      imageSrc: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1000',
      content: (
        <div className="space-y-4">
          <p>
            Benih PT Botani Seed Indonesia dikembangkan dan diuji langsung oleh tim pemulia tanaman IPB University yang berpengalaman puluhan tahun dalam genetika benih tropis.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950/50 dark:bg-emerald-950/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Standar Sertifikasi Resmi
            </h4>
            <p className="mt-1 text-xs text-emerald-900 dark:text-emerald-300">
              Kemurnian fisik &gt;98%, kadar air terkontrol, dan tahan terhadap serangan penyakit layu bakteri serta jamur tanah.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Siti Maryam',
      subtitle: 'Praktisi Urban Farming & Hidroponik',
      badge: 'Panen Mandiri Rumah',
      imageSrc: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
      content: (
        <div className="space-y-4">
          <p>
            Memanfaatkan balkon dan pekarangan rumah seluas 12m² dengan sistem hidroponik NFT dan polybag untuk memasok sayuran sehat bagi keluarga dan tetangga sekitar.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950/50 dark:bg-emerald-950/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Hemat & Menguntungkan
            </h4>
            <p className="mt-1 text-xs text-emerald-900 dark:text-emerald-300">
              Menghemat belanja sayur hingga Rp1,5 juta/bulan sekaligus menghasilkan pendapatan tambahan dari penjualan sayur pakcoy dan selada segar.
            </p>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % profileStories.length);
    }, autoDelay);
    return () => clearInterval(timer);
  }, [currentSlide, profileStories.length]);

  const steps = [
    {
      num: '1',
      title: 'Pilih benih',
      desc: 'Dapatkan paket benih sayuran unggul bersertifikat siap tanam.',
      img: ASSETS.company1,
    },
    {
      num: '2',
      title: 'Semaikan',
      desc: 'Semaikan benih pada media tanam tanah atau hidroponik.',
      img: ASSETS.company2,
    },
    {
      num: '3',
      title: 'Rawat',
      desc: 'Siram dan rawat secara rutin sesuai panduan budidaya.',
      img: ASSETS.company3,
    },
    {
      num: '4',
      title: 'Panen',
      desc: 'Panen sayuran segar berkualitas tinggi dan nutrisi optimal.',
      img: ASSETS.productBanner,
    },
    {
      num: '5',
      title: 'Pasarkan',
      desc: 'Jual ke tetangga, pasar, warung, atau nikmati sendiri.',
      img: ASSETS.company1,
    },
  ];

  return (
    <section id="kisah" className="story-section py-16 sm:py-24">
      <div className="container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header text-center max-w-3xl mx-auto mb-12"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
            <Sparkles className="size-3.5" />
            <span>INSPIRASI & KISAH NYATA PETANI</span>
          </div>
          <h2 className="section-title text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-50">
            Kisah Sukses & Profil Mitra Budidaya Sayuran
          </h2>
          <p className="section-desc mt-3 text-base text-zinc-600 dark:text-zinc-300">
            Buktikan sendiri bagaimana benih bersertifikat IPB University membantu petani muda, penghobi rumahan, dan mitra komersial menghasilkan panen berkualitas beromzet puluhan juta rupiah.
          </p>
        </motion.div>

        {/* INTERACTIVE EXPANDABLE CARDS SLIDER CAROUSEL */}
        <div className="mb-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profileStories.map((story, idx) => {
              const isCurrent = idx === currentSlide;

              return (
                <div
                  key={story.title}
                  className={`transition-all duration-300 ${
                    isCurrent
                      ? 'scale-[1.02] ring-2 ring-emerald-500 rounded-2xl shadow-lg'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentSlide(idx)}
                >
                  <ExpandableProfileCard
                    title={story.title}
                    subtitle={story.subtitle}
                    badge={story.badge}
                    imageSrc={story.imageSrc}
                    content={story.content}
                  />
                </div>
              );
            })}
          </div>

          {/* CAROUSEL CONTROLLER */}
          <div className="mt-8 flex justify-center">
            <CarouselNavigator
              totalSlides={profileStories.length}
              autoDelay={autoDelay}
              themes={DEFAULT_BOTANI_THEMES}
              currentIndex={currentSlide}
              onIndexChange={setCurrentSlide}
            />
          </div>
        </div>

        {/* STEPS SECTION */}
        <div className="steps-section-wrapper pt-8 border-t border-zinc-200/80 dark:border-zinc-800" id="cara-mulai">
          <motion.div
            className="section-header text-center max-w-2xl mx-auto mb-10"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300 mb-2">
              <Award className="size-3.5" />
              <span>PANDUAN PRAKTIS 5 LANGKAH</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-50">
              Bagaimana Cara Memulainya?
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Langkah mudah dari persiapan benih hingga menikmati dan memasarkan panen segar Anda
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {steps.map((step, idx) => (
              <motion.div
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <div className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {step.num}
                </div>
                <div className="mb-3 h-32 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {step.num}. {step.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
