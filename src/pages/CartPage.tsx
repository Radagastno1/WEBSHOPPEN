import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Typography } from "@mui/material";
import ListComponent from "../components/ListComponent";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-around"}
      alignContent={"center"}
      width={"80%"}
    >
      {cart ? (
        <Box>
          <ListComponent
            products={cart.map((p) => ({
              ...p,
              customButtons: [
                {
                  icon: <AddCircleIcon />,
                  onClick: () => addToCart(p),
                  datacy: "increase-quantity-button",
                },
                {
                  icon: <RemoveCircleIcon />,
                  onClick: () => removeFromCart(p),
                  datacy: "decrease-quantity-button",
                },
              ],
            }))}
          />

          <Typography
            variant="h6"
            display={"flex"}
            justifyContent={"space-between"}
            mx={2}
          >
            <Typography>Totalt pris </Typography>
            <Typography data-cy="total-price">{totalPrice} kr</Typography>
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1">Din varukorg är tom</Typography>
      )}
    </Box>
  );
}
