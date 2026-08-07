import React from 'react';
import { ExternalLink } from 'lucide-react';

export const StorySection: React.FC = () => {
  const stories = [
    {
      name: 'Diyah Rahmawati',
      role: 'Petani Muda & Pengusaha Sayuran Segar',
      location: 'Bogor, Jawa Barat',
      quote: '"Memilih benih yang tepat dengan daya tumbuh tinggi adalah kunci utama keberhasilan panen. Benih dari Botani Seed terbukti menghasilkan tanaman yang subur dan tahan penyakit."',
      sourceText: 'Lihat Liputan Berita Diyah Rahmawati di Radar Bogor',
      sourceUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta'
    },
    {
      name: 'Dodih',
      role: 'Petani Mitra Budidaya Sayuran',
      location: 'Jawa Barat',
      quote: '"Panen sayuran yang seragam dan segar membuat hasil pertanian kami selalu dicari oleh tengkulak maupun konsumen langsung. Kualitas benih menentukan keuntungan petani."',
      sourceText: 'Baca Artikel Inspirasi Pertanian Dodih',
      sourceUrl: 'https://radarbogor.jawapos.com/bogor/2473489240/diyah-rahmawati-alumni-sv-ipb-sukses-jadi-petani-muda-omzetnya-capai-puluhan-juta'
    }
  ];

  const steps = [
    {
      num: '1',
      title: 'Pesan Paket Benih',
      desc: 'Pilih paket benih sayuran unggul Botani Seed sesuai kebutuhan Anda.'
    },
    {
      num: '2',
      title: 'Semaikan & Tanam',
      desc: 'Semaikan benih pada media tanam tanah atau sistem hidroponik modern.'
    },
    {
      num: '3',
      title: 'Perawatan Praktis',
      desc: 'Lakukan penyiraman dan pemeliharaan rutin dengan petunjuk budidaya.'
    },
    {
      num: '4',
      title: 'Panen Segar',
      desc: 'Nikmati hasil panen sayur berkualitas tinggi dengan warna & rasa optimal.'
    },
    {
      num: '5',
      title: 'Pasarkan & Untung',
      desc: 'Jual hasil panen ke tetangga, pasar, atau nikmati sendiri untuk hemat konsumsi.'
    }
  ];

  return (
    <section id="kisah" className="story-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">KISAH INSPIRATIF PETANI</span>
          <h2 className="section-title">
            Inspirasi & Bukti Sukses <span className="text-gradient">Budidaya Benih Sayur</span>
          </h2>
          <p className="section-desc">
            Simak testimoni dan rekam jejak para petani muda Indonesia yang membuktikan potensi usaha budidaya sayuran unggul.
          </p>
        </div>

        <div className="stories-grid">
          {stories.map((story, idx) => (
            <div className="story-card" key={idx}>
              <div className="story-quote-icon">“</div>
              <p className="story-quote-text">{story.quote}</p>
              <div className="story-author-info">
                <strong className="author-name">{story.name}</strong>
                <span className="author-role">{story.role} — {story.location}</span>
              </div>
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="story-source-link"
              >
                {story.sourceText} <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        <div className="steps-wrapper">
          <div className="steps-header text-center">
            <h3>5 Langkah Mudah Memulai Budidaya Benih Sayuran</h3>
          </div>
          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div className="step-card" key={idx}>
                <div className="step-number">{step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
