import React from 'react';
import { MegaMenuNavbar } from './ui/mega-menu-navbar';
import { useLanguage } from '../i18n';

export interface NavbarProps {
  cartQty?: number;
  onOpenCart?: () => void;
  onOpenCheckout: () => void;
}

export function Navbar({ cartQty, onOpenCheckout }: NavbarProps) {
  const { t } = useLanguage();

  return (
    <MegaMenuNavbar
      brandName="Botani Seed"
      brandHref="/"
      onOpenCheckout={onOpenCheckout}
      cartQty={cartQty}
      ctaLabel={t('nav.order') || "Pesan Sekarang"}
    />
  );
}

export default Navbar;
