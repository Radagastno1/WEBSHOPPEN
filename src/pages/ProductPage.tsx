import React from "react";

import { Box, Typography, CardMedia, Grid, Button } from "@mui/material"; // Importera komponenter från Material-UI
import { mockedProducts } from "../mockedList";
import { useParams } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { CartItem } from "../interfaces";
import { useCounterContext } from "../CounterProvider";

function getCartItemsFromLocalStorage(): CartItem[] {
  const cartItemsJSON = localStorage.getItem("cartItems");
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

//FÖR VG - PRODUCTPROVIDER OCH ISTÄLLET FÖR USEPARAMS SÅ HÄMTA PRODUCT VIA PRODUCTCONTEXT

export default function ProductPage() {
  const { count } = useCounterContext();

  const { id } = useParams<{ id: string }>();
  const selectedProduct = mockedProducts.find(
    (product) => String(product.id) === id
  );

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  const cartItems = getCartItemsFromLocalStorage();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box data-cy="product-id">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="1rem"
        >
          <Typography
            variant="h2"
            data-cy="product-title"
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "BlinkMacSystemFont",
            }}
          >
            {selectedProduct.title}
          </Typography>
        </Box>
        <Typography data-cy="product-description">
          {selectedProduct.description}
        </Typography>
        <Typography data-cy="product-price">
          Price: {selectedProduct.price}
        </Typography>

       
      </Box>
      <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
        <Grid item lg={1}>
          <CardMedia
            component="img"
            alt={selectedProduct.title}
            sx={{
              width: "100%",
              height: "170px",
              borderRadius: "15px",
              overflow: "hidden",
            }}
            image={selectedProduct.image}
            title={selectedProduct.title}
          />
          
        </Grid>
      </Grid>
      <div className="flex-1 flex justify-center">
          <AddtoCartButton
          
            product={selectedProduct}
            data-cy="product-buy-button"
          />
        </div>
    </Box>
  );
}
