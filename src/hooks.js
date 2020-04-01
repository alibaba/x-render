import { useRef, useEffect } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}
