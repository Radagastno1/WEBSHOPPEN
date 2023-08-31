import React from "react";
import { Box, Button, Typography } from "@mui/material"; // Importera komponenter från Material-UI
import { mockedProducts } from "../mockedList";
import { useParams } from "react-router-dom";
import AddtoCartButton from "./AddtoCartButton";

interface CartItem {
  id: string;
  quantity: number;
}

function getCartItemsFromLocalStorage(): CartItem[] {
  const cartItemsJSON = localStorage.getItem("cartItems");
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const selectedProduct = mockedProducts.find((product) => String(product.id) === id);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  const cartItems = getCartItemsFromLocalStorage();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box data-cy="product-id">
        <Typography variant="h2" data-cy="product-title">
          {selectedProduct.title}
        </Typography>
        <Typography data-cy="product-description">
          {selectedProduct.description}
        </Typography>
        <Typography data-cy="product-price">
          Price: {selectedProduct.price}
        </Typography>
        <AddtoCartButton product={selectedProduct} />
      </Box>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        style={{ marginTop: "1rem", width: "8rem", height: "auto" }}
      />
      {/* Resten av din kod */}
    </Box>
  );
}












