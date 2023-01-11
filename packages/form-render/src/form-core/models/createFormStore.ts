import create from 'zustand';
import createContext from 'zustand/context';
import type { StoreApi } from 'zustand';
import { _set, _get, _has, _cloneDeep } from '../../utils';
import { flattenSchema as flatten } from '../../utils/flattenSchema';

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
export const createStore = () => create<FormStore>((set, get) => ({
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

// 新建并导出一下 Provider、useStore、useStoreApi 三个对象
export const { Provider, useStore, useStoreApi } = createContext<StoreApi<FormStore>>();