import { useState, useLayoutEffect, useCallback } from "react";

export type LocalStorageSetter<T> = (setter: T | ((value: T) => T)) => void;

export function useLocalStorage<T = any>(key: string, defaultValue: T) {
  const [state, setState] = useState(defaultValue);

  useLayoutEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        setState(JSON.parse(value));
      } catch (e) {
        console.error(`Could not restore value ${key} from local storage.`);
      }
    }
  }, [key]);

  const updateValue = useCallback(
    (setter: T | ((value: T) => T)) => {
      setState((s) => {
        const value =
          typeof setter === "function" ? (setter as any)(s) : setter;
        localStorage.setItem(key, JSON.stringify(value));
        return value;
      });
    },
    [key]
  );

  return [state, updateValue] as const;
}
