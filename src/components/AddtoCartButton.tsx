import { Button } from "@mui/material";
import React, { useState } from "react";
import { Products, useCart } from "../CartContext";
import { useCounterContext } from "../CounterProvider";

interface Props {
  product: Products;
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const { addCount } = useCounterContext();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addToCart(product);
      setProductAddedToCart(true);
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
