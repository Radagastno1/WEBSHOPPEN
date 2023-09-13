import {
  Box,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material"; 
import { useParams } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { useProductContext } from "../contexts/ProductContext";

//FÖR VG - PRODUCTPROVIDER OCH ISTÄLLET FÖR USEPARAMS SÅ HÄMTA PRODUCT VIA PRODUCTCONTEXT

export default function ProductPage() {
  const { allProducts } = useProductContext();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const { id } = useParams<{ id: string }>();
  const selectedProduct = allProducts.find((product) => String(product.id) === id);

  // Här kan du välja att använda mockedProducts som fallback om produkten inte finns i useProductContext

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={isSmallScreen ? 2 : 3}>
      <Grid item xs={12} sm={isSmallScreen ? 12 : 5.8} >
        <CardMedia
          component="img"
          alt={selectedProduct.title}
          sx={{
            width: "50%", 
            height: "auto",
            border: "30px solid white",
            borderRadius: "15px",
            overflow: "hidden",
          }}
          image={selectedProduct.image}
          title={selectedProduct.title}
        />
      </Grid>

      <Grid item xs={12} sm={isSmallScreen ? 12 : 5} md={5}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          marginLeft="-13rem"
          sx={{
            marginLeft: isSmallScreen ? "0" : "-13rem", 
          }}
        >
          <Typography
            variant="h2"
            data-cy="product-title"
            sx={{
              marginBottom: "2rem",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "BlinkMacSystemFont",
            }}
          >
            {selectedProduct.title}
          </Typography>
          <Typography
            data-cy="product-description"
            sx={{ marginBottom: "2rem" }}
          >
            {selectedProduct.description}
          </Typography>
          <Typography data-cy="product-price">
            Price: {selectedProduct.price}
          </Typography>
          <div className="flex-1 flex justify-center">
            <AddtoCartButton
              product={selectedProduct}
              data-cy="product-buy-button"
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
