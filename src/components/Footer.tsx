import { ASSETS } from '../data/assets';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
}

export function Footer({ onOpenPrivacyPolicy }: FooterProps) {
  return (
    <footer className="footer-section">
      <div className="container footer-grid-simple">
        <div className="footer-brand-col">
          <img src={ASSETS.logo} alt="Botani Seed" className="footer-brand-img" loading="lazy" />
        </div>

        <div className="footer-info-col">
          <h2 className="footer-col-title">Hubungi Kami</h2>
          <p className="footer-info-text">WhatsApp: +62 812-9945-0708</p>
        </div>

        <div className="footer-info-col">
          <h2 className="footer-col-title">Alamat</h2>
          <p className="footer-info-text">
            Jl. Taman Kencana No. 3, Kawasan Science Techno Park IPB, Babakan, Bogor Tengah, Kota Bogor, Jawa Barat 16128
          </p>
        </div>
      </div>

      {onOpenPrivacyPolicy && (
        <div className="container footer-bottom-subtle">
          <button type="button" onClick={onOpenPrivacyPolicy} className="footer-privacy-link">
            Kebijakan Privasi
          </button>
        </div>
      )}
    </footer>
  );
}
