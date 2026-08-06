import React from 'react';

export const PeluangSection: React.FC = () => {
  const opportunities = [
    {
      icon: '🥗',
      title: 'Kebutuhan Harian Masyarakat',
      desc: 'Sayuran merupakan kebutuhan konsumsi pokok harian setiap rumah tangga. Budidaya mandiri menghemat biaya belanja sekaligus membuka peluang usaha penjualan sayur segar berkualitas.'
    },
    {
      icon: '📈',
      title: 'Pasar Luas & Sangat Fleksibel',
      desc: 'Hasil panen benih sayur mudah dipasarkan ke lingkungan sekitar, pasar tradisional, minimarket, bisnis kuliner, hingga jaringan hidroponik & pasar organik yang terus berkembang.'
    },
    {
      icon: '🌱',
      title: 'Modal Terjangkau & Resiko Rendah',
      desc: 'Cukup dimulai dari pekarangan atau lahan terbatas. Paket benih Botani Seed dapat diperoleh mulai dari Rp 20.000 dengan potensi hasil panen berlipat ganda.'
    }
  ];

  return (
    <section id="peluang" className="peluang-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">PELUANG USAHA PERTANIAN</span>
          <h2 className="section-title">
            Mengapa Bisnis & Budidaya Benih Sayuran <span className="text-gradient">Sangat Menjanjikan?</span>
          </h2>
          <p className="section-desc">
            Pertanian sayuran modern kini menjadi salah satu sektor paling tahan krisis dengan perputaran modal cepat dan pasar konsumsi harian yang tidak pernah surut.
          </p>
        </div>

        <div className="opportunities-grid">
          {opportunities.map((item, idx) => (
            <div className="opportunity-card" key={idx}>
              <div className="card-icon-wrap">{item.icon}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
