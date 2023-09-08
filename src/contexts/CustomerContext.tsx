import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";

export type Customer = {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  email: string;
  phone: string;
};

type CustomerContextType = {
  customer: Customer;
  setCustomer: (newCustomer: Customer) => void;
  resetCustomer: () => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useLocalStorageState<Customer>(
    {
      name: "",
      address: "",
      zipcode: "",
      city: "",
      email: "",
      phone: "",
    },
    "customer"
  );

  const resetCustomer = () =>
    setCustomer({
      name: "",
      address: "",
      zipcode: "",
      city: "",
      email: "",
      phone: "",
    });

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, resetCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomerContext(): CustomerContextType {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "to use customerContext you must place it inside CustomerProvider tagsen"
    );
  }
  return context;
}
