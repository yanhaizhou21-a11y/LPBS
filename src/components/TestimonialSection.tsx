import { motion, useReducedMotion } from 'motion/react';
import { Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function TestimonialSection() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  const reviews = [
    {
      name: 'Ibu Rahmawati',
      city: 'Bogor',
      text: 'Paket benihnya sangat bagus! Sawi dan bayam tumbuh lebat dalam 3 minggu. Keluarga senang sekali bisa panen dari pekarangan rumah.',
      rating: 5,
    },
    {
      name: 'Pak Hery',
      city: 'Bandung',
      text: 'Daya tumbuh tinggi sekali. Dari 10 jenis benih, hampir semuanya tumbuh maksimal. Sangat direkomendasikan untuk yang suka berkebun.',
      rating: 5,
    },
    {
      name: 'Ibu Susanti',
      city: 'Jakarta',
      text: 'Pengiriman cepat, kemasan rapi, dan instruksinya mudah diikuti. Anak-anak jadi senang ikut merawat tanaman di rumah.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="ulasan" className="section soft testimonial-section">
      <div className="container">
        <div className="section-title text-center">
          <motion.span className="eyebrow eyebrow-badge-orange" {...enter(0.05)}>
            ULASAN PELANGGAN
          </motion.span>
          <motion.h2 {...enter(0.12)}>
            Dipercaya oleh Banyak Pelanggan
          </motion.h2>
        </div>

        <div className="testimonial-layout">
          <motion.div className="stat-card-green" {...enter(0.2)}>
            <div className="stat-card-content">
              <Users size={40} className="mb-3 opacity-90" />
              <h3>10.000+</h3>
              <p className="stat-card-title">Pelanggan</p>
              <p className="stat-card-sub">
                Telah mempercayakan kebutuhan benih sayuran mereka kepada Botani Seed
              </p>
            </div>
          </motion.div>

          <motion.div className="review-carousel-container" {...enter(0.3)}>
            <button
              type="button"
              onClick={prevReview}
              className="carousel-btn prev-btn"
              aria-label="Ulasan sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="review-card-active">
              <div className="review-stars">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#f7b928" color="#f7b928" />
                ))}
              </div>
              <p className="review-text">"{reviews[currentIndex].text}"</p>
              <div className="review-author">
                <strong>{reviews[currentIndex].name}</strong>
                <span> - {reviews[currentIndex].city}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={nextReview}
              className="carousel-btn next-btn"
              aria-label="Ulasan selanjutnya"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
