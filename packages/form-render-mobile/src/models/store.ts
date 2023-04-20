import { createStore as createx } from 'zustand';

type FormStore = {
  schema?: any;
  flattenSchema: any;
  context?: any;
  initialized: boolean,
  isCardMode: boolean,
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setIsCardMode: (mode:boolean) => void;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => createx<FormStore>((setState: any, get: any) => ({
  initialized: false,
  schema: {},
  flattenSchema: {},
  context: {},
  isCardMode: false,
  init: data => {
    return setState({ 
      initialized: true, 
      ...data
    });
  },
  setContext: context => {
    return setState({ context });
  },
  setIsCardMode: (mode) => setState({ isCardMode: mode }),
}));



