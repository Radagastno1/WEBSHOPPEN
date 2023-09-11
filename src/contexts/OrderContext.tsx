import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";
import { Order } from "../interfaces";

type OrderContextType = {
  order: Order;
  setOrder: (newOrder: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useLocalStorageState<Order>(
    {
      orderNr: "",
      customer: {
        name: "",
        address: "",
        zipcode: "",
        city: "",
        email: "",
        phone: "",
      },
      cart: [],
      totalPrice: 0,
    },
    "order"
  );

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "to use orderContext you must place it inside OrderProvider tagsen"
    );
  }
  return context;
}
