import { Customer } from "./CustomerContext";
import { Products } from "./CartContext";

export interface Order {
  orderNr: string;
  customer: Customer;
  cart: Products[];
  totalPrice: number;
}

export interface CartItem extends Products {
  quantity: number;
}
