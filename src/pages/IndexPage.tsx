import ZoomInIcon from "@mui/icons-material/ZoomIn";
import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { useProductContext } from "../contexts/ProductContext";

export default function IndexPage() {
  const { allProducts } = useProductContext();
  const [zoomedProduct, setZoomedProduct] = useState("");

  const handleZoom = (productId: string) => {
    setZoomedProduct(productId);
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          {allProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card data-cy="product">
                <NavLink to={`/product/${String(product.id)}`}>
                  <div style={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      alt={product.title}
                      image={product.image}
                      sx={
                        zoomedProduct === product.id
                          ? {
                              height: "250px",
                              objectFit: "cover",
                              transform: "scale(1.5)",
                              objectPosition: "center 58%",
                            }
                          : {
                              height: "250px",
                              objectFit: "cover",
                              transform: "scale(1)",
                              objectPosition: "center 60%",
                            }
                      }
                    />
                    <ZoomInIcon
                      onMouseEnter={() => handleZoom(product.id)}
                      onMouseLeave={() => handleZoom("")}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        fontSize: "20px",
                        padding: "3",
                        "&:hover": {
                          color: "grey",
                        },
                      }}
                    />
                  </div>

                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      sx={{ fontSize: 16, px: 1, pt: 1 }}
                      component="div"
                      data-cy="product-title"
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 16, px: 1, pt: 1 }}
                      component="div"
                      data-cy="product-price"
                    >
                      {product.price}kr
                    </Typography>
                  </Box>
                </NavLink>
                <div
                  data-cy="cart-items-count-badge"
                  style={{ paddingLeft: "1px" }}
                >
                  <AddtoCartButton product={product} />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
