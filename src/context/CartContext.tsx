import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Product } from '@/types';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';

function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ lazy init (no extra useEffect needed to "load")
  const [cartItems, setCartItems] = useState<CartItem[]>(readCartFromStorage);

  // ✅ persist
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.product.id === product.id);
      if (idx === -1) return [...prev, { product, quantity }];

      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((x) => x.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) return prev.filter((x) => x.product.id !== productId);
      return prev.map((x) =>
        x.product.id === productId ? { ...x, quantity } : x,
      );
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // ✅ derived values (fast + stable)
  const { totalItems, totalPrice } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.product.price * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 },
    );
  }, [cartItems]);

  // ✅ stable context value (reduces rerenders)
  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
