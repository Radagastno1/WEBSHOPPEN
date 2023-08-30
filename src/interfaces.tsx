import { Customer } from "./CustomerContext";

export interface Order{
    orderNr : string
    customer : Customer;
    cart : Cart;
  }

  export interface Products{
    id: string;
    title: string;
    price: number;
    description: string;
    url: string;
}

export interface Cart{
    products : Products[];
    totalPrice: number;
  }