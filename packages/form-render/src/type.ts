import { RuleItem } from 'async-validator';
import * as React from 'react';
import type { FormInstance as AntdFormInstance, FormProps as AntdFormProps, ColProps, TooltipProps } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';

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

export type ActionProps = {
  submit: {
    text: string;
    hide: boolean;
    [key: string]: any;
  },
  reset: {
    text: string;
    hide: boolean;
    [key: string]: any;
  }
}

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
  labelCol?: number | ColProps;
  fieldCol?: number | ColProps
  tooltip?: string | TooltipProps
  cellSpan?: number;
  span?: number;
  validateTrigger?: string | string[]
  [key: string]: any;
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
  /* 列表表单操作按钮样式 */
  btnType: 'text' | 'icon';
  /* 是否隐藏移动按钮 */
  hideMove: boolean;
}

export interface GlobalConfig {
  /* 列表表单配置 */
  listOperate: ListOperate;
  /** 列表校验气泡模式*/
  listValidatePopover: boolean;
  /* 是否禁用表达式 */
  mustacheDisabled: boolean;
}

export interface FormInstance {
  /*
   * 提交表单
   */
  submit: () => void,
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
   * 获取表单的 schema
   */
  getSchema: () => any;
  /**
   * 
   * 获取 flatten schema
   */
  getFlattenSchema: (path?: string) => any;
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
   * 校验表单
   */
  validateFields: AntdFormInstance['validateFields'];
  /**
   * 获取对应字段 field 的错误信息
   */
  getFieldError: AntdFormInstance['getFieldError'];
  /**
   * 获取一组字段 fields 的错误信息
   */
  getFieldsError: AntdFormInstance['getFieldsError'];
  /**
   * 检查某个表单项是否被修改过
   */
  isFieldTouched: AntdFormInstance['isFieldTouched'];
  /**
   * 检查一组表单项是否被修改过
   */
  isFieldsTouched: AntdFormInstance['isFieldsTouched'];
  /**
   * 检查某个表单项是否在校验中
   */
  isFieldValidating: AntdFormInstance['isFieldValidating'];
    /**
   * 根据路径获取表单值
   */
  getValueByPath: AntdFormInstance['getFieldValue'];
  /**
   * 根据路径修改表单值
   */
  setValueByPath: AntdFormInstance['setFieldValue'];
  /**
   * 获取表单值
   */
  getValues: AntdFormInstance['getFieldsValue'];
  /**
   * 设置表单值
   */
  setValues: AntdFormInstance['setFieldsValue'];
  /**
   * 重置表单
   */
  resetFields: AntdFormInstance['resetFields'];
  /**
   * @deprecated 即将弃用，请勿使用此 api，使用 getFieldsError
   */
  errorFields: AntdFormInstance['getFieldsError'];
  /**
   * @deprecated 即将弃用，请勿使用此 api，使用 form.isFieldsValidating
   */
  scrollToPath: AntdFormInstance['scrollToField'];
  /**
 * @deprecated 即将弃用，请勿使用此 api，使用setValueByPath
 */
  onItemChange: AntdFormInstance['setFieldValue'];
  /**
   * @deprecated 即将弃用，请勿使用此 api
   */
  init: any;
  /**
   * @deprecated 即将弃用，请勿使用此 api，使用 getSchema 代替
   */
  __schema: any;
  /**
   * @deprecated 内部方法不要使用
   */
  __initStore: (data: any) => any;
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

export interface FRProps extends Omit<AntdFormProps, 'form'> {
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
   * 组件和schema的映射规则
   */
  mapping?: Record<string, string>;
  /**
   * 自定义组件
   */
  widgets?: Record<string, any>;
  /**
   * 标签元素和输入元素的排列方式，column-分两行展示，row-同行展示，inline-自然顺排，默认`column`
   */
  displayType?: 'column' | 'row' | 'inline';
  /**
   * 表示是否显示 label 后面的冒号
   */
  colon?: boolean;
  /**
   * label 标签的文本对齐方式
   */
  labelAlign?: 'right' | 'left';
  /**
   *  只读模式
   */
  readOnly?: boolean;
  /**
   * 禁用模式
   */
  disabled?: boolean;
  /**
   * 标签宽度
   */
  labelWidth?: string | number;
  /**
   * antd的全局config
   */
  configProvider?: ConfigProviderProps;
  /**
   * 覆盖默认的校验信息
   */
  validateMessages?: ConfigProviderProps['form']['validateMessages'];
  /**
   * 显示当前表单内部状态
   */
  debug?: boolean;
  /**
   * 显示css布局提示线
   */
  debugCss?: boolean;
  /**
   * 展示语言，目前只支持中文、英文
   */
  locale?: 'zh-CN' | 'en-US';
  /**
   * 一行展示的列数
   */
  column?: number;
  /**
   * 数据会作为 beforeFinish 的第四个参数传入
   */
  config?: any;
  /**
   * 类似于 vuejs 的 watch 的用法，监控值的变化，触发 callback
   */
  watch?: WatchProperties;
  /*
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
   * 配置自定义layout组件
   */
  layoutWidgets?: any;
  /**
   * 扩展方法
   */
  methods?: Record<string, Function>;
  operateExtra?: React.ReactNode;
  maxWidth?: number | string;
  footer?: boolean | (() => React.ReactNode) | Partial<ActionProps> ;
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
  onReset?: (form: any) => void;
  widgets?: any;
  form?: any;
  [key:string]: any
}

/** 自定义组件 props */
export type WidgetProps = {
  value: any,
  onChange: (value: any) => void,
  schema: Schema,
  style: React.CSSProperties,
  id: string,
  addons: WidgetAddonsType,
  disabled?: boolean,
  readOnly?: boolean,
  [other: string]: any,
}

/** 自定义组件 addons */
export type WidgetAddonsType = FormInstance & {
  globalProps: Record<string, any>,
  dependValues: any[],
  dataIndex: string[],
  dataPath: string,
  schemaPath: string,
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
