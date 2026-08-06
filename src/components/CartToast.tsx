import React from 'react';

interface CartToastProps {
  message: string | null;
}

export const CartToast: React.FC<CartToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      <span>{message}</span>
    </div>
  );
};
