import React from 'react';
import { ASSETS } from '../data/assets';
import { ShoppingCart, MessageSquare, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy }) => {
  return (
    <footer className="w-full bg-[#071a0e] dark:bg-[#040f08] text-white pt-16 pb-8 border-t border-emerald-950/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start text-center md:text-left">
          {/* LEFT: Logo + Tagline */}
          <div className="md:col-span-4 space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.logoFooter || ASSETS.logo}
                alt="Botani Seed Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Botani Seed
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-300">
              PT Botani Seed Indonesia — Perusahaan Benih Nasional Anak PT BLST (Holding Company IPB University). Menyediakan benih unggul bersertifikat untuk ketahanan pangan nasional.
            </p>
          </div>

          {/* MIDDLE: Hubungi Kami (WA, Shopee, Tokopedia) */}
          <div className="md:col-span-4 space-y-3 flex flex-col items-center md:items-start">
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-4 text-emerald-400">
              HUBUNGI KAMI
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/6281299450708"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp: +62 812-9945-0708</span>
                </a>
              </li>
              <li>
                <a
                  href="https://shopee.co.id/botaniseed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Shopee: Botani Seed Official Store</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tokopedia.com/botaniseed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tokopedia: Botani Seed Official</span>
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT: Alamat Kantor */}
          <div className="md:col-span-4 space-y-3 flex flex-col items-center md:items-start">
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-4 text-emerald-400">
              ALAMAT KANTOR
            </h3>
            <div className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-200 max-w-sm">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Jl. Taman Kencana No. 3, Kawasan Science Techno Park IPB, Babakan, Bogor Tengah, Kota Bogor, Jawa Barat 16128
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-6 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PT Botani Seed Indonesia. Seluruh hak cipta dilindungi.</p>
          {onOpenPrivacyPolicy && (
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="text-white hover:text-emerald-300 transition-colors underline cursor-pointer"
            >
              Kebijakan Privasi
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
