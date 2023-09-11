import ListComponent from "../components/ListComponent";
import { useCart } from "../contexts/CartContext";
import { Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CartPage() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <div className="flex flex-1 flex-col items-center">
      {cart.length > 0 ? (
        <div>
          <ListComponent
            products={cart.map((p) => ({
              ...p,
              customButtons: [
                {
                  icon: <AddCircleIcon/>,
                  onClick: () => addToCart(p), 
                  datacy: "increase-quantity-button"
                },
                {
                  icon: <RemoveCircleIcon/>,
                  onClick: () => removeFromCart(p),
                  datacy: "decrease-quantity-button"
                },
              ],
            }))}
          />

          <Typography variant="h6" data-cy="total-price">
            Totalt pris: {totalPrice}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1">Din varukorg är tom</Typography>
      )}
    </div>
  );
}
