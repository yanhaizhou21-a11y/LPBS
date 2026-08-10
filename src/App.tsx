import { lazy, Suspense, useEffect, useState } from 'react';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PeluangSection } from './components/PeluangSection';
import { StorySection } from './components/StorySection';
import { CompanyProfile } from './components/CompanyProfile';
import { PromoSection } from './components/PromoSection';
import { QuickOrderSection } from './components/QuickOrderSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartToast } from './components/CartToast';
import { SecretAdminLogin } from './components/SecretAdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { BotaniDashboard } from './components/BotaniDashboard';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ProductsPage } from './components/ProductsPage';
import { KendalaSection } from './components/KendalaSection';
import { SolusiSection } from './components/SolusiSection';
import { PaketIsiSection } from './components/PaketIsiSection';
import { TestimonialSection } from './components/TestimonialSection';
import { BottomCTASection } from './components/BottomCTASection';

const CheckoutModal = lazy(() => import('./components/CheckoutModal').then((module) => ({ default: module.CheckoutModal })));
type View = 'landing' | 'landing2' | 'products' | 'admin-login' | 'admin-dashboard' | 'dashboard';

function viewFromPath(): View {
  if (window.location.pathname === '/dashboard') return 'dashboard';
  if (window.location.pathname === '/admin/dashboard') return 'admin-dashboard';
  if (window.location.pathname === '/secret-admin-login') return 'admin-login';
  if (window.location.pathname === '/products') return 'products';
  if (window.location.pathname === '/home2') return 'landing2';
  return 'landing';
}

export function App() {
  const cart = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(window.location.pathname === '/kebijakan-privasi');
  const [view, setView] = useState<View>(viewFromPath);
  const [adminName, setAdminName] = useState('Admin PT Botani Seed');
  const [authChecked, setAuthChecked] = useState(['landing', 'landing2', 'products', 'dashboard'].includes(viewFromPath()));
  const [accessDenied, setAccessDenied] = useState(window.location.pathname === '/admin/dashboard');

  const navigate = (nextView: View, path: string, replace = false) => {
    window.history[replace ? 'replaceState' : 'pushState']({}, '', path);
    setView(nextView);
  };

  useEffect(() => {
    const syncRoute = () => {
      setView(viewFromPath());
      setIsPrivacyModalOpen(window.location.pathname === '/kebijakan-privasi');
    };
    window.addEventListener('popstate', syncRoute);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.includes(':') &&
        !target.hasAttribute('download') &&
        target.getAttribute('target') !== '_blank'
      ) {
        const [path, hash] = href.split('#');
        const currentPath = window.location.pathname;

        if (path && (path !== currentPath || hash)) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setView(viewFromPath());
          if (hash) {
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (view === 'landing' || view === 'landing2' || view === 'products' || view === 'dashboard') return;
    let active = true;
    const requestedDashboard = window.location.pathname === '/admin/dashboard';
    fetch('/api/auth/session')
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!active) return;
        if (response.ok && data.success) {
          setAdminName(data.admin.name);
          setAccessDenied(false);
          navigate('admin-dashboard', '/admin/dashboard', true);
        } else {
          setAccessDenied(requestedDashboard);
          navigate('admin-login', '/secret-admin-login', true);
        }
      })
      .catch(() => {
        if (!active) return;
        setAccessDenied(requestedDashboard);
        navigate('admin-login', '/secret-admin-login', true);
      })
      .finally(() => active && setAuthChecked(true));
    return () => { active = false; };
  }, []);

  const handleAdminLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    setAdminName('Admin PT Botani Seed');
    navigate('landing', '/');
  };

  const openPrivacy = () => {
    window.history.pushState({}, '', '/kebijakan-privasi');
    setIsPrivacyModalOpen(true);
  };

  const closePrivacy = () => {
    window.history.pushState({}, '', '/');
    setIsPrivacyModalOpen(false);
  };

  if (!authChecked) return <div className="route-loading" role="status">Memverifikasi sesi admin…</div>;

  if (view === 'dashboard') {
    return <BotaniDashboard />;
  }

  if (view === 'admin-login') {
    return <SecretAdminLogin accessDenied={accessDenied} onLoginSuccess={(name) => { setAdminName(name); navigate('admin-dashboard', '/admin/dashboard', true); }} onBackToHome={() => navigate('landing', '/')} />;
  }

  if (view === 'admin-dashboard') {
    return <AdminDashboard adminName={adminName} onLogout={handleAdminLogout} onGoHome={() => navigate('landing', '/')} onUnauthorized={() => { setAccessDenied(true); navigate('admin-login', '/secret-admin-login', true); }} />;
  }

  return (
    <div className="app-root">
      <Navbar cartQty={cart.totalQty} onOpenCart={cart.openCart} onOpenCheckout={() => { cart.closeCart(); setIsCheckoutOpen(true); }} />
      {view === 'landing2' ? (
        <main>
          <HeroSection variant={2} onAddToCart={cart.addToCart} onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <KendalaSection />
          <SolusiSection onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <PromoSection onAddToCart={cart.addToCart} onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <PaketIsiSection onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <CompanyProfile />
          <TestimonialSection />
          <FAQSection onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <BottomCTASection onOpenCheckout={() => setIsCheckoutOpen(true)} />
        </main>
      ) : view === 'products' ? (
        <ProductsPage onGoHome={() => navigate('landing', '/')} onAddToCart={cart.addProductToCart} onOpenCheckout={() => { cart.closeCart(); setIsCheckoutOpen(true); }} />
      ) : (
        <main>
          <HeroSection variant={1} onAddToCart={cart.addToCart} onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <PeluangSection /><StorySection /><CompanyProfile />
          <PromoSection onAddToCart={cart.addToCart} onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <QuickOrderSection onSetQtyDirectly={cart.setQtyDirectly} onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <FAQSection onOpenCheckout={() => setIsCheckoutOpen(true)} />
        </main>
      )}
      <Footer onOpenPrivacyPolicy={openPrivacy} />
      <CartDrawer isOpen={cart.isCartOpen} onClose={cart.closeCart} items={cart.items} totalQty={cart.totalQty} normalTotal={cart.normalTotal} discountTotal={cart.discountTotal} subtotal={cart.subtotal} isPromoEligible={cart.isPromoEligible} onUpdateQty={cart.updateQty} onClearCart={cart.clearCart} onOpenCheckout={() => { cart.closeCart(); setIsCheckoutOpen(true); }} />
      {isCheckoutOpen && (
        <Suspense fallback={<div className="checkout-loading" role="status">Menyiapkan checkout dan tarif pengiriman…</div>}>
          <CheckoutModal isOpen onClose={() => setIsCheckoutOpen(false)} items={cart.items} totalQty={cart.totalQty} subtotalProduct={cart.subtotal} normalTotalProduct={cart.normalTotal} discountTotalProduct={cart.discountTotal} onCartOpen={cart.openCart} />
        </Suspense>
      )}
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={closePrivacy} />
      <CookieConsentBanner onOpenPrivacyPolicy={openPrivacy} />
      <CartToast message={cart.toastMessage} />
    </div>
  );
}

export default App;

