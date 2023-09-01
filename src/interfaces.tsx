import { Customer } from "./CustomerContext";
import { Products } from "./CartContext"
import { Cart } from "./CartContext";

export interface Order{
    orderNr : string
    customer : Customer;
    cart : Cart;
  }



  export interface CartItem extends Products {
    quantity: number;
  }