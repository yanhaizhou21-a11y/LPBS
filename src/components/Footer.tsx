import { Building2, Mail, MapPin, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../i18n';

interface FooterProps { onOpenPrivacyPolicy?: () => void; }

export function Footer({ onOpenPrivacyPolicy }: FooterProps) {
  const { t } = useLanguage();
  return <footer className="footer-section">
    <div className="container footer-grid">
      <div className="footer-brand-col"><div className="footer-logo-wrap"><img src={ASSETS.logoFooter} alt="" className="footer-logo-img" loading="lazy" /><div><strong className="footer-brand-name">PT Botani Seed Indonesia</strong><small className="footer-brand-tag">{t('footer.tagline')}</small></div></div><p className="footer-desc">{t('footer.description')}</p><p className="footer-trust"><ShieldCheck size={16} /> {t('footer.trust')}</p></div>
      <div className="footer-links-col"><h2 className="footer-col-title">{t('footer.explore')}</h2><nav className="footer-nav-list" aria-label={t('footer.explore')}><a href="/">{t('nav.home')}</a><a href="/products">{t('nav.products')}</a><a href="/#peluang">{t('footer.business')}</a><a href="/#kisah">{t('nav.stories')}</a><a href="#profil">{t('footer.company')}</a><a href="#promo">{t('footer.promo')}</a><a href="#faq">{t('footer.faq')}</a>{onOpenPrivacyPolicy && <button onClick={onOpenPrivacyPolicy}>{t('footer.privacy')}</button>}</nav></div>
      <div className="footer-info-col"><h2 className="footer-col-title">{t('footer.contact')}</h2><address className="footer-address"><p><Building2 size={16} /> PT Botani Seed Indonesia</p><p><MapPin size={16} /> Bogor, Jawa Barat, Indonesia</p><p><Mail size={16} /> info@botaniseed.co.id</p><p><MessageCircle size={16} /> +62 812-9945-0708</p><p><Truck size={16} /> {t('footer.shipping')}</p></address></div>
    </div>
    <div className="footer-bottom"><div className="container bottom-flex"><p>© 2026 PT Botani Seed Indonesia. {t('footer.rights')}</p><div className="payment-badges" aria-label="Payment and shipping methods"><span>QRIS</span><span>BSI</span><span>BNI</span><span>BRI</span><span>JNE</span></div></div></div>
  </footer>;
}
