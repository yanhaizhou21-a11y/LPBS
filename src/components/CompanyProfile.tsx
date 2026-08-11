import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const CompanyProfile: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="profil" className="section company-profile-section">
      <div className="container">
        <div className="company-layout-grid">
          <motion.div
            className="company-text-content"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow eyebrow-badge-orange">TENTANG KAMI</span>
            <h2 className="company-main-title">PT Botani Seed Indonesia</h2>
            <p className="company-lead-desc">
              PT Botani Seed Indonesia merupakan badan usaha milik IPB University yang bergerak di bidang perbenihan. Kami berkomitmen menyediakan benih tanaman dan sayuran unggul berkualitas tinggi yang mudah ditanam oleh siapa saja, dari pekarangan rumah hingga lahan pertanian.
            </p>

            <div className="company-actions">
              <a
                href="#top"
                className="btn-fill-reveal"
              >
                Pelajari Selengkapnya tentang Botani Seed
              </a>
            </div>
          </motion.div>

          <motion.div
            className="company-brand-card"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="brand-card-inner">
              <div className="brand-logo-header">
                <img src={ASSETS.logo} alt="Botani Seed Logo" className="brand-card-logo" />
              </div>

              <div className="brand-features-list">
                <div className="brand-feature-item">
                  <div className="feature-icon-circle">
                    <Award size={20} />
                  </div>
                  <div>
                    <strong>Badan Usaha Resmi IPB</strong>
                    <p>Formulasi & pemuliaan benih oleh peneliti pakar IPB University.</p>
                  </div>
                </div>

                <div className="brand-feature-item">
                  <div className="feature-icon-circle">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <strong>Daya Kecambah &gt;85%</strong>
                    <p>Teruji kualitas & vigor pada berbagai media tanam maupun hidroponik.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
