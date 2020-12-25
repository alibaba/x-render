import { useRef, useEffect, useReducer } from 'react';
import debounce from 'lodash.debounce';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}

export const useDebounce = (action, ms = 500) => {
  const debouncedAction = useRef();

  useEffect(() => {
    debouncedAction.current = debounce(action, ms);
  }, []);

  return debouncedAction.current;
};

export const useSet = initState =>
  useReducer((a, b) => ({ ...a, ...b }), initState);
