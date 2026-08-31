"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { InquiryModal } from "@/components/InquiryModal";

export type Currency = "USD";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number;
  setExchangeRate: (rate: number) => void;
  formatPrice: (amount: number) => string;
  formatUsdPrice: (amountInUSD: number) => string;
  formattedCartTotal: string;
  // Inquiry Modal Controls
  isInquiryModalOpen: boolean;
  inquiryProduct: Product | null;
  openInquiryModal: (product?: Product) => void;
  closeInquiryModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  // Strictly USD Currency
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("trustedmedshop_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    localStorage.setItem("trustedmedshop_currency", "USD");
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    localStorage.setItem("trustedmedshop_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const setCurrency = (c: Currency) => {
    setCurrencyState("USD");
    localStorage.setItem("trustedmedshop_currency", "USD");
  };

  const formatPrice = (amount: number): string => {
    if (isNaN(amount)) return "USD 0.00";
    return `$ ${Number(amount).toFixed(2)}`;
  };

  const formatUsdPrice = (amountInUSD: number): string => {
    if (isNaN(amountInUSD)) return "USD 0.00";
    return `USD ${Number(amountInUSD).toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openInquiryModal = (product?: Product) => {
    setInquiryProduct(product || null);
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setInquiryProduct(null);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  );

  const formattedCartTotal = formatPrice(cartTotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        currency,
        setCurrency,
        exchangeRate,
        setExchangeRate,
        formatPrice,
        formatUsdPrice,
        formattedCartTotal,
        isInquiryModalOpen,
        inquiryProduct,
        openInquiryModal,
        closeInquiryModal,
      }}
    >
      {children}
      <InquiryModal />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
