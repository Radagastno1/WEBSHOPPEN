import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "./useLocalStorage";

// Definiera contexttypen
type CounterContextType = {
  count: number;
  addCount: () => void;
  subCount: () => void;
  resetCount: () => void;
};

// Skapa en kontext
const CounterContext = createContext<CounterContextType>({
  count: 0,
  addCount: () => {},
  subCount: () => {},
  resetCount: () => {},
});

// En komponent som du kan använda för att tillhandahålla värdet i din app
export function CounterProvider({ children }: { children: ReactNode }) {
  //Använder den generiska Localstorage-staten och sätter count i LS med default-värde 0!
  const [count, setCount] = useLocalStorageState(0, "count");

  const addCount = () => setCount(count + 1);

  const subCount = () => setCount(count - 1);

  const resetCount = () => setCount(0);

  return (
    <CounterContext.Provider
      value={{ count: count, addCount, subCount, resetCount }}
    >
      {children}
    </CounterContext.Provider>
  );
}

// En anpassad krok (hook) för att använda kontexten
export function useCounterContext() {
  return useContext(CounterContext);
}
