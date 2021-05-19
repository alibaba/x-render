import * as React from 'react';

export interface Transformer {
  /** 正向的转换函数 */
  from: (schema: any) => any;
  /** 反向的转换函数 */
  to: (schema: any) => any;
}

export interface ExtraButton {
  /** 按钮文案 */
  text: string;
  /** 点击回调 */
  onClick?: () => void;
  [key: string]: any;
}

export interface ControlButton {
  /** 按钮文案 */
  text?: string;
  /** 点击回调 */
  onClick?: () => void;
}

export interface SettingWidget {
  /** 按钮生成的 schema 的 key 值 */
  name: string;
  /** 在左侧栏按钮展示文案 */
  text: string;
  /** 如果是基本组件，这个字段注明它对应的 widgets */
  widget?: string;
  /** 组件对应的 schema 片段 */
  schema?: any;
  /** 组件的配置信息，使用 form-render 的 schema 来描述 */
  setting?: any;
}

export interface Setting {
  /** 最外层的分组名称 */
  title: string;
  /** 每个组件的配置，在左侧栏是一个按钮 */
  widgets: SettingWidget[];
  show?: boolean;
  useCommon?: boolean;
}

export interface FRGeneratorProps {
  /** 隐藏组件 ID */
  hideId?: boolean;
  /** 默认一进入编辑器展示的表单对应的 schema */
  defaultValue?: any;
  /** 自定义 schema 到 form-render 的 schema 的双向转换函数 */
  transformer?: Transformer;
  /** 编辑区顶部的自定义按钮 */
  extraButtons?: (ExtraButton | boolean)[];
  /** 选中项操作按钮 */
  controlButtons?: (ControlButton | boolean | Function)[];
  /** 左右侧栏配置 */
  settings?: Setting[];
  /** 通用配置 */
  commonSettings?: any;
  /** 全局配置 */
  globalSettings?: any;
  /** 自定义组件 */
  widgets?: any;
  /** 组件和 schema 的映射规则 */
  mapping?: any;
  /** 表单 data 变化回调 */
  onChange?: (data: any) => void;
  /** 表单 schema 变化回调 */
  onSchemaChange?: (schema: any) => void;
}

declare const FRGenerator: React.ForwardRefExoticComponent<FRGeneratorProps &
  React.RefAttributes<unknown>>;

declare const defaultSettings: Setting;
declare const defaultCommonSettings: any;
declare const defaultGlobalSettings: any;

declare const fromFormily: (schema: any) => any;
declare const toFormily: (schema: any) => any;
declare const fromFormRender: (schema: any) => any;
declare const toFormRender: (schema: any) => any;

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
  fromFormily,
  toFormily,
  fromFormRender,
  toFormRender,
};
export default FRGenerator;
