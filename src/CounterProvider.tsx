import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definiera contexttypen
type CartContextType = {
  Count: number;
  addCount: () => void;
  subCount: () => void;
};

// Skapa en kontext
const CounterContext = createContext<CartContextType>({
  Count: 0,
  addCount: () => {},
  subCount: () => {},
});

// En komponent som du kan använda för att tillhandahålla värdet i din app
export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  const subCount = () => {
    setCount(count - 1);
  };
 

  return (
    <CounterContext.Provider value={{ Count: count, addCount, subCount }}>
      {children}
    </CounterContext.Provider>
  );
}

// En anpassad krok (hook) för att använda kontexten
export function useCounterContext() {
  return useContext(CounterContext);
}










