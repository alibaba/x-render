import React from 'react';
import { create, useStore } from 'zustand';
import { ToolbarActionConfig, ProColumnsType } from '../types';

export type TableRenderStoreType = {
  loading: boolean;
  api: null,
  /**
   * 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
   */
  tab: 0,
  /** 
   * 表格列定义
   */
  columns: ProColumnsType<any>,
  dataSource: any[],
  /**
   * 需要用到的 dataSource 以外的扩展返回值
   */
  extraData: null,
  extraParams: {},
  pagination: {
    current: number,
    pageSize: number,
    total: number,
  },
  tableSize: 'default',
  schema: any,
  inited: boolean,
  init?: (schema: TableRenderStoreType['schema']) => any;
  getState: () => any;
  setState: (state: any) => void;
  /**
   * 更新列数据
   */
  setColumns: (columns: ProColumnsType<any>) => void;
  /** 
   * 动态设置列状态
   */
  columnsSetting: ToolbarActionConfig['columnsSettingValue'];
  setColumnsSetting: (setting: ToolbarActionConfig['columnsSettingValue']) => void;
};

export const StoreContext = React.createContext(null);

export const createStore = (defaultProps?: Partial<TableRenderStoreType>) => create<TableRenderStoreType>()((set, get) => ({
  ...defaultProps,
  loading: false,
  api: null,
  tab: 0,
  dataSource: [],
  extraData: null,
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
  columnsSetting: [],
  setState: (state) => set({ ...state }),
  getState: () => get(),
  setColumns: (columns) => set({ columns }),
  setColumnsSetting: (setting) => set({ columnsSetting: setting }),
}));

export const useTableStore = <T>(
  selector: (store: TableRenderStoreType) => T,
  equalityFn?: (left: T, right: T) => boolean
) => {
  const store = React.useContext(StoreContext);
  return useStore(store, selector, equalityFn);
}