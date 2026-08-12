import React from 'react';
import { ASSETS } from '../data/assets';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
  variant?: 'home1' | 'home2';
}

export const Footer: React.FC<FooterProps> = ({ variant = 'home1' }) => (
  <footer className="w-full bg-[#071a0e] dark:bg-[#040f08] text-white py-16 border-t border-emerald-950/80 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start text-center md:text-left">
        <div className="md:col-span-4 space-y-4 flex flex-col items-center md:items-start">
          <img src={ASSETS.logoFooter || ASSETS.logo} alt="Botani Seed" className="h-16 w-auto object-contain" />
          <strong className="font-extrabold text-xl">PT Botani Seed Indonesia</strong>
          <p className="text-sm italic text-emerald-200">Mitra Andalan Petani Indonesia</p>
          {variant === 'home1' && (
            <p className="text-sm leading-relaxed max-w-sm text-slate-300">
              Informasi peluang usaha bersifat edukatif dan bukan jaminan pendapatan.
            </p>
          )}
        </div>

        <div className="md:col-span-4 space-y-3 flex flex-col items-center md:items-start">
          <h3 className="text-base font-extrabold mb-3">Hubungi Kami</h3>
          <a href="https://wa.me/6281299450708" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-emerald-300">WhatsApp: +62 812-9945-0708</a>
          {variant === 'home1' ? (
            <>
              <a href="https://shopee.co.id/botaniseed" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-emerald-300">Shopee: botaniseedipb</a>
              <a href="https://tokopedia.com/botaniseed" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-emerald-300">Tokopedia: Botani Seed IPB</a>
            </>
          ) : (
            <span className="text-sm text-slate-200">TikTok: @botaniseedipb</span>
          )}
        </div>

        <div className="md:col-span-4 space-y-3 flex flex-col items-center md:items-start">
          <h3 className="text-base font-extrabold mb-3">Alamat</h3>
          <p className="text-sm leading-relaxed text-slate-200 max-w-sm">
            Jl. Taman Kencana No. 3, Kawasan Science Techno Park IPB, Babakan, Bogor Tengah, Kota Bogor.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
