import create from 'zustand';
import createContext from 'zustand/context';
import type { StoreApi } from 'zustand';
import { _set, _get, _has, _cloneDeep, isFunction } from '../../utils';

type FormStore = {
  schema?: any;
  context?: any;
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setSchema: (schema: any, callBack: () => void) => any;
  setSchemaByPath: (path: string, schema: any, callBack: (schema: any) => void) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = ()=> create<FormStore>((set, get) => ({
  schema: {},
  context: {},
  init: schema => {
    return set({ schema });
  },
  setContext: context => {
    return set({ context });
  },
  setSchema: (obj: any, callBack: any) => { // { path: value }
    const schema = _cloneDeep(get().schema);

    Object.keys(obj || {}).forEach(path => {
      const item = obj[path];
      const oldSchema = _get(schema, path);
      const newSchema = isFunction(item) ? item(oldSchema) : item;
      const isHas = _has(schema, path);
  
      if (!isHas) {
        _set(schema, path, newSchema);
        
      } else {
        _set(schema, path, {
          ...oldSchema,
          ...newSchema
        });
      }
    });
    callBack(schema);
    return set({ schema });
  },
  setSchemaByPath: (path, modifiedSchema, callBack) => {
    const _path = 'properties.' + path;
    const schema = _cloneDeep(get().schema);
    let itemSchema = _get(schema, _path, {});

    if (typeof modifiedSchema === 'function') {
      itemSchema = { ...itemSchema, ...modifiedSchema(itemSchema) };
    } else {
      itemSchema = { ...itemSchema, ...modifiedSchema };
    }

    console.log('itemSchema', itemSchema);
    console.log('path', _path);
    
    // 需要改善
    _set(schema, _path, itemSchema);
    callBack(schema);
    return set({ schema });
  },
}));

// 新建并导出一下 Provider、useStore、useStoreApi 三个对象
export const { Provider, useStore, useStoreApi } = createContext<StoreApi<FormStore>>();