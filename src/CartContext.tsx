import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "./useLocalStorage";

export interface Products {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: Products[];
  totalPrice: number;
  addToCart: (product: Products) => void;
  removeFromCart: (product: Products) => void;
  calculateTotal: () => number;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  calculateTotal: () => 0,
  resetCart: () => {},
});

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useLocalStorageState<Products[]>([], "cart");

  const [totalPrice, setTotalPrice] = useLocalStorageState<number>(
    0,
    "totalPrice"
  );

  const addToCart = (product: Products) => {
    const updatedCart = [...cart];
    let productExists = false;
  
    for (const cartProduct of updatedCart) {
      if (cartProduct.id === product.id) {
        cartProduct.quantity += 1;
        productExists = true;
        break; 
      }
    }
  
    if (!productExists) {
      product.quantity = 1;
      updatedCart.push(product);
    }
  
    
  
    const total = updatedCart.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );
    setTotalPrice(total);

    setCart(updatedCart);
  };
  
  const removeFromCart = (product: Products) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((p) => p.id === product.id);
  
    if (productIndex !== -1) {
      const existingProduct = updatedCart[productIndex];
  
      // Decrease the quantity
      existingProduct.quantity -= 1;
  
      // Remove the product if quantity reaches zero
      if (existingProduct.quantity === 0) {
        updatedCart.splice(productIndex, 1);
      }
  
      // Calculate the new total price
      const total = updatedCart.reduce(
        (accumulator, p) => accumulator + p.price * p.quantity,
        0
      );
  
      // Update cart and total price
      setCart(updatedCart);
      setTotalPrice(total);
    }
  };
  

  const calculateTotal = () => {
    return cart.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
  };

  const resetCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        resetCart,
        removeFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
