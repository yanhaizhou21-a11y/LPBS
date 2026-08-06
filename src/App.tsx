import React, { useState } from 'react';
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

export function App() {
  const cart = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    cart.closeCart();
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

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
      <Footer />

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

      {/* Floating Toast Notification */}
      <CartToast message={cart.toastMessage} />
    </div>
  );
}

export default App;
