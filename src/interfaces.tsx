import { Products } from "./contexts/CartContext";
import { Customer } from "./contexts/CustomerContext";

export interface Order {
  orderNr: string;
  customer: Customer;
  cart: Products[];
  totalPrice: number;
}

export interface CartItem extends Products {
  quantity: number;
}
