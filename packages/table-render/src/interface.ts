import { TableProps } from "antd";

export interface TableContext {
  tableState?: TableState
  setTable?: (state: Partial<TableState>) => void;
  doSearch?: (params: {
    current?: number;
    tab?: number | string;
    pageSize?: number;
    sorter?: any;
  },
    customSearch?: any) => Promise<void>;
  refresh?: (params?: { stay: boolean, tab: number | string }, search?: any) => Promise<void>;
  changeTab?: (tab: number | string) => Promise<void>;
}

export interface TableState {
  loading: boolean,
  api: SearchApi | Array<SearchApi>,
  tab: number,
  dataSource: Array<any>,
  extraData: any,
  extraParams: Record<string, any>,
  pagination: {
    current: number,
    pageSize: number,
    total: number,
  },
  tableSize: TableProps<any>['size'],
  sorter: any,
}

export type SearchApi = (params: Record<string, any> & {
  current: number,
  pageSize: number,
  tab?: number,
}, sorter?: any) => {
  rows: Array<any>,
  total: number,
  pageSize?: number,
}