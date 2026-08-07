import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export function CookieConsentBanner({ onOpenPrivacyPolicy }: CookieConsentBannerProps) {
  const { t } = useLanguage();
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
            {t('cookie.title')}
          </h4>
          <p className="text-slate-400 leading-relaxed">
            {t('cookie.body')}{' '}
            <button
              onClick={onOpenPrivacyPolicy}
              className="inline-flex min-h-11 items-center text-emerald-400 underline hover:text-emerald-300"
            >
              {t('footer.privacy')}
            </button>
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="min-h-11 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors text-[11px]"
            >
              {t('cookie.accept')}
            </button>
            <button
              onClick={handleDecline}
              className="min-h-11 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-[11px]"
            >
              {t('cookie.decline')}
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          aria-label={t('cookie.close')}
          className="min-w-11 min-h-11 inline-grid place-items-center text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
