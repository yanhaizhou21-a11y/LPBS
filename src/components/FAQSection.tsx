import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  onOpenCheckout?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenCheckout }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  const faqs = [
    {
      q: 'Apa saja isi paket benih sayur ini?',
      a: 'Dalam 1 paket benih sayur Botani Seed, Anda mendapatkan 10 jenis varietas sayur pilihan (seperti bayam, kangkung, sawi, terong, cabai, tomat, timun, dll) yang sudah dikemas higienis bersertifikat IPB.'
    },
    {
      q: 'Apakah ada garansi daya tumbuh benih?',
      a: 'Benih Botani Seed telah melewati uji mutu laboratorium perbenihan IPB University dengan daya kecambah terjamin di atas 85% jika disemaikan sesuai panduan.'
    },
    {
      q: 'Bagaimana cara melakukan pemesanan?',
      a: 'Cukup klik tombol "Beli sekarang", isi data penerima & alamat pengiriman, pilih tarif JNE otomatis, lalu lakukan pembayaran via QRIS atau Transfer Bank. Tanpa perlu mendaftar akun!'
    },
    {
      q: 'Berapa lama pengiriman lokasi saya?',
      a: 'Pengiriman dilakukan dari gudang Bogor via JNE. Untuk Jabodetabek estimasi 1–2 hari kerja, Pulau Jawa 2–3 hari kerja, dan luar Jawa 3–5 hari kerja.'
    },
    {
      q: 'Apakah harus membuat akun untuk beli?',
      a: 'Tidak perlu. Anda bisa melakukan pemesanan langsung sebagai tamu (guest checkout) untuk kemudahan dan kecepatan transaksi.'
    },
    {
      q: 'Apakah menerima pemesanan jumlah besar?',
      a: 'Ya, kami melayani pemesanan grosir, program bantuan pertanian, reseller, serta kebutuhan pengadaan instansi.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* FAQ ACCORDION SECTION (Section 10) */}
        <div className="faq-wrapper">
          <motion.div
            className="section-header text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="section-title faq-main-title">
              Pertanyaan yang sering ditanyakan
            </h2>
          </motion.div>

          <motion.div
            className="faq-accordion-list"
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
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  className={`faq-item-row ${isOpen ? 'active' : ''}`}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`faq-arrow-icon ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="final-cta-section"
        initial={reduceMotion ? false : { opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container text-center">
          <h2 className="cta-banner-title">Mulai langkah pertamamu hari ini.</h2>
          <p className="cta-banner-subtitle">
            Tanyakan isi paket, stok, promo, dan cara pemesanannya langsung kepada admin resmi Botani Seed.
          </p>
          <a
            href="https://wa.me/6281299450708?text=Halo%20Admin%20Botani%20Seed%2C%20saya%20ingin%20tanya%20dan%20pesan%20paket%20benih."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-wa-btn"
          >
            <span>💬</span> Tanya & Pesan via WhatsApp
          </a>
          <p className="cta-banner-note">
            Anda dapat berkonsultasi terlebih dahulu tanpa harus langsung membeli.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
