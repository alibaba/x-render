import { useReducer, useContext } from 'react';
import { Ctx, StoreCtx } from './context';

// 使用最顶层组件的 setState
export const useGlobal = () => {
  return useContext(Ctx);
};

// 组件最顶层传入的所有props
export const useStore = () => {
  return useContext(StoreCtx);
};

// 类似于 class component 的 setState
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
    return { ...state, ...action };
  }, initState);

  const setStateWithActionName = (state, actionName) => {
    setState(state);
  };

  return [state, setStateWithActionName];
};
