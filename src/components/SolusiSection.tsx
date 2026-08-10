import { motion, useReducedMotion } from 'motion/react';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

interface SolusiSectionProps {
  onOpenCheckout: () => void;
}

export function SolusiSection({ onOpenCheckout }: SolusiSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const points = [
    {
      title: 'Benih Vigor Tinggi',
      desc: 'Benih unggul yang teruji daya kecambahnya tinggi.',
      icon: Leaf,
    },
    {
      title: 'Media Tanam Gembur',
      desc: 'Memungkinkan perakaran tumbuh cepat dan kuat.',
      icon: ShieldCheck,
    },
    {
      title: 'Nutrisi & Air Cukup',
      desc: 'Menjamin tanaman mendapatkan asupan nutrisi seimbang.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="solusi" className="section alt solusi-section">
      <div className="container offer-grid">
        <motion.div className="solusi-visual" {...enter(0.1)}>
          <div className="solusi-poster-card">
            <img
              src="/images/solusi-pupuk.png"
              alt="Ternyata Bukan Cuma Soal Pupuk - Botani Seed"
              className="solusi-img"
              width="600"
              height="750"
            />
          </div>
        </motion.div>

        <motion.div className="solusi-content" {...enter(0.2)}>
          <span className="eyebrow eyebrow-badge-orange">SOLUSI BERKEBUN</span>
          <h2 className="solusi-title">Ternyata, Bukan Cuma Soal Pupuk</h2>
          <p className="lead">
            Menanam tanaman sehat membutuhkan kombinasi benih unggul, media tanam berkualitas, serta perawatan yang teratur.
          </p>

          <div className="solusi-alert-box">
            <p>
              <strong>Penggunaan benih berkualitas</strong> ditambah perawatan yang tepat adalah kunci utama tanaman bisa tumbuh lebat & hijau segar.
            </p>
          </div>

          <div className="solusi-points-list">
            {points.map((pt) => {
              const Icon = pt.icon;
              return (
                <div key={pt.title} className="solusi-point-item">
                  <div className="solusi-point-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <strong>{pt.title}</strong>
                    <p>{pt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenCheckout}
            className="hero-orange-btn solusi-btn"
          >
            Dapatkan Paket →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
