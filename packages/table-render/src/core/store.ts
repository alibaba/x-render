import { createStore as createx } from 'zustand';
import { createContext } from 'react';

export const TRContext = createContext(null);
export const ConfigContext = createContext(null);

export type TStore = {
  loading: boolean;
  api: null,
  tab: 0, // 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
  dataSource: [],
  extraData: null, // 需要用到的 dataSource 以外的扩展返回值
  extraParams: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  tableSize: 'default',
  [key: string]: any
  init?: (schema: TStore['schema']) => any;
  getState: () => any;
  setState: (state: any) => void;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => createx<TStore>((set: any, get: any) => ({
  loading: false,
  api: null,
  tab: 0, // 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
  dataSource: [],
  extraData: null, // 需要用到的 dataSource 以外的扩展返回值
  extraParams: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  tableSize: 'default',
  inited: false,
  setState: (state: any) => {
    return set({ ...state })
  },
  getState: () => {
    return get();
  }
}));



