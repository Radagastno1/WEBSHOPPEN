import { Box, CardMedia, Grid, Typography } from "@mui/material"; // Importera komponenter från Material-UI
import { useParams } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { useCounterContext } from "../contexts/CounterProvider";
import { useProductContext } from "../contexts/ProductContext";


//FÖR VG - PRODUCTPROVIDER OCH ISTÄLLET FÖR USEPARAMS SÅ HÄMTA PRODUCT VIA PRODUCTCONTEXT

export default function ProductPage() {
  const { count } = useCounterContext();
  const { products } = useProductContext();

  const { id } = useParams<{ id: string }>();
  const selectedProduct =
  products.find((product) => String(product.id) === id); 

  // Här kan du välja att använda mockedProducts som fallback om produkten inte finns i useProductContext
 
  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

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
