import { TableProps } from "antd";

export interface TableContext<RecordType> {
  tableState?: TableState<RecordType>
  setTable?: (state: Partial<TableState<RecordType>>) => void;
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

export interface TableState<RecordType> {
  loading: boolean,
  api: SearchApi<RecordType> | Array<SearchApi<RecordType>>,
  tab: number,
  dataSource: Array<RecordType>,
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

export type SearchApi<RecordType> = (params: Record<string, any> & {
  current: number,
  pageSize: number,
  tab?: number,
}, sorter?: any) => Promise<{
  rows: Array<RecordType>,
  total: number,
  pageSize?: number,
}>