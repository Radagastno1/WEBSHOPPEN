import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { addProductToCart } from "../localstorage";
import { Products } from "../CartContext";
import { useCounterContext } from "../CounterProvider";
import { useCart } from "../CartContext";

interface Props {
  product: Products;
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const { addCount } = useCounterContext();
  const {addToCart} = useCart();

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addProductToCart(product);
      setProductAddedToCart(true);
      addToCart(product);
      addCount();
      
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
