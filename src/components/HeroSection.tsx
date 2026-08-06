import { motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, LockKeyhole, PackagePlus, ShoppingBag, Sprout, Truck } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface HeroSectionProps {
  onAddToCart: (qty: number) => void;
  onOpenCheckout: () => void;
}

const benefits = [
  { icon: BadgeCheck, text: 'Benih bersertifikat dan siap tanam' },
  { icon: Sprout, text: '10+ varietas sayur pilihan' },
  { icon: Truck, text: 'Tarif JNE otomatis ke seluruh Indonesia' },
];

export function HeroSection({ onAddToCart, onOpenCheckout }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero-section" id="top">
      <div className="hero-seed-grid" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div className="hero-eyebrow" {...enter(0.05)}>
            <span className="eyebrow-badge"><BadgeCheck size={15} /> Benih unggul bersertifikat</span>
            <span className="eyebrow-sub">Dikembangkan oleh PT Botani Seed Indonesia · IPB University</span>
          </motion.div>

          <motion.h1 className="hero-title" {...enter(0.12)}>
            Mulai kebun produktif dari <span className="text-gradient">satu paket benih.</span>
          </motion.h1>

          <motion.p className="hero-lead" {...enter(0.2)}>
            Pilih benih sayuran untuk kebutuhan rumah, kebun komunitas, atau langkah pertama usaha tani Anda. Pesan tanpa membuat akun.
          </motion.p>

          <motion.ul className="hero-pills" {...enter(0.28)}>
            {benefits.map(({ icon: Icon, text }) => (
              <li className="hero-pill" key={text}><span className="pill-icon"><Icon size={14} /></span>{text}</li>
            ))}
          </motion.ul>

          <motion.div className="hero-actions" {...enter(0.36)}>
            <motion.button className="hero-primary-btn" onClick={onOpenCheckout} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              <ShoppingBag size={19} /> Pesan sekarang
            </motion.button>
            <motion.button className="hero-secondary-btn" onClick={() => onAddToCart(5)} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              <PackagePlus size={19} /> Ambil promo 5 paket
            </motion.button>
          </motion.div>

          <motion.p className="hero-guarantee-note" {...enter(0.42)}><LockKeyhole size={14} /> Checkout tamu · data hanya untuk proses pesanan</motion.p>
        </div>

        <motion.div className="hero-visual" {...enter(0.28)}>
          <div className="hero-card-product">
            <div className="product-badge-discount">Hemat 20% untuk 5+</div>
            <div className="hero-image-wrapper">
              <img src={ASSETS.productBanner} alt="Paket benih sayuran Botani Seed" className="hero-product-img" width="900" height="620" />
            </div>
            <div className="product-card-body">
              <span className="product-category">PAKET LENGKAP SIAP TANAM</span>
              <h2 className="product-card-title">Paket Benih Sayur Unggul</h2>
              <div className="product-rating"><span className="stars" aria-label="Rating 4,9 dari 5">★★★★★</span><span className="rating-score">4,9/5</span><span className="rating-count">1.240+ pembeli</span></div>
              <div className="price-tag-wrap">
                <div className="price-single"><span className="price-label">Satuan</span><span className="price-val">Rp20.000</span></div>
                <div className="price-promo"><span className="promo-label">5 paket</span><span className="promo-val">Rp80.000</span><span className="normal-cross">Rp100.000</span></div>
              </div>
              <button className="card-add-btn" onClick={() => onAddToCart(1)}><PackagePlus size={17} /> Tambah ke keranjang</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
