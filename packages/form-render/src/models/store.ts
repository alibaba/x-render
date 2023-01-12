import { createStore as createx } from 'zustand';
import { flattenSchema as flatten } from './flattenSchema';

type FormStore = {
  schema?: any;
  flattenSchema: any;
  context?: any;
  isInit: boolean,
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setSchema: (schema: any) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => createx<FormStore>((set: any, get: any) => ({
  isInit: false,
  schema: {},
  flattenSchema: {},
  context: {},
  
  init: schema => {
    const flattenSchema = flatten(schema);
    return set({ schema, isInit: true, flattenSchema });
  },

  setContext: context => {
    return set({ context });
  },

  setSchema: (schema: any) => {
    const flattenSchema = flatten(schema);
    return set({ schema, flattenSchema });
  }
}));



