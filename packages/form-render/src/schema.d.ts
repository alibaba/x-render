import { RuleItem } from 'async-validator';

interface SchemaBase {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'range' | 'html';
  title: string;
  description: string;
  descType: 'text' | 'icon';
  format:
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
  default: any;
  /** 是否必填，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  required: boolean | string;
  placeholder: string | string[];
  bind: false | string | string[];
  dependencies: string[];
  min: number;
  max: number;
  /** 是否禁用，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  disabled: boolean | string;
  /** 是否只读，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  readOnly: boolean | string;
  /** 是否隐藏，隐藏的字段不会在 formData 里透出，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  hidden: boolean | string;
  displayType: 'row' | 'column';
  colon?: boolean;
  labelAlign?: 'right' | 'left';
  width: string;
  labelWidth: number | string;
  column: number;
  className: string;
  widget: string;
  readOnlyWidget: string;
  extra: string;
  properties: Record<string, Schema>;
  items: Schema;
  enum: Array<string | number>;
  enumNames: Array<string | number>;
  rules: RuleItem | RuleItem[];
  props: Record<string, any>;
}

type Schema = Partial<SchemaBase>;

export = Schema;

export as namespace ISchema;
