import React, { useState, useEffect } from 'react';
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
import { CheckoutModal } from './components/CheckoutModal';
import { CartToast } from './components/CartToast';
import { SecretAdminLogin } from './components/SecretAdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

export function App() {
  const cart = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'admin-login' | 'admin-dashboard'>('landing');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>('Admin PT Botani Seed');

  useEffect(() => {
    // Check if secret admin route URL hash is present or token stored
    const token = localStorage.getItem('botani_admin_token');
    const name = localStorage.getItem('botani_admin_name');
    if (token) {
      setAdminToken(token);
      if (name) setAdminName(name);
    }

    if (window.location.pathname === '/secret-admin-login' || window.location.hash === '#admin') {
      if (token) {
        setView('admin-dashboard');
      } else {
        setView('admin-login');
      }
    }
  }, []);

  const handleOpenCheckout = () => {
    cart.closeCart();
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleAdminLoginSuccess = (token: string, name: string) => {
    setAdminToken(token);
    setAdminName(name);
    setView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('botani_admin_token');
    localStorage.removeItem('botani_admin_name');
    setAdminToken(null);
    setView('landing');
  };

  if (view === 'admin-login') {
    return (
      <SecretAdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToHome={() => setView('landing')}
      />
    );
  }

  if (view === 'admin-dashboard') {
    return (
      <AdminDashboard
        adminName={adminName}
        onLogout={handleAdminLogout}
        onGoHome={() => setView('landing')}
      />
    );
  }

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar
        cartQty={cart.totalQty}
        onOpenCart={cart.openCart}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onAddToCart={cart.addToCart}
          onOpenCheckout={handleOpenCheckout}
        />
        <PeluangSection />
        <StorySection />
        <CompanyProfile />
        <PromoSection
          onAddToCart={cart.addToCart}
          onOpenCheckout={handleOpenCheckout}
        />
        <QuickOrderSection
          onSetQtyDirectly={cart.setQtyDirectly}
          onAddToCart={cart.addToCart}
          onOpenCheckout={handleOpenCheckout}
        />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
        onOpenSecretAdmin={() => {
          if (adminToken) {
            setView('admin-dashboard');
          } else {
            setView('admin-login');
          }
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cart.isCartOpen}
        onClose={cart.closeCart}
        items={cart.items}
        totalQty={cart.totalQty}
        normalTotal={cart.normalTotal}
        discountTotal={cart.discountTotal}
        subtotal={cart.subtotal}
        isPromoEligible={cart.isPromoEligible}
        onUpdateQty={cart.updateQty}
        onClearCart={cart.clearCart}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        totalQty={cart.totalQty}
        subtotalProduct={cart.subtotal}
        normalTotalProduct={cart.normalTotal}
        discountTotalProduct={cart.discountTotal}
        onCartOpen={cart.openCart}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Floating Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      <CartToast message={cart.toastMessage} />
    </div>
  );
}

export default App;
