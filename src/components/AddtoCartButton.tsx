import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Products, useCart } from "../CartContext";
import { useCounterContext } from "../CounterProvider";

interface Props {
  product: Products;
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  const { addCount, count } = useCounterContext();
  const { addToCart } = useCart();

  useEffect(() => {
    if (resetButton) {
      setProductAddedToCart(false);
    }
  }, [resetButton]);

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addToCart(product);
      setProductAddedToCart(true);
      addCount();
      setTimeout(() => {
        setResetButton(true);
        setTimeout(() => {
          setResetButton(false);
        }, 500);
      }, 500);
    }
  };

  return (
    <div>
      <Button
        data-cy="product-buy-button"
        onClick={handleAddToCart}
        variant="contained"
        color="primary"
        disabled={productAddedToCart || resetButton}
        sx={{ mt: 2 }}
      >
         {productAddedToCart ? (
    <Typography variant="body1" color="textPrimary" data-cy="added-to-cart-toast">
      {count} {product.title} har lagts till
    </Typography>
  ) : (
    <Typography variant="body1" color="textPrimary">
      Lägg till {product.title} i kundvagn
    </Typography>
  )}
      </Button>
    </div>
  );
};

export default AddtoCartButton;
