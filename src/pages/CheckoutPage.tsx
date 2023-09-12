import { Box, Typography, useMediaQuery } from "@mui/material";
import FormComponent from "../components/CustomerCheckoutFormComponent";
import { useCart } from "../contexts/CartContext";
import CartPage from "./CartPage";

export default function CheckoutPage() {
  const { cart } = useCart();
  const isMobileScreen = useMediaQuery("(max-width: 500px)");
  return (
    <Box
      flexDirection={isMobileScreen ? "column" : "row"}
      maxHeight={isMobileScreen ? "80vh" : "100%"}
      sx={{
        display: "flex",
        flex: 1,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {cart.length <= 0 ? (
          <Typography variant="h6">Din varukorg är tom</Typography>
        ) : (
          ""
        )}
        <CartPage />
      </Box>
      <Box
        sx={{ flex: 1, borderLeft: "2px solid gray", borderColor: "#e0e0e0" }}
      >
        <FormComponent />
      </Box>
    </Box>
  );
}
