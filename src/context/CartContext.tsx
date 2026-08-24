"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { InquiryModal } from "@/components/InquiryModal";

export type Currency = "INR" | "USD";

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
  // Multi-Currency & Price Conversion
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number;
  setExchangeRate: (rate: number) => void;
  formatPrice: (amountInINR: number) => string;
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

  // Multi-Currency State
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [exchangeRate, setExchangeRate] = useState<number>(83.5);

  // Load cart and currency from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("trustedmedshop_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }

    const savedCurrency = localStorage.getItem("trustedmedshop_currency");
    if (savedCurrency === "USD" || savedCurrency === "INR") {
      setCurrencyState(savedCurrency as Currency);
    }

    // Fetch exchange rate from CMS API
    fetch(`/api/cms?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.cms?.homepage?.usdExchangeRate || data.settings?.usdExchangeRate || data.settings?.homepage?.usdExchangeRate;
        if (rate && !isNaN(Number(rate))) {
          setExchangeRate(Number(rate));
        }
      })
      .catch((err) => console.error("CMS Exchange rate fetch error:", err));
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    localStorage.setItem("trustedmedshop_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("trustedmedshop_currency", c);
  };

  const formatPrice = (amountInINR: number): string => {
    if (isNaN(amountInINR)) return currency === "USD" ? "$ 0.00" : "₹ 0.00";
    if (currency === "USD") {
      const rate = exchangeRate > 0 ? exchangeRate : 83.5;
      const usdVal = amountInINR / rate;
      return `$ ${usdVal.toFixed(2)}`;
    }
    return `₹ ${amountInINR.toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
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
    if (product) {
      setInquiryProduct(product);
      addToCart(product, 1);
    } else if (cartItems.length > 0) {
      setInquiryProduct(cartItems[cartItems.length - 1].product);
    }
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setInquiryProduct(null);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
