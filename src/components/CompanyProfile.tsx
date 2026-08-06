import React from 'react';
import { ASSETS } from '../data/assets';

export const CompanyProfile: React.FC = () => {
  const highlights = [
    {
      title: 'Benih Bersertifikat',
      desc: 'Diproduksi sesuai standar sertifikasi resmi dengan tingkat kemurnian benih dan daya berkecambah di atas 85%.'
    },
    {
      title: 'Kualitas Terjamin',
      desc: 'Setiap lot benih melewati uji laboratorium intensif untuk menjamin ketahanan terhadap hama & penyakit utama.'
    },
    {
      title: '10 Jenis Benih Pilihan',
      desc: 'Paket praktis yang mengombinasikan 10 jenis sayuran paling populer dan bernilai konsumsi tinggi.'
    }
  ];

  const galleryImages = [
    {
      src: ASSETS.company1,
      caption: 'Display produk Botani Seed Indonesia'
    },
    {
      src: ASSETS.company2,
      caption: 'Gudang penyimpanan produk'
    },
    {
      src: ASSETS.company3,
      caption: 'Proses pengiriman pesanan'
    }
  ];

  return (
    <section id="profil" className="company-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">PROFIL PERUSAHAAN</span>
          <h2 className="section-title">
            PT. Botani Seed Indonesia — <span className="text-gradient">Produsen Benih Unggul</span>
          </h2>
          <p className="section-desc">
            PT Botani Seed Indonesia berkomitmen menghadirkan benih tanaman dan sayuran bermutu tinggi untuk mendukung ketahanan pangan serta kesejahteraan petani dan masyarakat Indonesia.
          </p>
        </div>

        <div className="company-grid">
          <div className="company-bio-card">
            <h3>Tentang PT Botani Seed Indonesia</h3>
            <p>
              Dengan pengalaman bertahun-tahun dalam pemuliaan dan riset benih, kami menyediakan lebih dari <strong>50+ jenis benih sayuran pilihan</strong> yang adaptif di berbagai wilayah Indonesia.
            </p>
            <p>
              Fokus utama kami adalah menghadirkan benih dengan mutu genetik dan fisik unggul, sehingga menghasilkan panen yang melimpah, seragam, dan berkualitas super.
            </p>

            <div className="company-motto-box">
              <span>Motto Perusahaan:</span>
              <strong>"Menanam Kebaikan, Memanen Kesejahteraan"</strong>
            </div>
          </div>

          <div className="company-highlights-wrap">
            {highlights.map((item, idx) => (
              <div className="highlight-item-card" key={idx}>
                <div className="highlight-icon">🌱</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="company-gallery-wrapper">
          <div className="gallery-header text-center">
            <h3>Dokumentasi Kegiatan PT Botani Seed Indonesia</h3>
            <p>Dokumentasi display produk, aktivitas gudang, dan proses pengiriman pesanan ke seluruh Indonesia.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div className="gallery-card" key={idx}>
                <img src={img.src} alt={img.caption} className="gallery-img" />
                <div className="gallery-caption">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
