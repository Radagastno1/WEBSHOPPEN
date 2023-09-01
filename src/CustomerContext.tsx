import { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "./useLocalStorage";

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
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useLocalStorageState(
    { name: "", address: "", zipcode: "", city: "", email: "", phone: "" },
    "customer"
  );

  //detta menas att alla barn i denna kommer åt customerprovidern och kan använda useCustomerContext
  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
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
