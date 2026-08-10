import { motion, useReducedMotion } from 'motion/react';
import { Sprout, Droplets, Box } from 'lucide-react';

export function KendalaSection() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const kendalaList = [
    {
      icon: Sprout,
      colorClass: 'icon-daily',
      title: 'Benih Kurang Berkualitas',
      desc: 'Benih biasa seringkali gagal tumbuh atau rentan terhadap serangan hama dan penyakit.',
    },
    {
      icon: Droplets,
      colorClass: 'icon-market',
      title: 'Nutrisi Tidak Seimbang',
      desc: 'Takaran dan unsur hara tanah yang kurang tepat membuat pertumbuhan tanaman terhambat.',
    },
    {
      icon: Box,
      colorClass: 'icon-growth',
      title: 'Media Tanam Padat',
      desc: 'Akar sulit berkembang karena sirkulasi udara dan resapan air di media tanam yang buruk.',
    },
  ];

  return (
    <section id="kendala" className="section kendala-section">
      <div className="container">
        <div className="section-title">
          <motion.span className="eyebrow eyebrow-badge-orange" {...enter(0.05)}>
            KENDALA DAUN DAN TANAMAN
          </motion.span>
          <motion.h2 {...enter(0.12)}>
            Sudah Dirawat, Tapi Tanamanmu Masih Begitu-Begitu Saja?
          </motion.h2>
          <motion.p {...enter(0.2)}>
            Tanaman kerdil, daun menguning, atau hasil panen tidak maksimal? Jangan-jangan…
          </motion.p>
        </div>

        <div className="cards">
          {kendalaList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="card kendala-card"
                {...enter(0.2 + idx * 0.1)}
              >
                <div className={`icon ${item.colorClass}`}>
                  <Icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
