import React from 'react';
import { Check } from 'lucide-react';

interface CartToastProps {
  message: string | null;
}

export const CartToast: React.FC<CartToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <span className="toast-icon"><Check size={15} strokeWidth={3} aria-hidden="true" /></span>
      <span>{message}</span>
    </div>
  );
};
