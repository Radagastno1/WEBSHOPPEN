import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";

type CounterContextType = {
  count: number;
  addCount: () => void;
  subCount: () => void;
  resetCount: () => void;
};

const CounterContext = createContext<CounterContextType>({
  count: 0,
  addCount: () => {},
  subCount: () => {},
  resetCount: () => {},
});

export function CounterProvider({ children }: { children: ReactNode }) {
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

export function useCounterContext() {
  return useContext(CounterContext);
}
