import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const customerStories = [
  { image: '/images/warehouse.jpg', title: 'Gudang penyimpanan produk' },
  { image: '/images/product-display.jpg', title: 'Display Produk Botani Seed Indonesia' },
  { image: '/images/promo-event.jpg', title: 'Pelanggan dan mitra Botani Seed' },
  { image: '/images/shipping.jpg', title: 'Pengiriman pesanan pelanggan' },
];

export function TestimonialSection() {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const shown = [
    customerStories[currentIndex],
    customerStories[(currentIndex + 1) % customerStories.length],
  ];

  const move = (direction: number) => {
    setCurrentIndex((current) => (current + direction + customerStories.length) % customerStories.length);
  };

  return (
    <section id="ulasan" className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 mb-3">
            REVIEW &amp; TESTIMONI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            Dipercaya oleh Banyak Pelanggan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="bg-[#12643a] text-white rounded-3xl p-7 sm:p-8 shadow-xl min-h-72 flex flex-col justify-center"
          >
            <Users className="w-9 h-9 text-emerald-200 mb-8" />
            <strong className="text-4xl sm:text-5xl font-black tracking-tight">10.000+</strong>
            <span className="font-extrabold mt-1">pcs penjualan</span>
            <p className="text-sm leading-relaxed text-emerald-100 mt-5">
              Terima kasih kepada pelanggan yang telah memilih Paket Benih Sayuran dari Botani Seed.
            </p>
          </motion.article>

          {shown.map((story, index) => (
            <motion.article
              key={`${story.title}-${currentIndex}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 min-h-72 flex flex-col"
            >
              <img src={story.image} alt={story.title} className="w-full h-56 md:h-64 object-cover" loading="lazy" />
              <strong className="p-5 text-sm sm:text-base text-slate-900 dark:text-slate-100">{story.title}</strong>
            </motion.article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-7">
          <button type="button" onClick={() => move(-1)} aria-label="Cerita sebelumnya" className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Cerita berikutnya" className="w-11 h-11 rounded-full bg-emerald-700 text-white shadow-sm flex items-center justify-center hover:bg-emerald-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
