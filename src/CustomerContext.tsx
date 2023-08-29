import { createContext, useContext, useState, ReactNode } from 'react';

type Customer = {
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

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    zipcode: '',
    city: '',
    email: '',
    phone: '',
  });

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
    throw new Error('to use customerContext you must place it inside CustomerProvider tagsen');
  }
  return context;
}
