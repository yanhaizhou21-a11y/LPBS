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
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ProductsPage } from './components/ProductsPage';
import { AboutPage } from './components/AboutPage';
import { KendalaSection } from './components/KendalaSection';
import { SolusiSection } from './components/SolusiSection';
import { PaketIsiSection } from './components/PaketIsiSection';
import { TestimonialSection } from './components/TestimonialSection';
import { BottomCTASection } from './components/BottomCTASection';

// Home Page (landing - 12 sections)
import { Hero } from './components/Hero';
import { WhyOpportunity } from './components/WhyOpportunity';
import { SuccessStories } from './components/SuccessStories';
import { HowToStart } from './components/HowToStart';
import { VideoPromo } from './components/VideoPromo';
import { BundlePromo } from './components/BundlePromo';
import { ProductMain } from './components/ProductMain';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { CTAFooter } from './components/CTAFooter';

import { isPublicPage, publicPageFromPath, type PublicPageId } from './config/public-pages';
import { readJsonResponse } from './lib/http';
import { SmoothScroll } from './components/SmoothScroll';
import { FadeContent } from './components/ui/fade-content';

const CheckoutModal = lazy(() => import('./components/CheckoutModal').then((module) => ({ default: module.CheckoutModal })));
type View = PublicPageId | 'admin-login' | 'dashboard';

function viewFromPath(): View {
  if (window.location.pathname === '/dashboard' || window.location.pathname === '/admin/dashboard') return 'dashboard';
  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/admin/login' ||
    window.location.pathname === '/secret-admin-login'
  ) {
    return 'admin-login';
  }
  return publicPageFromPath(window.location.pathname) ?? 'landing';
}

export function App() {
  const cart = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(window.location.pathname === '/kebijakan-privasi');
  const [view, setView] = useState<View>(viewFromPath);
  const [currentPath, setCurrentPath] = useState(() => `${window.location.pathname}${window.location.hash}`);
  const [adminName, setAdminName] = useState('Admin PT Botani Seed');
  const [authChecked, setAuthChecked] = useState(isPublicPage(viewFromPath()) && viewFromPath() !== 'dashboard');
  const [accessDenied, setAccessDenied] = useState(window.location.pathname === '/admin/dashboard');

  const navigate = (nextView: View, path: string, replace = false) => {
    window.history[replace ? 'replaceState' : 'pushState']({}, '', path);
    setView(nextView);
    setCurrentPath(path);
  };

  useEffect(() => {
    const syncRoute = () => {
      setView(viewFromPath());
      setCurrentPath(`${window.location.pathname}${window.location.hash}`);
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
          setCurrentPath(href);
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
    const isDashboard = view === 'dashboard' || window.location.pathname === '/dashboard' || window.location.pathname === '/admin/dashboard';
    const isLogin = view === 'admin-login' || window.location.pathname === '/login' || window.location.pathname === '/admin/login' || window.location.pathname === '/secret-admin-login';

    if (!isDashboard && !isLogin) {
      setAuthChecked(true);
      return;
    }

    let active = true;
    setAuthChecked(false);
    const requestedDashboard = window.location.pathname === '/admin/dashboard' || isDashboard;
    fetch('/api/auth/session')
      .then(async (response) => ({ response, data: await readJsonResponse(response, 'Respons sesi admin tidak valid.') }))
      .then(({ response, data }) => {
        if (!active) return;
        if (response.ok && data.success) {
          setAdminName(data.admin.name);
          setAccessDenied(false);
          if (view !== 'dashboard') {
            navigate('dashboard', '/dashboard', true);
          }
        } else {
          setAccessDenied((current) => requestedDashboard || current);
          navigate('admin-login', '/secret-admin-login', true);
        }
      })
      .catch(() => {
        if (!active) return;
        setAccessDenied((current) => requestedDashboard || current);
        navigate('admin-login', '/secret-admin-login', true);
      })
      .finally(() => {
        if (active) setAuthChecked(true);
      });

    return () => {
      active = false;
    };
  }, [view]);

  const handleAdminLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    setAdminName('Admin PT Botani Seed');
    navigate('landing', '/');
  };

  const openPrivacy = () => {
    window.history.pushState({}, '', '/kebijakan-privasi');
    setCurrentPath('/kebijakan-privasi');
    setIsPrivacyModalOpen(true);
  };

  const closePrivacy = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    setIsPrivacyModalOpen(false);
  };

  if (!authChecked) return <div className="route-loading" role="status">Memverifikasi sesi admin…</div>;

  if (view === 'dashboard') {
    return (
      <AdminDashboard
        adminName={adminName}
        onLogout={handleAdminLogout}
        onGoHome={() => navigate('landing', '/')}
        onUnauthorized={() => { setAccessDenied(true); navigate('admin-login', '/secret-admin-login', true); }}
      />
    );
  }
  if (view === 'admin-login') {
    return <SecretAdminLogin accessDenied={accessDenied} onLoginSuccess={(name) => { setAdminName(name); navigate('dashboard', '/dashboard', true); }} onBackToHome={() => navigate('landing', '/')} />;
  }

  const handleOpenCheckout = (defaultQty = 1) => {
    cart.closeCart();
    if (cart.totalQty === 0) {
      cart.addToCart(defaultQty);
    }
    setIsCheckoutOpen(true);
  };

  return (
    <SmoothScroll>
      <div className="app-root">
        <Navbar currentPath={currentPath} cartQty={cart.totalQty} onOpenCart={cart.openCart} onOpenCheckout={() => handleOpenCheckout(1)} />
        {view === 'landing2' ? (
          /* HOME 2 (10 Sections: "Kok Sayuran Tetangga Bisa Lebih Subur?") */
          <main>
            <FadeContent blur={false} duration={700} direction="none">
              <HeroSection variant={2} onAddToCart={cart.addToCart} onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <KendalaSection />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <SolusiSection onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <PromoSection onAddToCart={cart.addToCart} onOpenCheckout={() => handleOpenCheckout(5)} />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <PaketIsiSection onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <CompanyProfile />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <TestimonialSection />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <FAQSection onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
            <FadeContent blur={true} duration={800} threshold={0.12} ease="power2.out">
              <BottomCTASection onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
          </main>
        ) : view === 'products' ? (
          <ProductsPage onGoHome={() => navigate('landing', '/')} onAddToCart={cart.addProductToCart} onOpenCheckout={() => handleOpenCheckout(1)} />
        ) : view === 'about' ? (
          <AboutPage onGoHome={() => navigate('landing', '/')} onOpenCheckout={() => handleOpenCheckout(1)} />
        ) : (
          /* HOME 1 (12 Sections: "Hanya dari jualan sayuran bisa menghasilkan 2 digit?") */
          <main className="w-full overflow-x-hidden min-h-screen">
            {/* 1. HERO */}
            <FadeContent blur={false} duration={700} direction="none">
              <Hero onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>

            {/* 2. "Kenapa jualan sayur punya peluang?" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <WhyOpportunity />
            </FadeContent>

            {/* 3. "Dua kisah nyata petani sayuran yang berkembang" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <SuccessStories />
            </FadeContent>

            {/* 4. "Bagaimana cara memulainya?" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <HowToStart />
            </FadeContent>

            {/* 5. Video Promo */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <VideoPromo onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>

            {/* 6. Promo Bundling */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <BundlePromo
                onAddToCart={(qty) => cart.addToCart(qty)}
                onOpenCheckout={(qty) => handleOpenCheckout(qty)}
              />
            </FadeContent>

            {/* 7. Produk Utama "Paket Benih Sayur Botani Seed" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <ProductMain
                onAddToCart={(qty) => cart.addToCart(qty)}
                onOpenCheckout={(qty) => handleOpenCheckout(qty)}
              />
            </FadeContent>

            {/* 8. "Kenapa harus memilih Paket Benih Sayur Botani Seed" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <WhyChooseUs />
            </FadeContent>

            {/* 9. "Dokumentasi Kegiatan" */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <Gallery />
            </FadeContent>

            {/* 10. FAQ accordion */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <FAQ />
            </FadeContent>

            {/* 11. CTA penutup */}
            <FadeContent blur duration={800} direction="down" threshold={0.12}>
              <CTAFooter onOpenCheckout={() => handleOpenCheckout(1)} />
            </FadeContent>
          </main>
        )}
        <Footer onOpenPrivacyPolicy={openPrivacy} />
        <CartDrawer isOpen={cart.isCartOpen} onClose={cart.closeCart} items={cart.items} totalQty={cart.totalQty} normalTotal={cart.normalTotal} discountTotal={cart.discountTotal} subtotal={cart.subtotal} isPromoEligible={cart.isPromoEligible} onUpdateQty={cart.updateQty} onClearCart={cart.clearCart} onOpenCheckout={() => handleOpenCheckout(1)} />
        {isCheckoutOpen && (
          <Suspense fallback={<div className="checkout-loading" role="status">Menyiapkan checkout dan tarif pengiriman…</div>}>
            <CheckoutModal isOpen onClose={() => setIsCheckoutOpen(false)} items={cart.items} totalQty={cart.totalQty} subtotalProduct={cart.subtotal} normalTotalProduct={cart.normalTotal} discountTotalProduct={cart.discountTotal} onCartOpen={cart.openCart} />
          </Suspense>
        )}
        <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={closePrivacy} />
        <CookieConsentBanner onOpenPrivacyPolicy={openPrivacy} />
        <CartToast message={cart.toastMessage} />
      </div>
    </SmoothScroll>
  );
}

export default App;
