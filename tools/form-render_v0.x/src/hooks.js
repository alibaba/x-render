import { useRef, useEffect, useReducer } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}

export const useSet = initState =>
  useReducer((a, b) => ({ ...a, ...b }), initState);
