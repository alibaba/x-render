import create from 'zustand';
import createContext from 'zustand/context';
import type { StoreApi } from 'zustand';
import { set as _set, get as _get, cloneDeep } from 'lodash-es';

type FormStore = {
  schema?: any;
  context?: any;
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setSchema: (schema: any) => any;
  setSchemaByPath: (path: string, schema: any) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = ()=> create<FormStore>((set, get) => ({
  schema: {},
  context: {},
  init: schema => {
    return set({ schema });
  },
  setSchema: schema => {
    return set({ schema });
  },
  setContext: context => {
    return set({ context });
  },
  setSchemaByPath: (path, modifiedSchema) => {
    const newSchema = cloneDeep(get().schema);
    let itemSchema = _get(newSchema, path, {});
    console.log('itemSchema', itemSchema);
    console.log('path', path);
    itemSchema = { ...itemSchema, ...modifiedSchema };
    // 需要改善
    _set(newSchema, 'properties.' + path, itemSchema);
    return set({ schema: newSchema });
  },
}));

// 新建并导出一下 Provider、useStore、useStoreApi 三个对象
export const { Provider, useStore, useStoreApi } = createContext<StoreApi<FormStore>>();