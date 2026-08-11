import React from 'react';
import { HelpCircle, MessageCircle, ShoppingBag } from 'lucide-react';
import { MotionAccordion, type MotionAccordionItem } from './ui/motion-faqs-accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FAQSectionProps {
  onOpenCheckout?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenCheckout }) => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  const faqItems: MotionAccordionItem[] = [
    {
      question: 'Apa saja varietas benih yang didapatkan dalam 1 paket?',
      answer: (
        <span>
          Dalam 1 paket benih sayur <strong>PT Botani Seed Indonesia</strong>, Anda mendapatkan <strong>10 varietas unggul pilihan</strong> (kombinasi sayur daun & buah seperti bayam hijau, kangkung super, sawi caisim manis, pakcoy hidropinik, terong ungu, cabai rawit prima, tomat ceri, mentimun renyah, selada keriting, dan buncis tegak) yang dikemas higienis dengan panduan penanaman lengkap.
        </span>
      ),
    },
    {
      question: 'Apakah ada garansi daya tumbuh dan sertifikasi benih?',
      answer: (
        <span>
          <strong>Ya, bergaransi resmi.</strong> Seluruh benih telah melewati uji viabilitas dan vigor di laboratorium pemuliaan tanaman <strong>IPB University</strong> dengan jaminan daya berkecambah di atas <strong>85%</strong> dan tingkat kemurnian fisik mencapai <strong>&gt;98%</strong>.
        </span>
      ),
    },
    {
      question: 'Bagaimana cara melakukan pemesanan dan apakah bisa COD?',
      answer: (
        <span>
          Pemesanan sangat mudah! Cukup klik tombol <strong>"Pesan Sekarang"</strong>, lengkapi data penerima dan alamat tujuan (terintegrasi otomatis dengan tarif ongkir JNE ke seluruh kecamatan di Indonesia), lalu pilih metode pembayaran via <strong>QRIS otomatis</strong>, <strong>Transfer Virtual Account</strong>, atau <strong>Bayar di Tempat (COD)</strong> tanpa perlu membuat akun terlebih dahulu.
        </span>
      ),
    },
    {
      question: 'Berapa lama masa simpan (kadaluarsa) benih?',
      answer: (
        <span>
          Kemasan aluminium foil kedap udara menjaga kualitas benih tetap prima hingga <strong>12–18 bulan</strong> sejak tanggal produksi jika disimpan di tempat kering dan terhindar dari sinar matahari langsung.
        </span>
      ),
    },
    {
      question: 'Apakah pemula yang belum pernah berkebun bisa berhasil menanam?',
      answer: (
        <span>
          <strong>Sangat bisa!</strong> Setiap paket disertai modul SOP budidaya praktis berbahasa Indonesia yang memandu Anda mulai dari persiapan wadah/polybag, perendaman benih, peracikan media tanam/nutrisi, hingga jadwal penyiraman dan panen sayuran segar.
        </span>
      ),
    },
    {
      question: 'Apakah melayani pemesanan grosir untuk kemitraan atau instansi?',
      answer: (
        <span>
          Ya, kami melayani kemitraan pasokan benih skala besar untuk kelompok tani, program CSR/ketahanan pangan pemerintah, distributor daerah, maupun pengadaan kebun komersial dengan harga khusus B2B.
        </span>
      ),
    },
  ];

  return (
    <section id="faq" ref={containerRef} className="faq-section py-16 sm:py-24">
      <div className="container faq-container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* HEADER */}
        <div data-reveal className="section-header premium-section-header premium-faq-header">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 shadow-xs">
            <HelpCircle className="size-3.5" />
            <span>TANYA JAWAB SEPUTAR BENIH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Semua yang perlu Anda ketahui tentang kualitas benih bersertifikat IPB, panduan penanaman, dan kemudahan pengiriman.
          </p>
        </div>

        {/* MOTION ACCORDION COMPONENT */}
        <div data-reveal>
          <MotionAccordion items={faqItems} gap={10} className="faq-accordion" />
        </div>

        {/* BOTTOM QUICK ACTIONS BANNER */}
        <div
          data-reveal
          className="faq-contact-card premium-faq-cta"
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Masih butuh bantuan memilih paket?
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Tim Botani Seed siap membantu memilih varietas dan menjelaskan proses pemesanan melalui WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {onOpenCheckout && (
              <button
                type="button"
                onClick={onOpenCheckout}
                className="premium-button premium-button-light"
              >
                <ShoppingBag className="size-4" />
                <span>Pesan Paket Sekarang</span>
              </button>
            )}
            <a
              href="https://wa.me/6281299450708?text=Halo%20Admin%20Botani%20Seed%2C%20saya%20ingin%20konsultasi%20paket%20benih%20sayuran"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button premium-button-ghost-light"
            >
              <MessageCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Konsultasi WhatsApp Gratis</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
