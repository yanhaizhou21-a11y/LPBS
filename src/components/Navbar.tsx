import React from 'react';
import { MegaMenuNavbar } from './ui/mega-menu-navbar';
import { useLanguage } from '../i18n';

export interface NavbarProps {
  cartQty?: number;
  onOpenCart?: () => void;
  onOpenCheckout: () => void;
}

export function Navbar({ onOpenCheckout }: NavbarProps) {
  const { t } = useLanguage();

  return (
    <MegaMenuNavbar
      brandName="Botani Seed"
      brandHref="/"
      onOpenCheckout={onOpenCheckout}
      ctaLabel={t('nav.order') || "Pesan Sekarang"}
      className="notch-navbar-replacement"
    />
  );
}

export default Navbar;
