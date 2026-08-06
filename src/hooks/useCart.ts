import { useState, useEffect } from 'react';
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'botani_seed_cart';
const UNIT_PRICE = 20000;
const DISCOUNT_MIN_QTY = 5;
const DISCOUNT_RATE = 0.2; // 20%
const MAIN_PRODUCT: CartItem = {
  id: 'paket-benih-sayur', name: 'Paket Benih Sayur Botani Seed', price: UNIT_PRICE, qty: 0
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item): item is CartItem =>
            typeof item?.id === 'string' && typeof item?.name === 'string' &&
            Number.isFinite(item?.price) && Number.isInteger(item?.qty) && item.qty > 0
          );
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
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

  const mainItem = items.find((item) => item.id === MAIN_PRODUCT.id) || MAIN_PRODUCT;
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);
  const normalTotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const isPromoEligible = mainItem.qty >= DISCOUNT_MIN_QTY;
  const discountTotal = isPromoEligible ? Math.round(mainItem.price * mainItem.qty * DISCOUNT_RATE) : 0;
  const subtotal = normalTotal - discountTotal;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (qtyToAdd: number = 1) => {
    setItems(prev => {
      const exists = prev.some((item) => item.id === MAIN_PRODUCT.id);
      return exists
        ? prev.map((item) => item.id === MAIN_PRODUCT.id ? { ...item, qty: item.qty + qtyToAdd } : item)
        : [{ ...MAIN_PRODUCT, qty: qtyToAdd }, ...prev];
    });
    showToast(`${qtyToAdd} Paket Benih Sayuran berhasil ditambahkan ke keranjang.`);
  };

  const addProductToCart = (product: { slug: string; name: string; price: number }) => {
    setItems((previous) => {
      const existing = previous.find((item) => item.id === product.slug);
      return existing
        ? previous.map((item) => item.id === product.slug ? { ...item, qty: item.qty + 1 } : item)
        : [...previous, { id: product.slug, name: product.name, price: product.price, qty: 1 }];
    });
    showToast(`${product.name} ditambahkan ke keranjang.`);
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setItems((previous) => previous.filter((item) => item.id !== id));
      return;
    }
    setItems(prev => prev.map(item => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  const setQtyDirectly = (qty: number) => {
    if (qty <= 0) return;
    setItems((previous) => {
      const exists = previous.some((item) => item.id === MAIN_PRODUCT.id);
      return exists
        ? previous.map((item) => item.id === MAIN_PRODUCT.id ? { ...item, qty } : item)
        : [{ ...MAIN_PRODUCT, qty }, ...previous];
    });
  };

  const clearCart = () => setItems([]);

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
    addProductToCart,
    updateQty,
    setQtyDirectly,
    clearCart
  };
}
