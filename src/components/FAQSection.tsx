import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: 'Apa saja isian jenis benih dalam 1 paket?',
      a: 'Satu paket berisi 10 varietas benih sayuran populer pilihan seperti Kangkung, Bayam Hijau, Sawi Hijau (Caisim), Pakcoy, Terong Ungu, Cabai Rawit, Cabai Keriting, Tomat, Timun, dan Oyong/Gambas.'
    },
    {
      q: 'Berapa daya tumbuh dan ketahanan benih?',
      a: 'Benih Botani Seed bersertifikat resmi dengan tingkat daya berkecambah di atas 85%. Benih dikemas rapi dalam kemasan khusus terlindung dari kelembapan sehingga memiliki masa simpan yang panjang.'
    },
    {
      q: 'Bagaimana cara perhitungan ongkos kirim JNE?',
      a: 'Ongkir dihitung otomatis berdasarkan tarif resmi JNE dari Bogor ke kecamatan/kelurahan lokasi Anda. Perhitungan berat: 1–10 paket ditagihkan 1 kg, 11–20 paket ditagihkan 2 kg, dan seterusnya.'
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami mendukung pembayaran QRIS (mendukung seluruh e-wallet & mobile banking) serta transfer rekening bank resmi (Bank BSI, Bank BNI, dan Bank BRI) atas nama PT Botani Seed Indonesia.'
    },
    {
      q: 'Apakah pemula bisa menanam benih sayur ini?',
      a: 'Sangat bisa! Paket benih dirancang praktis dan cocok untuk pemula, baik budidaya tanah pekarangan maupun hidroponik. Dilengkapi petunjuk penyemaian dan perawatan mudah.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">PERTANYAAN UMUM</span>
          <h2 className="section-title">
            Pertanyaan yang Sering <span className="text-gradient">Diajukan (FAQ)</span>
          </h2>
          <p className="section-desc">
            Temukan jawaban lengkap seputar spesifikasi paket benih, sistem pengiriman, dan cara pembayaran.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
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
