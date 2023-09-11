import FormComponent from "../components/CustomerCheckoutFormComponent";
import CartPage from "./CartPage";

export default function CheckoutPage() {
  return (
    <div className="order-page-container flex flex-1 overflow-y-auto">
      <div className="flex flex-1">
        <FormComponent />
      </div>
      <div className="flex flex-1 border-l-2 border-solid border-gray-300">
        <CartPage />
      </div>
    </div>
  );
}
