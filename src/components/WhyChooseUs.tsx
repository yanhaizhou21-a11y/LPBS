import React from 'react';
import { Award, ShieldCheck, PackageCheck } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Benih sudah bersertifikat',
    desc: 'Produk benih disiapkan dengan standar mutu yang dapat memberikan rasa aman dan lebih terpercaya untuk digunakan.',
  },
  {
    icon: Award,
    title: 'Kualitas terjamin',
    desc: 'Botani Seed berkomitmen menyediakan produk yang bermutu, terpercaya, dan sesuai kebutuhan pelanggan.',
  },
  {
    icon: PackageCheck,
    title: 'Paket berisi 10 jenis benih sayuran',
    desc: 'Dalam satu paket, Anda mendapatkan 10 jenis benih sayuran favorit yang lebih praktis untuk mulai berkebun.',
  },
];

export const WhyChooseUs: React.FC = () => (
  <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
        Kenapa harus memilih Paket Benih Sayur Botani Seed?
      </h2>
      <div className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <p><strong>PT Botani Seed Indonesia</strong> merupakan perusahaan agribisnis yang berdiri sejak tahun 2016 dan menjadi bagian dari <strong>PT Bogor Life Science and Technology (PT BLST)</strong>, Holding Company of IPB University.</p>
        <p>Kami bergerak dalam produksi dan pemasaran benih, bibit, pupuk, pestisida, serta berbagai sarana produksi pertanian berbasis inovasi dari IPB University, lembaga penelitian, dan mitra produsen terpercaya. Hingga saat ini, Botani Seed telah mengembangkan dan memasarkan lebih dari <strong>50 jenis produk benih dan produk agribisnis</strong> untuk memenuhi kebutuhan petani, pelaku usaha, serta masyarakat yang ingin mulai berkebun.</p>
        <p>Dengan pengalaman produksi dan pemasaran di berbagai wilayah Indonesia, kami berkomitmen menyediakan produk yang bermutu, terpercaya, dan sesuai kebutuhan pelanggan.</p>
        <p><strong>Paket Benih Sayuran Botani Seed memiliki keunggulan yaitu:</strong></p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-6">
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-3">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center font-bold text-emerald-700 dark:text-emerald-400">
        PT Botani Seed Indonesia — Mitra Andalan Petani Indonesia.
      </p>
    </div>
  </section>
);

export default WhyChooseUs;
