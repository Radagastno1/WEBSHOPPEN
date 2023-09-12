import { Typography } from "@mui/material";
import FormComponent from "../components/CustomerCheckoutFormComponent";
import { useCart } from "../contexts/CartContext";
import CartPage from "./CartPage";

export default function CheckoutPage() {
  const { cart } = useCart();

  return (
    <div className="order-page-container flex flex-1 overflow-y-auto">
      <div className="flex flex-col flex-1 items-center">
        {cart.length <= 0 ? (
          <Typography variant="h6">Din varukorg är tom</Typography>
        ) : (
          ""
        )}
        <CartPage />
      </div>
      <div className="flex flex-1 border-l-2 border-solid border-gray-300">
        <FormComponent />
      </div>
    </div>
  );
}
