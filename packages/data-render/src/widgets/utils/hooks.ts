import { useReducer, useRef, useEffect } from 'react';

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// 类似于class component的setState
export const useSet = (initState: any) => {
  return useReducer((state: any, newState: any) => {
    return { ...state, ...newState };
  }, initState);
};
