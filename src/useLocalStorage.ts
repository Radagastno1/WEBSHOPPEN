import { useEffect, useState } from "react";

export default function useLocalStorageState<T>(initialVaule: T, key: string) {
  const [count, setCount] = useState(() => {
    const IsItem = localStorage.getItem(key);

    if (IsItem) {
      return JSON.parse(IsItem) as T;
    } else {
      return initialVaule;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(count));
  }, [count, key]);

  return [count, setCount] as const;
}
