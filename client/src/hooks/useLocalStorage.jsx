import { useState, useEffect } from "react";
import StoryGenApi from "../api";

/**Hook for keeping state data synced with local storage */
const useLocalStorage = (key, firstValue = null) => {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    if (!item) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
      StoryGenApi[key] = item;
    }
  }, [key, item]);

  return [item, setItem];
};

export default useLocalStorage;
