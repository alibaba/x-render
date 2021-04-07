import * as React from 'react';

export interface FormInstance {
  /** 正向的转换函数 */
  from: (schema: any) => any;
  /** 反向的转换函数 */
  to: (schema: any) => any;
  /** 表单 data 变化回调 */
  onChange?: (data: any) => void;
}

export interface ResultType {
  /** 表单数据 */
  formData: any;
  /** 报错数组 */
  errorFields: Error[];
}

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
}

export interface FormInstance {
  formData: any;
  schema: any;
  touchedKeys: string[];
  touchKey: (key: string) => void;
  onItemChange: (path: string, value: any) => void;
  setValues: (formData: any) => void;
  getValues: () => void;
  resetFields: () => void;
  submit: () => void;
  submitData: any;
  errorFields: Error[];
  isValidating: boolean;
  outsideValidating: boolean;
  isSubmitting: boolean;
  endValidating: () => void;
  endSubmitting: () => void;
  setErrorFields: (error: Error[]) => void;
  isEditing: boolean;
  setEditing: (status: boolean) => void;
  syncStuff: (any) => void;
}

export interface FRProps {
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
  /** antd的全局config */
  configProvider?: any;
  theme?: any;
  flatten?: any;
  debug?: boolean;
  locale?: string;
  column?: number;
  debounceInput?: boolean;
  size?: string;
  /** 表单提交前钩子 */
  beforeFinish?: (result: ResultType) => void;
  /** 表单提交后钩子 */
  onFinish: (result: ResultType) => void;
}

declare const FR: React.FC<FRProps>;

export declare function useForm(params?: FormParams): FormInstance;

export default FR;
