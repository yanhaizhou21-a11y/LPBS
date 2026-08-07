import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const CompanyProfile: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const highlights = [
    {
      icon: Award,
      title: 'Benih Unggul Bersertifikat',
      desc: 'Diproduksi dan diseleksi langsung oleh tim peneliti pakar benih IPB University.'
    },
    {
      icon: CheckCircle2,
      title: 'Daya Kecambah >85%',
      desc: 'Tingkat keberhasilan berkecambah & tumbuh tinggi pada tanah maupun sistem hidroponik.'
    },
    {
      icon: Truck,
      title: 'Pengiriman Aman & Cepat',
      desc: 'Tarif JNE resmi otomatis dihitung dari Bogor dan dikirim dengan proteksi maksimal.'
    }
  ];

  const gallery = [
    { title: 'Pengemasan Rapi & Aman', img: ASSETS.company1 },
    { title: 'Gudang Benih Bersih', img: ASSETS.company2 },
    { title: 'Pengiriman Rutin JNE', img: ASSETS.company3 },
    { title: 'Mitra Petani Sayur', img: ASSETS.company1 },
    { title: 'Pameran & Edukasi Pertanian', img: ASSETS.company2 },
    { title: 'Pengiriman Ke Seluruh Indonesia', img: ASSETS.company3 }
  ];

  return (
    <section id="profil" className="company-section">
      <div className="container">
        {/* WHY CHOOSE SECTION (Section 8) */}
        <div className="why-choose-wrapper">
          <motion.div
            className="section-header text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="section-title why-main-title">
              Kenapa harus memilih Paket Benih Sayur Botani Seed?
            </h2>
            <p className="section-desc why-main-desc">
              PT Botani Seed Indonesia merupakan badan usaha milik IPB University yang bergerak di bidang perbenihan. Kami berkomitmen menyediakan benih tanaman dan sayuran unggul berkualitas tinggi yang mudah ditanam oleh siapa saja.
            </p>
          </motion.div>

          <motion.div
            className="why-cards-grid"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            {highlights.map(({ icon: Icon, title, desc }) => (
              <motion.div
                className="why-card"
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <div className="why-icon-badge">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="why-card-title">{title}</h3>
                <p className="why-card-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* TRUST GALLERY SECTION (Section 9) */}
        <div className="trust-gallery-wrapper">
          <motion.div
            className="section-header text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="section-title gallery-main-title">
              Dipercaya oleh Ribuan Petani & Pekebun
            </h2>
            <p className="section-desc gallery-main-desc">
              Dokumentasi kegiatan pengemasan, pengiriman, dan mitra budidaya benih Botani Seed.
            </p>
          </motion.div>

          <motion.div
            className="trust-gallery-grid"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {gallery.map((item, idx) => (
              <motion.div
                className="gallery-card-item"
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.94, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <div className="gallery-img-wrap">
                  <img src={item.img} alt={item.title} loading="lazy" />
                </div>
                <span className="gallery-caption">{item.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
