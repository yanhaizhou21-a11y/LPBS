# Tactile 3D Action Buttons, Lenis Smooth Scroll & GSAP Scroll Reveals

Written against: current working tree

## Evidence chain

- Surface: `src/components/CheckoutModal.tsx`, `src/App.tsx`, homepage sections (`HeroSection`, `PeluangSection`, `StorySection`, `PromoSection`, `QuickOrderSection`, `FAQSection`, `CompanyProfile`)
- Problem: Critical checkout actions ("Kembali ke Keranjang", "Pilih pengiriman", "Lihat detail pembayaran", "Konfirmasi via WhatsApp") appear flat/uninviting with weak visual affordance; the homepage lacks unified smooth inertia scrolling and coordinated GSAP scroll reveals.
- Design evidence: User-provided 3D tactile button CSS (depth shadow, `:active` pushdown), screenshots of checkout step navigation, `/implement_lenis_scroll`, and `/gsap-core`.
- Owner: `src/index.css`, `src/components/CheckoutModal.tsx`, `src/components/SmoothScroll.tsx`, `src/App.tsx`
- Scope and affected surfaces: Checkout flow modal and homepage landing sections.
- Uncertainty: None.

## Design decision

1. Convert the 3D pressable button pattern into reusable CSS classes (`.btn-3d-emerald`, `.btn-3d-secondary`, `.btn-3d-wa`) adapted to the Botani Seed color system.
2. Upgrade all checkout step action buttons and navigation triggers to use tactile 3D styling with 48px min touch-target height.
3. Integrate Lenis smooth scrolling via `SmoothScroll.tsx` synchronized with `gsap.ticker` and `ScrollTrigger.update`.
4. Add GSAP-powered scroll reveal animations on homepage section headings and card grids.

## Changes

1. `package.json`
   - Add `lenis` and `gsap` (plus `@types/gsap`).
2. `src/index.css`
   - Implement `.btn-3d`, `.btn-3d-emerald`, `.btn-3d-secondary`, `.btn-3d-wa`, and modernize `.checkout-primary-btn`, `.checkout-secondary-btn`, `.start-payment-btn`, `.confirm-paid-btn`.
3. `src/components/SmoothScroll.tsx` [NEW]
   - Lenis smooth scroll provider component with GSAP ticker sync.
4. `src/components/CheckoutModal.tsx`
   - Apply 3D button classes to all step navigation and action buttons.
5. `src/App.tsx` & homepage sections
   - Wrap in `SmoothScroll` and attach scroll-reveal trigger effects.

## Validation

- Build: `npm run build`
- Tests: `npm run test:auth; npm run test:http`
- Visual & interaction: verify 3D click haptics in checkout modal and smooth scroll momentum on homepage.
