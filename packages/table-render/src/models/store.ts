import { createStore as createx } from 'zustand';

type TStore = {
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
  // init?: (schema: TStore['schema']) => any;
  // setContext: (context: any) => any;
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


 
  setState: (state: any) => {
    return set({ ...state })
  },
  getState: () => {
    return get();
  }
}));



