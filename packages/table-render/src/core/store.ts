import { create } from 'zustand';
import { ProColumnsType } from '..';

type TableRenderStoreType = {
  loading: boolean;
  api: null,
  tab: 0, // 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
  /** 表格列定义 */
  columns: ProColumnsType<any>,
  dataSource: any[],
  extraData: null, // 需要用到的 dataSource 以外的扩展返回值
  extraParams: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  tableSize: 'default',
  schema: any,
  inited: boolean,
  init?: (schema: TableRenderStoreType['schema']) => any;
  getState: () => any;
  setState: (state: any) => void;
  /** 更新 columns */
  setColumns: (columns: any[]) => void;
};

export const useStore = create<TableRenderStoreType>()((set, get) => ({
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
  schema: {},
  columns: [],
  inited: false,
  setState: (state) => {
    return set({ ...state })
  },
  getState: () => {
    return get();
  },
  setColumns: (columns) => set({ columns }),
}));



