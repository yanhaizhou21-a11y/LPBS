import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CompanyProfile: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  return (
    <section id="profil" ref={containerRef} className="section company-profile-section py-14 sm:py-20 bg-white dark:bg-slate-900/60">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="company-layout-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div data-reveal className="company-text-content lg:col-span-7 flex flex-col items-start">
            <span className="eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
              TENTANG KAMI
            </span>
            <h2 className="company-main-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-3">
              PT Botani Seed Indonesia
            </h2>
            <p className="company-lead-desc text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              PT Botani Seed Indonesia merupakan badan usaha milik IPB University yang bergerak di bidang perbenihan. Kami berkomitmen menyediakan benih tanaman dan sayuran unggul berkualitas tinggi yang mudah ditanam oleh siapa saja, dari pekarangan rumah hingga lahan pertanian.
            </p>

            <div className="company-actions">
              <a
                href="#top"
                className="btn-fill-reveal inline-flex items-center justify-center px-6 py-3 rounded-2xl font-extrabold text-sm text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                Pelajari Selengkapnya tentang Botani Seed
              </a>
            </div>
          </div>

          <div data-reveal className="company-brand-card lg:col-span-5 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="brand-card-inner flex flex-col">
              <div className="brand-logo-header mb-6">
                <img src={ASSETS.logo} alt="Botani Seed Logo" className="brand-card-logo h-12 w-auto object-contain dark:brightness-0 dark:invert" />
              </div>

              <div className="brand-features-list flex flex-col gap-4">
                <div className="brand-feature-item flex items-start gap-3.5 bg-emerald-50/80 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-100/80 dark:border-emerald-900/50">
                  <div className="feature-icon-circle w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-slate-100 font-bold text-sm">Badan Usaha Resmi IPB</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-0.5">Formulasi & pemuliaan benih oleh peneliti pakar IPB University.</p>
                  </div>
                </div>

                <div className="brand-feature-item flex items-start gap-3.5 bg-emerald-50/80 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-100/80 dark:border-emerald-900/50">
                  <div className="feature-icon-circle w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-slate-100 font-bold text-sm">Daya Kecambah &gt;85%</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-0.5">Teruji kualitas & vigor pada berbagai media tanam maupun hidroponik.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
