import { useEffect, useState } from 'react';

const DEBOUBCE_DELAY = 700;

export function useDebounce<T>(value: T, delay: number = DEBOUBCE_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}