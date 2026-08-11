import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 ${className}`}
      role="group"
      aria-label="Pilih Bahasa / Choose Language"
    >
      <Languages size={14} className="text-slate-500 dark:text-slate-400 shrink-0" aria-hidden="true" />
      <button
        type="button"
        className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
          language === 'id'
            ? 'bg-emerald-700 text-white font-extrabold shadow-xs'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        onClick={() => setLanguage('id')}
        aria-pressed={language === 'id'}
      >
        ID
      </button>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <button
        type="button"
        className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-emerald-700 text-white font-extrabold shadow-xs'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageToggle;

