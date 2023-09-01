import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { addProductToCart } from "../localstorage";
import { Products } from "../interfaces";
import { useCounterContext } from "../CounterProvider";

interface Props {
  product: Products;
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const { addCount } = useCounterContext();

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addProductToCart(product);
      setProductAddedToCart(true);
      //HÄR ANROPAS FUNKTIONEN I CONTEXT
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
