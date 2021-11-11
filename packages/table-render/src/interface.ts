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
  api: ApiType<RecordType>,
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

export interface SearchProps<RecordType> {
  debug?: boolean;
  searchBtnStyle?: React.CSSProperties;
  searchBtnClassName?: string;
  api?: ApiType<RecordType>;
  displayType?: any;
  propsSchema?: any;
  className?: string;
  style?: React.CSSProperties;
  schema?: any;
  hidden?: boolean;
  searchOnMount?: boolean | unknown;
  searchBtnRender?: (
    submit: Function,
    clearSearch: Function
  ) => React.ReactNode[];
  onSearch?: (search: any) => any;
  afterSearch?: (params: any) => any;
  widgets?: any;
}

type ApiType<RecordType> = SearchApi<RecordType> | Array<{ api: SearchApi<RecordType>, name: string }>

export type SearchApi<RecordType> = (params: Record<string, any> & {
  current: number,
  pageSize: number,
  tab?: number,
}, sorter?: any) => Promise<{
  rows: Array<RecordType>,
  total: number,
  pageSize?: number,
}>