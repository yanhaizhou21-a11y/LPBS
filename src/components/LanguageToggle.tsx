import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return <div className={`language-toggle ${className}`} role="group" aria-label="Language / Bahasa">
    <Languages size={16} aria-hidden="true" />
    <button type="button" className={language === 'id' ? 'active' : ''} onClick={() => setLanguage('id')} aria-pressed={language === 'id'}>ID</button>
    <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
  </div>;
}
