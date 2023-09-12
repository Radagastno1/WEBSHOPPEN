import { ReactNode, createContext, useContext } from "react";
import { CartItem, Product } from "../../data";
import useLocalStorageState from "../useLocalStorage";

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
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
  const [cart, setCart] = useLocalStorageState<CartItem[]>([], "cart");

  const [totalPrice, setTotalPrice] = useLocalStorageState<number>(
    0,
    "totalPrice"
  );

  const addToCart = (product: Product) => {
    const updatedCart = [...cart];
    let productExists = false;
  
    for (const cartItem of updatedCart) {
      if (cartItem.id === product.id) {
        cartItem.quantity += 1; 
        productExists = true;
        break;
      }
    }
  
    if (!productExists) {
      const newCartItem: CartItem = {
        ...product,
        quantity: 1,
      };
      updatedCart.push(newCartItem);
    }
  
    const total = updatedCart.reduce(
      (accumulator, cartItem) => accumulator + cartItem.price * cartItem.quantity,
      0
    );
    setTotalPrice(total);
  
    setCart(updatedCart);
  };
  
  const removeFromCart = (product: Product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((cartItem) => cartItem.id === product.id);
  
    if (productIndex !== -1) {
      const existingCartItem = updatedCart[productIndex];
  
      existingCartItem.quantity -= 1;
  
      if (existingCartItem.quantity === 0) {
        updatedCart.splice(productIndex, 1);
      }
  
      const total = updatedCart.reduce(
        (accumulator, cartItem) => accumulator + cartItem.price * cartItem.quantity,
        0
      );
  
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
