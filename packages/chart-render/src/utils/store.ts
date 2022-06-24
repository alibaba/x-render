import { FormInstance } from 'form-render';
import create, { StoreApi } from 'zustand';
import createContext from 'zustand/context';
import { DataSource } from './type';
export interface IStore {
  /** 修改全局状态的工具函数 */
  readonly setChart: (store: Partial<IStore>) => void;

  /** FormRender 实例 */
  readonly form?: FormInstance;

  /** 是否在加载中 */
  loading: boolean;

  /** 数据，提供给图表组件进行渲染的 */
  dataSource: DataSource;

  /** 重新请求数据的方法 */
  refresh?: () => void;
}

export const { Provider, useStore: useChart } =
  createContext<StoreApi<IStore>>();

export const createStore = () =>
  create<IStore>(setChart => ({
    setChart,
    loading: false,
    dataSource: { meta: [], data: [] },
  }));
