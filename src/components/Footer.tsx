import { Building2, Mail, MapPin, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
}

export function Footer({ onOpenPrivacyPolicy }: FooterProps) {
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo-wrap">
            <img src={ASSETS.logoFooter} alt="" className="footer-logo-img" loading="lazy" />
            <div><strong className="footer-brand-name">PT Botani Seed Indonesia</strong><small className="footer-brand-tag">Benih baik, tumbuh bersama.</small></div>
          </div>
          <p className="footer-desc">Benih tanaman dan sayuran bersertifikat untuk pekebun rumahan, komunitas, dan pelaku usaha tani Indonesia.</p>
          <p className="footer-trust"><ShieldCheck size={16} /> Checkout tanpa akun. Data digunakan untuk memproses pesanan.</p>
        </div>

        <div className="footer-links-col">
          <h2 className="footer-col-title">Jelajahi</h2>
          <nav className="footer-nav-list" aria-label="Navigasi footer">
            <a href="/">Beranda</a><a href="/products">Produk</a><a href="/#peluang">Peluang usaha</a><a href="/#kisah">Cerita petani</a>
            <a href="#profil">Tentang perusahaan</a><a href="#promo">Promo 5 paket</a><a href="#faq">Pertanyaan umum</a>
            {onOpenPrivacyPolicy && <button onClick={onOpenPrivacyPolicy}>Kebijakan privasi</button>}
          </nav>
        </div>

        <div className="footer-info-col">
          <h2 className="footer-col-title">Hubungi kami</h2>
          <address className="footer-address">
            <p><Building2 size={16} /> PT Botani Seed Indonesia</p>
            <p><MapPin size={16} /> Bogor, Jawa Barat, Indonesia</p>
            <p><Mail size={16} /> info@botaniseed.co.id</p>
            <p><MessageCircle size={16} /> +62 812-9945-0708</p>
            <p><Truck size={16} /> Pengiriman dari Bogor via JNE</p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>© 2026 PT Botani Seed Indonesia. Hak cipta dilindungi.</p>
          <div className="payment-badges" aria-label="Metode pembayaran dan pengiriman"><span>QRIS</span><span>BSI</span><span>BNI</span><span>BRI</span><span>JNE</span></div>
        </div>
      </div>
    </footer>
  );
}
