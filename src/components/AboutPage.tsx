import React from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Globe2,
  Layers,
  Leaf,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react';
import { ASSETS } from '../data/assets';

interface AboutPageProps {
  onGoHome: () => void;
  onOpenCheckout: () => void;
}

export function AboutPage({ onGoHome, onOpenCheckout }: AboutPageProps) {
  const waLink =
    'https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20ingin%20konsultasi%20mengenai%20produk%20dan%20profil%20perusahaan.';

  const stats = [
    { value: '2016', label: 'Tahun Berdiri', sub: 'Bagian dari PT BLST IPB' },
    { value: '50+', label: 'Jenis Produk Benih', sub: 'Sayuran daun, buah & sarana tani' },
    { value: '34', label: 'Provinsi Jangkauan', sub: 'Pengiriman kilat seluruh Indonesia' },
    { value: '>85%', label: 'Standar Daya Kecambah', sub: 'Teruji resmi laboratorium IPB' },
  ];

  const pillars = [
    {
      icon: <Award className="size-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Riset Pemuliaan IPB University',
      desc: 'Formulasi dan seleksi varietas benih dilakukan langsung oleh akademisi dan peneliti pakar IPB University untuk daya adaptasi maksimal di iklim tropis.',
    },
    {
      icon: <ShieldCheck className="size-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Sertifikasi Mutu & Kemurnian',
      desc: 'Setiap batch benih melalui uji daya kecambah (germination test) ketat dengan kemurnian genetik tinggi sehingga panen serentak dan tahan penyakit.',
    },
    {
      icon: <PackageCheck className="size-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Kemasan Kedap Udara Standar Industri',
      desc: 'Dilengkapi segel aluminium foil kedap udara untuk menjaga kelembapan optimal, viabilitas benih, dan masa simpan yang lebih panjang.',
    },
    {
      icon: <BookOpen className="size-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Modul SOP Budidaya Praktis',
      desc: 'Setiap pemesanan disertai panduan langkah demi langkah mulai semai, pindah tanam, nutrisi, hingga panen yang mudah dipahami pemula.',
    },
  ];

  const productCategories = [
    {
      title: 'Benih Sayuran Daun Unggul',
      items: ['Pakcoy F1 Nauli', 'Bayam Hijau Maestro', 'Kangkung Super Mahar', 'Selada Keriting Grand Rapids', 'Caisim Shinta'],
      badge: 'Favorit Pekebun Rumah',
    },
    {
      title: 'Benih Sayuran Buah Tropis',
      items: ['Cabai Rawit Prima IPB', 'Tomat Ceri IPB', 'Terong Ungu Mustang', 'Mentimun Hercules', 'Kacang Panjang Parade'],
      badge: 'Potensi Omzet Tinggi',
    },
    {
      title: 'Sarana Produksi & Nutrisi Pertanian',
      items: ['Pupuk Organik Hayati', 'Nutrisi AB Mix Hidroponik', 'Media Tanam Steril & Rockwool', 'Polybag & Trays Semai'],
      badge: 'Solusi Tanam Lengkap',
    },
  ];

  const milestones = [
    {
      year: '2016',
      title: 'Pendirian PT Botani Seed Indonesia',
      desc: 'Didirikan sebagai unit bisnis perbenihan di bawah naungan PT Bogor Life Science and Technology (PT BLST), Holding Company resmi IPB University.',
    },
    {
      year: '2018',
      title: 'Pelepasan Varietas Benih Riset IPB',
      desc: 'Memasarkan secara komersial varietas benih sayuran hasil riset pemuliaan tanaman Fakultas Pertanian IPB University ke petani lokal.',
    },
    {
      year: '2021',
      title: 'Ekspansi Digital & Distribusi Nasional',
      desc: 'Mengembangkan sistem katalog digital dan integrasi logistik pengiriman ke seluruh pelosok nusantara bagi pehobi dan petani komersial.',
    },
    {
      year: '2024 - Sekarang',
      title: 'Lebih dari 50 Produk & Program Edukasi Sayur',
      desc: 'Memasarkan lebih dari 50 varietas benih dan sarana agribisnis serta membina ribuan pehobi kebun dan mitra tani sayur di Indonesia.',
    },
  ];

  return (
    <main className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="container">
          <button type="button" className="about-back-btn" onClick={onGoHome}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="about-hero-content">
            <span className="about-eyebrow">
              <Sprout className="size-3.5" aria-hidden="true" />
              <span>PROFIL PERUSAHAAN · TENTANG KAMI</span>
            </span>

            <h1 className="about-hero-title">
              PT Botani Seed Indonesia
            </h1>

            <p className="about-hero-subtitle">
              Inovasi Perbenihan & Agribisnis Berkelanjutan dari IPB University Sejak 2016 untuk Mendukung Kemandirian Pangan Nasional.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN OVERVIEW SECTION */}
      <section className="about-overview-section">
        <div className="container">
          <div className="about-overview-grid">
            <div className="about-overview-text">
              <span className="about-section-tag">SEJARAH & KOMITMEN</span>
              <h2>Mitra Terpercaya Perbenihan dan Agribisnis Indonesia</h2>

              <p className="about-lead-paragraph">
                <strong>PT Botani Seed Indonesia</strong> merupakan perusahaan agribisnis yang berdiri sejak tahun 2016 dan menjadi bagian dari <strong>PT Bogor Life Science and Technology (PT BLST)</strong>, Holding Company of IPB University.
              </p>

              <p>
                Kami bergerak dalam produksi dan pemasaran benih, bibit, pupuk, pestisida, serta berbagai sarana produksi pertanian berbasis inovasi dari <strong>IPB University</strong>, lembaga penelitian, dan mitra produsen terpercaya. Hingga saat ini, Botani Seed telah mengembangkan dan memasarkan lebih dari <strong>50 jenis produk benih dan produk agribisnis</strong> untuk memenuhi kebutuhan petani, pelaku usaha, serta masyarakat yang ingin mulai berkebun.
              </p>

              <p>
                Dengan pengalaman produksi dan pemasaran di berbagai wilayah Indonesia, kami berkomitmen menyediakan produk yang bermutu, terpercaya, dan sesuai kebutuhan.
              </p>

              <div className="about-holding-badge">
                <Building2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <strong>Bagian dari PT BLST — Holding Company of IPB University</strong>
                  <span>Menjembatani inovasi sains dan riset pertanian unggul langsung ke tangan masyarakat.</span>
                </div>
              </div>
            </div>

            <div className="about-overview-card">
              <div className="about-card-logo">
                <img src={ASSETS.logo} alt="PT Botani Seed Indonesia Logo" className="h-16 w-auto object-contain dark:brightness-0 dark:invert" />
              </div>

              <div className="about-stats-grid">
                {stats.map((stat, idx) => (
                  <div className="about-stat-item" key={idx}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <small>{stat.sub}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="about-vm-section">
        <div className="container">
          <div className="about-section-header text-center">
            <span className="about-section-tag">ARAH & TUJUAN</span>
            <h2>Visi & Misi Perusahaan</h2>
            <p>Landasan nilai dan arah langkah kami dalam melayani kemajuan pertanian Indonesia.</p>
          </div>

          <div className="about-vm-grid">
            <div className="about-visi-card">
              <div className="about-vm-icon">
                <Sparkles className="size-6 text-amber-500" />
              </div>
              <span className="about-vm-kicker">VISI</span>
              <h3>Menjadi Perusahaan Perbenihan Terkemuka Berbasis Sains</h3>
              <p>
                Menjadi perusahaan perbenihan dan sarana produksi pertanian terkemuka di Indonesia yang berbasis riset, bioteknologi, dan inovasi IPB University untuk mewujudkan kedaulatan pangan nasional yang berdaya saing tinggi.
              </p>
            </div>

            <div className="about-misi-card">
              <div className="about-vm-icon">
                <Layers className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="about-vm-kicker">MISI</span>
              <h3>4 Komitmen Utama Botani Seed</h3>
              <ul className="about-misi-list">
                <li>
                  <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Hilirisasi Riset IPB:</strong> Menyalurkan hasil riset pemuliaan tanaman akademisi IPB University menjadi produk bernilai nyata bagi masyarakat.</span>
                </li>
                <li>
                  <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Standar Mutu Benih Tinggi:</strong> Menyediakan benih sayuran berkualitas dengan daya berkecambah di atas 85% dan tahan cekaman iklim tropis.</span>
                </li>
                <li>
                  <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Edukasi & Pendampingan Tanam:</strong> Membekali masyarakat dan petani dengan SOP budidaya praktis dari tahap semai hingga panen berlimpah.</span>
                </li>
                <li>
                  <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Kemitraan Berkelanjutan:</strong> Membangun ekosistem agribisnis yang inklusif bersama mitra tani dan pelaku usaha di seluruh nusantara.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PILAR KEUNGGULAN */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="about-section-header text-center">
            <span className="about-section-tag">MENGAPA BOTANI SEED?</span>
            <h2>Pilar Keunggulan Mutu Kami</h2>
            <p>Kepercayaan pelanggan adalah prioritas utama kami dengan standar riset universitas kelas dunia.</p>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div className="about-pillar-card" key={idx}>
                <div className="about-pillar-icon-box">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LINI PRODUK SECTION */}
      <section className="about-products-section">
        <div className="container">
          <div className="about-section-header text-center">
            <span className="about-section-tag">KATALOG & LAYANAN</span>
            <h2>Lini Produk Agribisnis Kami</h2>
            <p>Portofolio lebih dari 50 varietas benih dan sarana penunjang tanam teruji.</p>
          </div>

          <div className="about-prodcat-grid">
            {productCategories.map((cat, idx) => (
              <div className="about-prodcat-card" key={idx}>
                <div className="about-prodcat-header">
                  <span className="about-prodcat-badge">{cat.badge}</span>
                  <h3>{cat.title}</h3>
                </div>
                <ul className="about-prodcat-list">
                  {cat.items.map((item, i) => (
                    <li key={i}>
                      <Leaf className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="about-milestones-section">
        <div className="container">
          <div className="about-section-header text-center">
            <span className="about-section-tag">PERJALANAN KAMI</span>
            <h2>Tonggak Sejarah Sejak 2016</h2>
            <p>Dedikasi tak henti berinovasi dalam memajukan pertanian modern Indonesia.</p>
          </div>

          <div className="about-timeline">
            {milestones.map((m, idx) => (
              <div className="about-timeline-item" key={idx}>
                <div className="about-timeline-marker">
                  <span>{m.year}</span>
                </div>
                <div className="about-timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-box">
            <div className="about-cta-copy">
              <span className="about-cta-kicker">MULAI BERSAMA KAMI</span>
              <h2>Siap Menghasilkan Panen Berkualitas dari Rumah?</h2>
              <p>
                Dapatkan paket 10 varietas benih sayuran unggul bersertifikat resmi IPB University dan panduan SOP tanam lengkap hari ini.
              </p>
            </div>

            <div className="about-cta-actions">
              <button
                type="button"
                className="about-cta-primary-btn"
                onClick={onOpenCheckout}
              >
                <ShoppingBag size={19} aria-hidden="true" />
                <span>Pesan Paket Benih Sekarang</span>
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-secondary-btn"
              >
                <MessageCircle size={19} className="text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
