import React from 'react';
import { MotionAccordion, type MotionAccordionItem } from './ui/motion-faqs-accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const FAQ: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  const faqItems: MotionAccordionItem[] = [
    {
      question: 'Apa saja isi dari Paket Benih Sayur Botani Seed?',
      answer: 'Setiap paket berisi 10 jenis benih sayuran favorit harian unggulan seperti kangkung, bayam hijau, sawi manis, cabai rawit, tomat, timun, terong, buncis, daun bawang, dan seledri.',
    },
    {
      question: 'Apakah benih sudah memiliki sertifikat resmi?',
      answer: 'Ya! Seluruh benih yang diproduksi oleh PT Botani Seed Indonesia bersertifikat resmi Balai Pengawasan dan Sertifikasi Benih (BPSB) dengan mutu terjamin & daya kecambah di atas 85%.',
    },
    {
      question: 'Bagaimana cara melakukan pemesanan?',
      answer: 'Anda bisa mengklik tombol "Pesan Sekarang" atau "Tambahkan ke Keranjang" langsung di website ini, atau melakukan pemesanan praktis melalui admin WhatsApp kami.',
    },
    {
      question: 'Apakah bisa dikirim ke seluruh wilayah Indonesia?',
      answer: 'Tentu saja. Kami bekerjasama dengan ekspedisi terpercaya (JNE, J&T, SiCepat, Pos Indonesia) untuk menjamin pesanan sampai dengan aman di seluruh pelosok Nusantara.',
    },
    {
      question: 'Berapa lama waktu pengiriman paket?',
      answer: 'Pesanan yang masuk sebelum pukul 15.00 WIB dikirim pada hari yang sama. Estimasi tiba 1–3 hari untuk area Pulau Jawa dan 2–5 hari untuk wilayah luar Jawa.',
    },
    {
      question: 'Apakah ada garansi jika paket rusak atau benih cacat?',
      answer: 'Kami menjamin kemasan rapi dan segel aman. Jika terdapat kendala kemasan rusak atau ketidaksesuaian jumlah saat diterima, kami akan menggantinya tanpa biaya tambahan.',
    },
  ];

  return (
    <section id="faq" ref={containerRef} className="py-16 md:py-24 bg-emerald-50/50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-emerald-100/60 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Temukan jawaban atas pertanyaan umum seputar produk benih dan pemesanan Botani Seed.
          </p>
        </div>

        <div data-reveal className="mt-10 text-left">
          <MotionAccordion items={faqItems} gap={10} className="faq-accordion" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
