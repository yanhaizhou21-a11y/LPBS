import { useState, useEffect } from 'react';
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'botani_seed_cart';
const UNIT_PRICE = 20000;
const DISCOUNT_MIN_QTY = 5;
const DISCOUNT_RATE = 0.2; // 20%

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [
      {
        id: 'paket-benih-sayur',
        name: 'Paket Benih Sayur Botani Seed',
        price: UNIT_PRICE,
        qty: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const mainItem = items[0] || { id: 'paket-benih-sayur', name: 'Paket Benih Sayur Botani Seed', price: UNIT_PRICE, qty: 0 };
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  const isPromoEligible = totalQty >= DISCOUNT_MIN_QTY;
  const normalTotal = totalQty * UNIT_PRICE;
  const discountTotal = isPromoEligible ? Math.round(normalTotal * DISCOUNT_RATE) : 0;
  const subtotal = normalTotal - discountTotal;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (qtyToAdd: number = 1) => {
    setItems(prev => {
      if (prev.length === 0) {
        return [{ id: 'paket-benih-sayur', name: 'Paket Benih Sayur Botani Seed', price: UNIT_PRICE, qty: qtyToAdd }];
      }
      return prev.map(item =>
        item.id === 'paket-benih-sayur' ? { ...item, qty: item.qty + qtyToAdd } : item
      );
    });
    showToast(`${qtyToAdd} Paket Benih Sayuran berhasil ditambahkan ke keranjang.`);
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      clearCart();
      return;
    }
    setItems(prev => prev.map(item => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  const setQtyDirectly = (qty: number) => {
    if (qty <= 0) return;
    setItems([{ id: 'paket-benih-sayur', name: 'Paket Benih Sayur Botani Seed', price: UNIT_PRICE, qty }]);
  };

  const clearCart = () => {
    setItems([{ id: 'paket-benih-sayur', name: 'Paket Benih Sayur Botani Seed', price: UNIT_PRICE, qty: 0 }]);
  };

  return {
    items,
    mainItem,
    totalQty,
    normalTotal,
    discountTotal,
    subtotal,
    isPromoEligible,
    isCartOpen,
    setIsCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toastMessage,
    showToast,
    addToCart,
    updateQty,
    setQtyDirectly,
    clearCart
  };
}
