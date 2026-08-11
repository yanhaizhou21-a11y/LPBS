import { ASSETS } from '../data/assets';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
}

export function Footer({ onOpenPrivacyPolicy }: FooterProps) {
  return (
    <footer className="footer-section bg-[#071d10] text-white pt-14 pb-8 border-t border-emerald-900/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="footer-grid-simple grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* BRAND COLUMN */}
          <div className="footer-brand-col sm:col-span-2 lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.logoFooter}
                alt="Botani Seed"
                className="footer-brand-img h-12 w-auto object-contain"
                loading="lazy"
              />
              <span className="font-extrabold text-xl tracking-tight text-white">Botani Seed</span>
            </div>
            <p className="text-emerald-200/80 text-sm leading-relaxed max-w-sm">
              Solusi paket benih sayuran unggul bersertifikat IPB untuk ketahanan pangan keluarga dan kemajuan usaha tani Indonesia.
            </p>
          </div>

          {/* CONTACT COLUMN */}
          <div className="footer-info-col sm:col-span-1 lg:col-span-4 flex flex-col gap-2">
            <h2 className="footer-col-title text-sm font-extrabold text-emerald-400 uppercase tracking-wider mb-2">
              Hubungi Kami
            </h2>
            <p className="footer-info-text text-slate-200 text-sm leading-relaxed">
              WhatsApp:{' '}
              <a
                href="https://wa.me/6281299450708"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 font-bold hover:underline transition-colors"
              >
                +62 812-9945-0708
              </a>
            </p>
            <p className="footer-info-text text-emerald-200/70 text-xs leading-relaxed">
              Jam Operasional: Senin – Sabtu, 08.00 – 17.00 WIB
            </p>
          </div>

          {/* ADDRESS COLUMN */}
          <div className="footer-info-col sm:col-span-1 lg:col-span-4 flex flex-col gap-2">
            <h2 className="footer-col-title text-sm font-extrabold text-emerald-400 uppercase tracking-wider mb-2">
              Alamat Kantor
            </h2>
            <p className="footer-info-text text-slate-200 text-sm leading-relaxed">
              Jl. Taman Kencana No. 3, Kawasan Science Techno Park IPB, Babakan, Bogor Tengah, Kota Bogor, Jawa Barat 16128
            </p>
          </div>
        </div>

        {/* BOTTOM SUBTLE BAR */}
        <div className="footer-bottom-subtle mt-10 pt-6 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} PT Botani Seed Indonesia. Seluruh hak cipta dilindungi.</p>
          {onOpenPrivacyPolicy && (
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="footer-privacy-link hover:text-white transition-colors underline cursor-pointer"
            >
              Kebijakan Privasi
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

