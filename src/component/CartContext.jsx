import React, { createContext, useState, useEffect } from 'react';
import './com.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity, totalPrice: (cartItem.quantity + item.quantity) * cartItem.price }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, totalPrice: item.price * item.quantity }];
      }
    });
  };

  const updateItemQuantity = (item) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: item.quantity, totalPrice: item.price * item.quantity }
          : cartItem
      );
    });
  };

  const removeItemFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.name !== itemName));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    console.log('Order placed:', cart);
    clearCart();
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
