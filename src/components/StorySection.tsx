import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const StorySection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const stories = [
    {
      omzet: 'Hingga Rp60 juta/bln',
      author: 'DIYAH RAHMAWATI · PETANI MUDA & PENGUSAHA',
      title: 'Alumni SV IPB yang Sukses Jadi Petani Muda',
      desc: 'Diyah Rahmawati membuktikan bahwa usaha budidaya sayuran dapat memberikan omzet hingga puluhan juta rupiah per bulan. Kunci suksesnya adalah konsistensi, memilih benih unggul dengan daya tumbuh tinggi, serta pengelolaan jaringan pemasaran yang baik.',
      linkText: 'Lihat Liputan Berita',
      linkUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta'
    },
    {
      omzet: 'Hingga Rp100 juta/bln',
      author: 'DODIH · PETANI MITRA BUDIDAYA SAYURAN',
      title: 'Pasokan Sayur Segar Konsisten dengan Benih Unggul',
      desc: 'Pak Dodih mengelola budidaya sayuran segar untuk memasok kebutuhan pasar lokal dan usaha kuliner. Hasil panen yang seragam dan berkualitas tinggi membuat produknya selalu diminati pembeli.',
      linkText: 'Baca Artikel Inspirasi',
      linkUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta'
    }
  ];

  const steps = [
    {
      num: '1',
      title: 'Pilih benih',
      desc: 'Dapatkan paket benih sayuran unggul bersertifikat siap tanam.',
      img: ASSETS.company1
    },
    {
      num: '2',
      title: 'Semaikan',
      desc: 'Semaikan benih pada media tanam tanah atau hidroponik.',
      img: ASSETS.company2
    },
    {
      num: '3',
      title: 'Rawat',
      desc: 'Siram dan rawat secara rutin sesuai panduan budidaya.',
      img: ASSETS.company3
    },
    {
      num: '4',
      title: 'Panen',
      desc: 'Panen sayuran segar berkualitas tinggi dan nutrisi optimal.',
      img: ASSETS.productBanner
    },
    {
      num: '5',
      title: 'Pasarkan',
      desc: 'Jual ke tetangga, pasar, warung, atau nikmati sendiri.',
      img: ASSETS.company1
    }
  ];

  return (
    <section id="kisah" className="story-section">
      <div className="container">
        {/* STORY CARDS */}
        <motion.div
          className="section-header text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title story-main-title">
            Dua kisah nyata petani sayuran yang berkembang
          </h2>
          <p className="section-desc story-main-subtitle">
            Kisah Diyah Rahmawati dan Dodih yang memulai usaha budidaya sayuran unggul dari skala kecil.
          </p>
        </motion.div>

        <motion.div
          className="stories-grid-new"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {stories.map((story, idx) => (
            <motion.div
              className="story-card-new"
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 35 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <div className="story-omzet-badge">{story.omzet}</div>
              <span className="story-author-sub">{story.author}</span>
              <h3 className="story-card-title">{story.title}</h3>
              <p className="story-card-desc">{story.desc}</p>
              <a
                href={story.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="story-link-btn"
              >
                {story.linkText} <ExternalLink size={15} aria-hidden="true" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* STEPS SECTION */}
        <div className="steps-section-wrapper" id="cara-mulai">
          <motion.div
            className="section-header text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="section-title steps-main-title">
              Bagaimana cara memulainya?
            </h2>
            <p className="section-desc steps-main-subtitle">
              Langkah mudah dari persiapan hingga pemasaran panen Anda
            </p>
          </motion.div>

          <motion.div
            className="steps-grid-new"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {steps.map((step, idx) => (
              <motion.div
                className="step-card-new"
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <div className="step-badge-num">{step.num}</div>
                <div className="step-img-wrap">
                  <img src={step.img} alt={step.title} loading="lazy" />
                </div>
                <h4 className="step-card-title">{step.num}. {step.title}</h4>
                <p className="step-card-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
