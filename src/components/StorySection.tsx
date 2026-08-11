import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Award } from 'lucide-react';
import { ExpandableProfileCard, type ProfileDetailInfo } from './ui/expandable-profile-card';

interface StoryProfile {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageSrc: string;
  details: ProfileDetailInfo;
}

export const StorySection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const profileStories: StoryProfile[] = [
    {
      id: 'diyah',
      title: 'Diyah Rahmawati',
      subtitle: 'Alumni SV IPB · Petani Muda & Pengusaha',
      badge: 'Omzet Rp60 Juta/Bln',
      imageSrc: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22657?auto=format&fit=crop&q=80&w=1000',
      details: {
        omzet: 'Rp60.000.000 / Bulan',
        lokasi: 'Dramaga, Bogor, Jawa Barat',
        komoditas: 'Pakcoy, Selada Keriting, Bayam Hijau, Kangkung',
        dayaKecambah: '>90% Teruji Laboratorium',
        quote: 'Kunci utama omzet puluhan juta berulang adalah tidak berkompromi pada kualitas benih. Sekali tanam, daya kecambah tinggi memastikan panen serentak dan hemat biaya bibit.',
        fullBio: 'Diyah Rahmawati memulai usaha hortikultura sayuran hidroponik dan semi-organik saat menyelesaikan studi di Sekolah Vokasi IPB University. Berbekal benih bersertifikat Botani Seed, ia kini rutin menyuplai 3 ritase per minggu ke jejaring pasar swalayan dan restoran sehat.',
        tipsSukses: [
          'Gunakan benih bersertifikat resmi dengan daya berkecambah >85% agar tidak ada polybag kosong.',
          'Patuhi jadwal nutrisi dan penyiraman pagi/sore hari secara konsisten.',
          'Bangun relasi dengan pemilik restoran dan warung sayur lokal untuk kepastian pasar.',
        ],
      },
    },
    {
      id: 'dodih',
      title: 'Pak Dodih',
      subtitle: 'Petani Mitra Budidaya Sayuran',
      badge: 'Omzet Rp100 Juta/Bln',
      imageSrc: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000',
      details: {
        omzet: 'Hingga Rp100.000.000 / Bulan',
        lokasi: 'Cianjur & Sukabumi, Jawa Barat',
        komoditas: 'Cabai Rawit Prima, Terong Ungu, Tomat Ceri, Buncis',
        dayaKecambah: 'Vigor Kuat & Seragam',
        quote: 'Pasar induk dan grosir sangat menuntut bentuk buah yang seragam dan tahan simpan. Benih Botani Seed terbukti menghasilkan cabai dan sayur buah berbobot padat.',
        fullBio: 'Mengelola lahan pertanian komersial seluas 2 hektar bersama kelompok tani binaan. Menggunakan varietas benih sayur buah unggul dari IPB University yang tahan terhadap penyakit layu bakteri dan antraknosa.',
        tipsSukses: [
          'Pengolahan tanah yang matang dengan pupuk kompos dasar sebelum pindah tanam.',
          'Pemilihan benih tahan iklim tropis ekstrim (tahan hujan dan panas terik).',
        ],
      },
    },
  ];

  const steps = [
    {
      num: '1',
      title: 'Pilih Benih Bersertifikat',
      desc: 'Dapatkan paket 10 varietas benih sayuran unggul siap tanam bersertifikat resmi IPB University.',
      img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80',
    },
    {
      num: '2',
      title: 'Semaikan Sesuai SOP',
      desc: 'Semaikan benih pada media tanah gembur atau rockwool hidroponik selama 7-10 hari hingga berkecambah seragam.',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22657?w=800&auto=format&fit=crop&q=80',
    },
    {
      num: '3',
      title: 'Pindah Tanam & Rawat',
      desc: 'Pindahkan bibit ke polybag atau bedengan, siram pagi-sore dan berikan nutrisi organik secara teratur.',
      img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    },
    {
      num: '4',
      title: 'Panen Sayur Segar',
      desc: 'Panen sayuran segar mulai hari ke-21 hingga 30 dengan daun hijau tebal, renyah, dan bernutrisi tinggi.',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    },
    {
      num: '5',
      title: 'Konsumsi & Pasarkan',
      desc: 'Nikmati sayuran sehat untuk keluarga atau pasarkan ke tetangga, warung makan, dan pasar lokal.',
      img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="kisah" className="story-section py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header text-center max-w-3xl mx-auto mb-12"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 shadow-xs">
            <Sparkles className="size-3.5" />
            <span>INSPIRASI NYATA & TOKOH BUDIDAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Kisah Sukses Mitra & Riset Benih Botani Seed
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
            Pilih atau klik kartu profil di bawah untuk membaca rahasia panen melimpah, omzet bisnis, dan tips langsung dari para petani & pakar IPB University.
          </p>
        </motion.div>

        {/* 2 EXPANDABLE CARDS GRID */}
        <div className="mb-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {profileStories.map((story) => (
              <ExpandableProfileCard
                key={story.id}
                title={story.title}
                subtitle={story.subtitle}
                badge={story.badge}
                imageSrc={story.imageSrc}
                details={story.details}
              />
            ))}
          </div>
        </div>

        {/* 5-STEP BUDIDAYA GUIDE */}
        <div className="steps-section-wrapper pt-12 border-t border-zinc-200/80 dark:border-zinc-800" id="cara-mulai">
          <motion.div
            className="section-header text-center max-w-2xl mx-auto mb-10"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 px-3.5 py-1 text-xs font-bold text-amber-900 dark:text-amber-300 mb-2 shadow-xs">
              <Award className="size-3.5" />
              <span>PANDUAN PRAKTIS 5 LANGKAH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Bagaimana Cara Memulainya?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Alur mudah mulai dari memilih benih bersertifikasi hingga menikmati panen segar Anda sendiri
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
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
                <div className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                  {step.num}
                </div>
                <div className="mb-3 h-36 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {step.num}. {step.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
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
