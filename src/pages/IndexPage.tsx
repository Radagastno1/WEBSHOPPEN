import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import AddtoCartButton from "../components/AddtoCartButton";
import { useProductContext } from "../contexts/ProductContext";

const cardImageStyle = {
  height: "210px",
  objectFit: "cover",
  transform: "scale(1.1)",
  objectPosition: "center 60%",
};

const pageContainerStyle = {
  padding: "20px",
};

export default function IndexPage() {
  localStorage.removeItem("orderGenerated");

  const { products } = useProductContext();

  return (
    <Container sx={pageContainerStyle}>
      <div className="flex flex-col items-center">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card data-cy="product">
                <NavLink to={`/product/${String(product.id)}`}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={product.image}
                    sx={cardImageStyle}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.title}
                    </Typography>
                  </CardContent>
                </NavLink>
                <CardContent>
                  <div data-cy="cart-items-count-badge">
                    <AddtoCartButton product={product} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
