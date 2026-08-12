import React from 'react';
import { ASSETS } from '../data/assets';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CompanyProfile: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  return (
    <section id="profil" ref={containerRef} className="section company-profile-section py-14 sm:py-20 bg-white dark:bg-slate-900/60">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div data-reveal className="text-center mb-8">
          <span className="eyebrow inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
            COMPANY PROFILE
          </span>
          <h2 className="company-main-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
            PT Botani Seed Indonesia
          </h2>
        </div>

        <div className="company-layout-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div data-reveal className="company-text-content lg:col-span-9 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700 space-y-4 text-left">
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              PT Botani Seed Indonesia merupakan perusahaan agribisnis yang berdiri sejak tahun 2016 dan menjadi bagian dari PT Bogor Life Science and Technology (PT BLST), Holding Company of IPB University.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Kami bergerak dalam produksi dan pemasaran benih, bibit, pupuk, pestisida, serta berbagai sarana produksi pertanian berbasis inovasi dari IPB University, lembaga penelitian, dan mitra produsen terpercaya. Hingga saat ini, Botani Seed telah mengembangkan dan memasarkan lebih dari 50 jenis produk benih dan produk agribisnis untuk memenuhi kebutuhan petani, pelaku usaha, serta masyarakat yang ingin mulai berkebun.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Dengan pengalaman produksi dan pemasaran di berbagai wilayah Indonesia, kami berkomitmen menyediakan produk yang bermutu, terpercaya, dan sesuai kebutuhan pelanggan.
            </p>
            <div className="rounded-xl bg-emerald-800 px-5 py-3 text-center text-sm font-extrabold text-white">
              PT Botani Seed Indonesia — Mitra Andalan Petani Indonesia
            </div>
          </div>

          <aside data-reveal className="company-brand-card lg:col-span-3 bg-emerald-50/50 dark:bg-slate-800/90 rounded-3xl p-4 sm:p-5 shadow-xl border border-emerald-100 dark:border-slate-700 flex flex-col gap-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 flex justify-center">
              <img src={ASSETS.logo} alt="Botani Seed" className="h-20 w-auto object-contain" />
            </div>
            <div className="brand-feature-item flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-700">
              <span className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-black">BLST</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100 font-bold text-sm">Bagian dari PT BLST</strong>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-0.5">PT Bogor Life Science and Technology</p>
              </div>
            </div>
            <div className="brand-feature-item flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-700">
              <span className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-black">IPB</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100 font-bold text-sm">Holding Company of IPB University</strong>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-0.5">Berbasis inovasi dan kepakaran</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
