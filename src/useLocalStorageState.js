import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // use callback function to pass in function that react call it in the initial render
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return [value, setValue];
}
