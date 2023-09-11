import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { useProductContext } from "../contexts/ProductContext";

const cardImageStyle = {
  height: "250px",
  objectFit: "cover",
  transform: "scale(1)",
  objectPosition: "center 60%",
};

const pageContainerStyle = {
  padding: "20px",
};

const zoomIconStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "20px",
  padding: "3",
  "&:hover": {
    color: "grey",
  },
};

const zoomedCardImageStyle = {
  height: "220px",
  objectFit: "cover",
  transform: "scale(1.5)",
  objectPosition: "center 58%",
};

export default function IndexPage() {
  const { products } = useProductContext();
  const [zoomedProduct, setZoomedProduct] = useState("");

  const handleZoom = (productId: string) => {
    setZoomedProduct(productId);
  };

  return (
    <Container sx={pageContainerStyle}>
      <div className="flex flex-col items-center">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card data-cy="product">
                <NavLink to={`/product/${String(product.id)}`}>
                  <div className="relative">
                    <CardMedia
                      component="img"
                      alt={product.title}
                      image={product.image}
                      sx={
                        zoomedProduct === product.id
                          ? zoomedCardImageStyle
                          : cardImageStyle
                      }
                    />
                    <ZoomInIcon
                      onMouseEnter={() => handleZoom(product.id)}
                      onMouseLeave={() => handleZoom("")}
                      sx={zoomIconStyle}
                    />
                  </div>

                  <Typography
                    sx={{ fontSize: 16, px: 1, pt: 1 }}
                    component="div"
                  >
                    {product.title}
                  </Typography>
                </NavLink>
                <div data-cy="cart-items-count-badge" className="px-1">
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
