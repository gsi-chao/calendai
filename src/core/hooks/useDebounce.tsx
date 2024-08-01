import { useEffect, useRef, useState } from "react";

const useDebounce = (value: unknown, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<unknown>("");
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce