import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { addProductToCart, getCartFromLocalStorage } from "../localstorage";
import { Products, CartItem } from "../interfaces";

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
      quantity: 1,
    }));
    setCartItems(cartItemsWithQuantity);
  }, []);

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addProductToCart(product);
      setProductAddedToCart(true);

      const cartFromLocalStorage = getCartFromLocalStorage();
      const cartItemsWithQuantity: CartItem[] = cartFromLocalStorage.products.map(product => ({
        ...product,
        quantity: 1,
      }));
      setCartItems(cartItemsWithQuantity);
    }
  };

  return (
    <div>
      <Button
        data-cy="product-buy-button"
        onClick={handleAddToCart}
        variant="contained"
        color="primary"
        disabled={productAddedToCart}
        sx={{ mt: 2 }} 
      >
        {productAddedToCart ? "Tillagd i kundvagn" : "Lägg till i kundvagn"}
      </Button>
    </div>
  );
};

export default AddtoCartButton;
    






 
