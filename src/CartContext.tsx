import useLocalStorageState from "./useLocalStorage";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Products{
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export interface Cart{
    products : Products[];
    totalPrice: number;
    
  }


interface CartContextType {
  cart: Cart;
  addToCart: (product: Products) => void;
  removeFromCart: (productId: number) => void;
  calculateTotal: () => number;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({ products: [], totalPrice: 0 });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Products) => {
    // Create a copy of the current cart state
    const updatedCart = { ...cart };
  
    // Add the new product to the products array
    updatedCart.products.push(product);
  
    // Calculate the total price based on the updated products
    const total = updatedCart.products.reduce((accumulator, product) => accumulator + product.price, 0);
    updatedCart.totalPrice = total;
  
    // Update the cart state with the new product
    setCart(updatedCart);
  };
  

  const removeFromCart = (productId: number) => {
    // Create a copy of the current cart state
    const updatedCart = { ...cart };
  
    // Find the index of the product with the matching productId in the products array
    const productIndex = updatedCart.products.findIndex((product) => product.id === productId);
  
    // If the product with the matching productId is found, remove it from the products array
    if (productIndex !== -1) {
      updatedCart.products.splice(productIndex, 1);
  
      // Recalculate the total price based on the updated products
      const total = updatedCart.products.reduce((accumulator, product) => accumulator + product.price, 0);
      updatedCart.totalPrice = total;
  
      // Update the cart state with the removed product
      setCart(updatedCart);
    }
  };
  

  const calculateTotal = () => {
   
    return cart.products.reduce((accumulator, product) => accumulator + product.price, 0);
  };

  const resetCart = () =>{
    setCart({products:[], totalPrice: 0})
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, resetCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
}
