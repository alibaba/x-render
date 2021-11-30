import * as React from 'react';
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
  schema: any;
  error: Error[];
  [k: string]: any;
}
export interface FormInstance {
  formData: any;
  schema: any;
  flatten: any;
  touchedKeys: string[];
  touchKey: (key: string) => void;
  onItemChange: (path: string, value: any) => void;
  setValueByPath: (path: string, value: any) => void;
  getSchemaByPath: (path: string) => object;
  setSchemaByPath: (path: string, value: any) => void;
  setSchema: (settings: any) => void;
  setValues: (formData: any) => void;
  getValues: () => any;
  resetFields: () => void;
  submit: () => Promise<void> | Promise<any[]>;
  submitData: any;
  errorFields: Error[];
  isValidating: boolean;
  outsideValidating: boolean;
  isSubmitting: boolean;
  endValidating: () => void;
  endSubmitting: () => void;
  setErrorFields: (error: Error[]) => void;
  removeErrorField: (path: string) => void;
  removeTouched: (path: string) => void;
  changeTouchedKeys: (pathArray: string[]) => void;
  isEditing: boolean;
  setEditing: (status: boolean) => void;
  syncStuff: (args: any) => void;
  /** 折中升级方案中使用到，正常用不到 */
  init: () => void;
  /** 数据分析接口，表单展示完成渲染时触发 */
  logOnMount: (args: any) => void;
  /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
  logOnSubmit: (args: any) => void;
  _setErrors: (args: any) => void;
}

export type WatchProperties = {
  [path: string]:
    | {
        handler: (value: any) => void;
        immediate?: boolean;
      }
    | ((value: any) => void);
};

export interface FRProps {
  /** 表单 id */
  id?: string | number;
  /** 表单顶层的className */
  className?: string;
  /** 表单顶层的样式 */
  style?: any;
  /** 表单 schema */
  schema: any;
  /** form单例 */
  form: FormInstance;
  /** 组件和schema的映射规则 */
  mapping?: any;
  /** 自定义组件 */
  widgets?: any;
  /** 表单提交前钩子 */
  displayType?: string;
  /** 只读模式 */
  readOnly?: boolean;
  /** 禁用模式 */
  disabled?: boolean;
  /** 标签宽度 */
  labelWidth?: string | number;
  /** antd的全局config */
  configProvider?: any;
  theme?: string | number;
  /** 覆盖默认的校验信息 */
  validateMessages?: any;
  /** 显示当前表单内部状态 */
  debug?: boolean;
  /** 显示css布局提示线 */
  debugCss?: boolean;
  locale?: string;
  column?: number;
  debounceInput?: boolean;
  size?: string;
  // 数据会作为 beforeFinish 的第四个参数传入
  config?: any;
  // 类似于 vuejs 的 watch 的用法，监控值的变化，触发 callback
  watch?: WatchProperties;
  /** 对象组件是否折叠（全局的控制） */
  allCollapsed?: boolean;
  /** 表单的全局共享属性 */
  globalProps?: any;
  /** 表单首次加载钩子 */
  onMount?: () => void;
  /** 表单提交前钩子 */
  beforeFinish?: (params: ValidateParams) => Error[] | Promise<Error[]>;
  /** 表单提交后钩子 */
  onFinish?: (formData: any, error: Error[]) => void;
  /** 时时与外部更新同步的钩子 */
  onValuesChange?: (changedValues: any, formData: any) => void;
  /** 隐藏的数据是否去掉，默认不去掉（false） */
  removeHiddenData?: boolean;
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
