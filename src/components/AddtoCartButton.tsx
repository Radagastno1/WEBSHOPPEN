import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Products, useCart } from "../contexts/CartContext";
import { useCounterContext } from "../contexts/CounterProvider";

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
        });
      }, 1000);
    }
  };

  return (
    <div>
      <Button
        data-cy="product-buy-button"
        onClick={handleAddToCart}
        variant="contained"
        disabled={productAddedToCart || resetButton}
        sx={{
          mt: 1,
          mb: 1,
          background: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "black",
            transform: "scale(1.05)", // Öka storleken med 5% vid hovring
            transition: "transform 0.2s ease-in-out", // Lägg till en mjuk övergångseffekt
          },
        }}
      >
        <ShoppingCartIcon fontSize="small" style={{ marginRight: "8px" }} />
        {productAddedToCart ? (
          <Typography variant="body1" data-cy="added-to-cart-toast">
            har lagts till
          </Typography>
        ) : (
          <Typography variant="body1">Lägg till</Typography>
        )}
      </Button>
    </div>
  );
};

export default AddtoCartButton;
