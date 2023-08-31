import React, { useState, useEffect } from "react";
import { addProductToCart, getCartFromLocalStorage } from "../localstorage";
import { Products } from "../interfaces";

interface CartItem extends Products {
  quantity: number;
}

interface Props {
  product: Products;
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    const cartItemsWithQuantity: CartItem[] = cartFromLocalStorage.products.map(product => ({
      ...product,
      quantity: 1, // Initial kvantitet, kan ändras baserat på dina behov
    }));
    setCartItems(cartItemsWithQuantity);
  }, []);

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addProductToCart(product);
      setProductAddedToCart(true);
      console.log("Produkt tillagd i kundvagnen");

      // Uppdatera kundvagnsobjekten från local storage och räkna antalet produkter
      const cartFromLocalStorage = getCartFromLocalStorage();
      const cartItemsWithQuantity: CartItem[] = cartFromLocalStorage.products.map(product => ({
        ...product,
        quantity: 1, // Initial kvantitet, kan ändras baserat på dina behov
      }));
      setCartItems(cartItemsWithQuantity);
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <button
        data-cy="product-buy-button"
        onClick={handleAddToCart}
        className={`bg-blue-500 border border-black rounded h-12 w-32 text-white ${
          productAddedToCart ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {productAddedToCart ? "Tillagd i kundvagn" : "Lägg till i kundvagn"}
      </button>
      <span data-cy="cart-items-count-badge" className="ml-2">Antal produkter i kundvagnen: {cartItemCount} </span>
    </div>
  );
};

export default AddtoCartButton;
















    






 
