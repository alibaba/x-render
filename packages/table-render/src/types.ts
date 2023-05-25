import { TableProps } from 'antd';
import type { TableColumnType } from 'antd';
import { FRProps, FormInstance } from 'form-render';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { TableRenderStoreType } from './core/store';

export type ColumnsSettingValueType = Array<{
  /** 列的 key */
  key: string,
  /** 当前列是否隐藏 */
  hidden: boolean,
  /** 当前列是否固定 */
  fixed?: 'right' | 'left'
}>

export type ToolbarActionConfig = {
  /** 开启的功能，默认 all，全部开启 */
  enabled?: Array<'refresh' | 'columnsSetting' | 'fullScreen' | 'density'>,
  /** 列设置的状态 */
  columnsSettingValue?: ColumnsSettingValueType
  /** 列设置状态改变时的回调 */
  onColumnsSettingChange?: (val: ColumnsSettingValueType) => void;
}
export type DoSearchType = (
  params: {
    current?: number;
    tab?: number | string;
    pageSize?: number;
    sorter?: any;
  },
  customSearch?: any
) => Promise<void>

export type RefreshType = (
  params?: { stay?: boolean; tab?: number | string },
  search?: any
) => Promise<void>

export type ChangeTabType = (tab: number | string) => Promise<void>;

export interface TableContext {
  doSearch: DoSearchType,
  refresh: RefreshType,
  changeTab: ChangeTabType,
  form: FormInstance,
  getState: () => TableRenderStoreType & { search: Record<string, any> },
}

export type ProColumnsType<T extends object = any> = Array<
  TableColumnType<T> & {
    dataIndex?: string;
    /** 是否支持复制 */
    copyable?: boolean;
    /** 值的类型 */
    valueType?: 'text' | 'money' | 'date' | 'dateTime' | 'code' | 'tag' | 'tags' | 'progress' | 'dateRange' | 'dateTimeRange' | 'image';
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
export interface SearchProps<RecordType> extends Omit<FRProps, 'form'> {
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
    clearSearch: Function,
    other: any
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
  /** 
   * 显示在表格主体右上方的 Icon 列表，内置了刷新、调整密度、全屏显示 等功能
   * 
   * 可以通过传入一个对象进行更具体的配置
   */
  toolbarAction?: boolean | Pick<ToolbarActionConfig, 'enabled'>;
  /** 切换分页时是否需要请求接口 */
  pageChangeWithRequest?: boolean;
  onTabChange?: () => any;
  search?: SearchProps<RecordType>;
  locale?: 'zh-CN' | 'en-US';
  /**
   * antd的全局config
   */
  configProvider?: ConfigProviderProps;
  /**
   * 自定义渲染表格
   */
  tableWrapper?: (tableNode: React.ReactNode) => React.ReactNode;
  request?: ApiType<RecordType>;
  // 自动请求
  autoRequest?: boolean;
}
