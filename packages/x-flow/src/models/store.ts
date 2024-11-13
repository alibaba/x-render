import { createStore as createx } from 'zustand';

type FormStore = {
  schema?: any;
  flattenSchema: any;
  context?: any;
  initialized: boolean,
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => createx<FormStore>((setState: any, get: any) => ({
  initialized: false,
  schema: {},
  flattenSchema: {},
  context: {},
  init: data => {
    return setState({ 
      initialized: true, 
      ...data
    });
  },
  setContext: context => {
    return setState({ context });
  }
}));