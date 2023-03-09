import { TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FRProps } from 'form-render';
import type { ConfigProviderProps } from 'antd/es/config-provider';


export interface TableContext<RecordType> {
  tableState?: TableState<RecordType>;
  setTable?: (state: Partial<TableState<RecordType>>) => void;
  doSearch?: (
    params: {
      current?: number;
      tab?: number | string;
      pageSize?: number;
      sorter?: any;
    },
    customSearch?: any
  ) => Promise<void>;
  refresh?: (
    params?: { stay: boolean; tab: number | string },
    search?: any
  ) => Promise<void>;
  form?: any; // TODO这里应该去引FR的类型
  changeTab?: (tab: number | string) => Promise<void>;
}

export type ProColumnsType<T extends object = any> = Array<
  ColumnsType<T>[number] & {
    /** 是否支持复制 */
    copyable?: boolean;
    /** 值的类型 */
    valueType?: 'text' | 'money' | 'date' | 'dateTime' | 'code';
    /** 当前列值的枚举 */
    enum?: Record<string, string>;
  }
>;

export interface TableState<RecordType> {
  loading: boolean;
  api: ApiType<RecordType>;
  tab: number;
  dataSource: Array<RecordType>;
  extraData: any;
  extraParams: Record<string, any>;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  tableSize: TableProps<any>['size'];
  sorter: any;
}

// TODO这里FR的props应该去FR里写，这里继承就好了
export interface SearchProps<RecordType> extends Omit<FRProps, 'form' | 'schema'> {
  debug?: boolean;
  searchBtnStyle?: React.CSSProperties;
  searchBtnClassName?: string;
  displayType?: any;
  propsSchema?: any;
  className?: string;
  style?: React.CSSProperties;
  hidden?: boolean;
  searchOnMount?: boolean | unknown;
  searchWithError?: boolean;
  searchBtnRender?: (
    submit: Function,
    clearSearch: Function
  ) => React.ReactNode[];
  searchText?: string;
  resetText?: string;
  onSearch?: (search: any) => any;
  afterSearch?: (params: any) => any;
  widgets?: any;
  form?: any;
  [key: string]: any
}

type ApiType<RecordType> =
  | SearchApi<RecordType>
  | Array<{ api: SearchApi<RecordType>; name: string }>;

export type SearchApi<RecordType> = (
  params: Record<string, any> & {
    current: number;
    pageSize: number;
    tab?: number;
  },
  sorter?: any
) => Promise<{

  /**
   * @deprecated 即将弃用，请使用 data 返回
   */
  rows?: Array<RecordType>;
  data: Array<RecordType>;
  total: number;
  pageSize?: number;
}>;

export interface TablePropsC<RecordType extends Object = any>
  extends Omit<TableProps<RecordType>, 'columns' | 'dataSource' | 'title'> {
  /** 列定义，除了支持antd的所有配置，还额外增加一些语法糖 */
  columns: ProColumnsType<RecordType>;
  /** title */
  title?: string | React.ReactNode;
}

export interface TableRenderProps<RecordType extends Object = any>
  extends Omit<TablePropsC<RecordType>, 'locale'> {
  /** 
   * 开启 debug 模式，时时显示内部状态 
  */
  debug?: boolean;
  /** 表格主体右上方的控件，例如“添加”按钮 */
  toolbarRender?: React.ReactNode;
  /** 显示在表格主体右上方的 Icon 列表，内置了刷新、调整密度、全屏显示 等功能 */
  toolbarAction?: boolean;
  /** 切换分页时是否需要请求接口 */
  pageChangeWithRequest?: boolean;
  onTabChange?: () => any;
  search?: SearchProps<RecordType>;
  locale?: 'zh-CN' | 'en-US';
  /** 
   * antd的全局config
   */
  configProvider?: ConfigProviderProps;
  request?: ApiType<RecordType>;
}