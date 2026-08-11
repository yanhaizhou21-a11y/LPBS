import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      id: 1,
      question: 'Apa saja isi dari Paket Benih Sayur Botani Seed?',
      answer: 'Setiap paket berisi 10 jenis benih sayuran favorit harian unggulan seperti kangkung, bayam hijau, sawi manis, cabai rawit, tomat, timun, terong, buncis, daun bawang, dan seledri.',
    },
    {
      id: 2,
      question: 'Apakah benih sudah memiliki sertifikat resmi?',
      answer: 'Ya! Seluruh benih yang diproduksi oleh PT Botani Seed Indonesia bersertifikat resmi Balai Pengawasan dan Sertifikasi Benih (BPSB) dengan mutu terjamin & daya kecambah di atas 85%.',
    },
    {
      id: 3,
      question: 'Bagaimana cara melakukan pemesanan?',
      answer: 'Anda bisa mengklik tombol "Pesan Sekarang" atau "Tambahkan ke Keranjang" langsung di website ini, atau melakukan pemesanan praktis melalui admin WhatsApp kami.',
    },
    {
      id: 4,
      question: 'Apakah bisa dikirim ke seluruh wilayah Indonesia?',
      answer: 'Tentu saja. Kami bekerjasama dengan ekspedisi terpercaya (JNE, J&T, SiCepat, Pos Indonesia) untuk menjamin pesanan sampai dengan aman di seluruh pelosok Nusantara.',
    },
    {
      id: 5,
      question: 'Berapa lama waktu pengiriman paket?',
      answer: 'Pesanan yang masuk sebelum pukul 15.00 WIB dikirim pada hari yang sama. Estimasi tiba 1–3 hari untuk area Pulau Jawa dan 2–5 hari untuk wilayah luar Jawa.',
    },
    {
      id: 6,
      question: 'Apakah ada garansi jika paket rusak atau benih cacat?',
      answer: 'Kami menjamin kemasan rapi dan segel aman. Jika terdapat kendala kemasan rusak atau ketidaksesuaian jumlah saat diterima, kami akan menggantinya tanpa biaya tambahan.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-emerald-50/50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-emerald-100/60 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Pertanyaan yang sering ditanyakan
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Temukan jawaban atas pertanyaan umum seputar produk benih dan pemesanan Botani Seed.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-emerald-200/80 dark:border-slate-700 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg hover:bg-emerald-50/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 border-t border-emerald-100 dark:border-slate-700">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
