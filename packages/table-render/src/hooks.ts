import {useReducer, useContext, useRef, useEffect, DependencyList} from 'react';
import {Ctx, StoreCtx} from './context';
import isDeepEqualReact from 'fast-deep-equal/es6/react';

// 使用最顶层组件的 setState
export const useTable = () => {
  return useContext(Ctx);
};

// 组件最顶层传入的所有props
export const useStore = () => {
  return useContext(StoreCtx);
};

export const useSet = initState => {
  const [state, setState] = useReducer((state, newState) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(state);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(state);
      }
    }
    const result = {...state, ...action};
    return result;
  }, initState);
  const setStateWithActionName = (state, actionName) => {
    setState(state);
  };
  return [state, setStateWithActionName];
};


export const isDeepEqual: (a: any, b: any) => boolean = isDeepEqualReact;

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier
  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect: React.EffectCallback, dependencies: DependencyList = []) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

