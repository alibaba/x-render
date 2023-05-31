import { RuleItem } from 'async-validator';
import * as React from 'react';
import type { FormProps as AntdFormProps } from 'antd-mobile';
import type { ConfigProviderProps } from 'antd/es/config-provider';

type AntdFormInstance = Exclude<AntdFormProps['form'], undefined>

export type { RuleItem } from 'async-validator';
export type SchemaType =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | 'block'
  | string;

export interface SchemaBase {
  type?: SchemaType;
  title?: string;
  description?: string;
  descType?: 'text' | 'icon';
  format?:
  | 'image'
  | 'textarea'
  | 'color'
  | 'email'
  | 'url'
  | 'dateTime'
  | 'date'
  | 'time'
  | 'upload'
  | (string & {});
  default?: any;
  /** 是否必填，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  required?: boolean | string;
  placeholder?: string;
  bind?: false | string | string[];
  dependencies?: string[];
  /** 最小值，支持表达式 */
  min?: number | string;
  /** 最大值，支持表达式 */
  max?: number | string;
  /** 是否禁用，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  disabled?: boolean | string;
  /** 是否只读，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  readOnly?: boolean | string;
  /** 是否隐藏，隐藏的字段不会在 formData 里透出，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  hidden?: boolean | string;
  displayType?: 'row' | 'column' | string;
  width?: string | number;
  labelWidth?: number | string;
  maxWidth?: number | string;
  column?: number;
  className?: string;
  widget?: string;
  readOnlyWidget?: string;
  extra?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  /** 多选，支持表达式 */
  enum?: Array<string | number> | string;
  /** 多选label，支持表达式 */
  enumNames?: Array<string | number> | string;
  rules?: RuleItem | RuleItem[];
  props?: Record<string, any>;
  /**扩展字段 */
  'add-widget'?: string;
}

export type Schema = Partial<SchemaBase>;

export interface Error {
  /** 错误的数据路径 */
  name: string;
  /** 错误的内容 */
  error: string[];
}

export interface FormParams {
  formData?: any;
  onChange?: (data: any) => void;
  onValidate?: (valid: any) => void;
  showValidate?: boolean;
  /** 数据分析接口，表单展示完成渲染时触发 */
  logOnMount?: (stats: any) => void;
  /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
  logOnSubmit?: (stats: any) => void;
}

export interface ValidateParams {
  formData: any;
  schema: Schema;
  error: Error[];

  [k: string]: any;
}

export interface ResetParams {
  formData?: any;
  submitData?: any;
  errorFields?: Error[];
  touchedKeys?: any[];
  allTouched?: boolean;

  [k: string]: any;
}

export interface FieldParams {
  name: string;
  error?: string[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
}

export interface ListOperate {
  btnType: 'text' | 'icon';
  hideMove: boolean;
}

export interface GlobalConfig {
  listOperate: ListOperate
}

export interface FormInstance extends AntdFormInstance {
  init: any;
  __schema: any;
  __initStore: (data: any) => any;
  setSchemaByFullPath: (path: string, schema: any) => any;
  /**
   *  根据路径动态设置 Schema
   */
  setSchemaByPath: (path: string, schema: any) => any;
  /**
   * 获取隐藏的表单数据
   */
  getHiddenValues: () => any;
  /**
   *  设置 Schema
   */
  setSchema: (schema: any, cover?: boolean) => void;
  /** 
   * 根据路径获取 Schema
   */
  getSchemaByPath: (path: string) => any;
  /**
   * 外部手动修改 errorFields 校验信息
   */
  setErrorFields: (errors: any[]) => void;
  /**
   * 外部手动删除某一个 path 下所有的校验信息
   */
  removeErrorField: (path: string) => any;
  /** 
   * 根据路径修改表单值
   */
  setValueByPath: FormInstance['setFieldValue'];
  /** 
   * 获取表单值
   */
  getValues: FormInstance['getFieldsValue'];
  /**
   * 表单校验错误的数组
   */
  errorFields: FormInstance['getFieldsError'];
  /** 
   * 设置表单值
   */
  setValues: FormInstance['setFieldsValue'];
  /**
   * 获取表单 schema
   */
  getSchema: () => any;
  /**
   * 存储 field 的 ref 对象
   */
  setFieldRef: (path: string, ref: any) => void;
  /**
   * 获取 field 的 ref 对象
   */
  getFieldRef: (path: string) => any;
}

export type WatchProperties = {
  [path: string]:
  | {
    handler: (value: any) => void;
    immediate?: boolean;
  }
  | ((value: any) => void);
};

export interface FRProps extends AntdFormProps {
  /** 
   * 表单顶层的className
   */
  className?: string;
  /** 
   * 表单顶层的样式
   */
  style?: React.CSSProperties;
  /** 
   * 表单 schema
   */
  schema: Schema;
  /** 
   * form单例
   */
  form: FormInstance;
  /** 
   * 自定义组件
   */
  widgets?: Record<string, any>;
  /** 
   * 标签元素和输入元素的排列方式，column-分两行展示，row-同行展示，inline-自然顺排，默认`column`
   */
  displayType?: 'column' | 'row';
  /**
   *  只读模式
   */
  readOnly?: boolean;
  /** 
   * 禁用模式
   */
  disabled?: boolean;
  /** 
   * antd的全局config
   */
  configProvider?: ConfigProviderProps;
  /** 
   * 覆盖默认的校验信息
   */
  validateMessages?: ConfigProviderProps['form']['validateMessages'];
  /**
   * 展示语言，目前只支持中文、英文
   */
  locale?: 'zh-CN' | 'en-US';
  /**
   * 数据会作为 beforeFinish 的第四个参数传入
   */
  config?: any;
  /**
   * 类似于 vuejs 的 watch 的用法，监控值的变化，触发 callback
   */
  watch?: WatchProperties;
  /** 
  * 表单全局配置
  */
  globalConfig?: GlobalConfig;
  /** 
   * 表单的全局共享属性
   */
  globalProps?: any;
  /** 
   * 表单首次加载钩子
   */
  onMount?: () => void;
  /** 
   * 表单提交前钩子
   */
  beforeFinish?: (params: ValidateParams) => Error[] | Promise<Error[]>;
  /** 
   * 表单提交后钩子
   */
  onFinish?: (formData: any) => void;
  /** 
   * 字段值更新时触发回调事件
   */
  onValuesChange?: (
    changedValues: {
      dataPath: string;
      value: any;
      dataIndex: number[] | unknown;
    },
    formData: any
  ) => void;
  /** 
   * 隐藏的数据是否去掉，默认不去掉
   */
  removeHiddenData?: boolean;
  /** 
   * 扩展方法
   */
  methods?: Record<string, Function>;
}

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


declare const FR: React.FC<FRProps>;

export declare function useForm(params?: FormParams): FormInstance;

export type ConnectedForm<T> = T & {
  form: FormInstance;
};

export declare function connectForm<T extends {} = any>(
  component: React.ComponentType<ConnectedForm<T>>
): React.ComponentType<T>;

export default FR;
