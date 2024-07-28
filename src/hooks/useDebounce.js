import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(debounceTimeout);
  }, [value]);

  return debouncedValue;
}
