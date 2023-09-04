import { NavLink } from "react-router-dom";
import { mockedProducts } from "../mockedList";
import AddtoCartButton from "../components/AddtoCartButton";
import { addProductToLS } from "../localstorage";
import { Slide, Card, CardContent, Typography, CardMedia, Grid, Container } from "@mui/material";

const cardImageStyle = {
  height: "200px",
  objectFit: "cover",
};

const pageContainerStyle = {
  padding: "20px",
};

export default function IndexPage() {
  mockedProducts.forEach((p) => addProductToLS(p));
  localStorage.removeItem("orderGenerated");

  return (
    <Container sx={pageContainerStyle}> 
      <div className="flex flex-col items-center">
        <Grid container spacing={2}>
          {mockedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <NavLink to={`/product/${String(product.id)}`}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="140"
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
