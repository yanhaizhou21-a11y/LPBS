import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export function CookieConsentBanner({ onOpenPrivacyPolicy }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('botani_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('botani_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('botani_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-slate-900/95 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs space-y-1">
          <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
            Pemberitahuan Cookie & Privasi
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Kami menggunakan cookie lokal untuk menyimpan keranjang belanja dan preferensi pesanan Anda.{' '}
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Kebijakan Privasi
            </button>
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors text-[11px]"
            >
              Setuju & Lanjutkan
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-[11px]"
            >
              Tolak
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Tutup pemberitahuan cookie"
          className="text-slate-500 hover:text-slate-300 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
