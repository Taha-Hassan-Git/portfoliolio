import { useState, useLayoutEffect, useCallback } from "react";

export function useLocalStorage<T = any>(key: string, defaultValue: T) {
  const [state, setState] = useState(defaultValue);

  // Load the value from local storage on first render (before paint to avoid flash)
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

  // Setter. Like a regular useState setter, this works as either () => next or (prev) => next
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
