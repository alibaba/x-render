import React from 'react';
import { getFormat } from '../utils';
import dayjs from 'dayjs';

interface IProps {
  value: any;
  options: any[];
  schema: any;
}

// 首字母转大写
const strToUpperCase = (str: string) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const findLabels = (value: any[], options: any[]) => {
  if (!isValidateArray(value) || !isValidateArray(options)) return [];

  return value.map(v => options.find(o => o.value === v)?.label);
};

const flatCascaderOptions = (options: any[]) => {
  const result = [];

  const walk = (list: any[]) => {
    list.forEach(i => {
      result.push(i);
      if (isValidateArray(i.children)) {
        walk(i.children);
      }
    });
  };

  walk(options);
  return result;
};

const isValidateArray = (list: unknown) =>
  Array.isArray(list) && list.length > 0;

export default (props: IProps & Record<string, any>) => {
  const { value, options, schema = {} } = props;
  let __html: string;

  switch (strToUpperCase(schema.widget)) {
    case 'Input':
    case 'TextArea':
    case 'Rate':
    case 'Stepper':
      __html = value;
      break;
    case 'Slider':
      if (isValidateArray(value)) {
        __html = value.join('-');
      } else {
        __html = value;
      }
      break;
    case 'Selector':
      if (isValidateArray(value)) {
        __html = findLabels(value, options).join('，');
      }
      break;
    case 'Switch':
      const { uncheckedText = '否', checkedText = '是' } = props;
      __html = value ? checkedText : uncheckedText;
      break;
    case 'Radio':
      __html = options.find(o => o.value === value)?.label;
      break;
    case 'DatePicker':
      const { format, precision } = props;
      if (!value) return '-';
      const dateFormat = format || getFormat(precision);
      __html = dayjs(value).format(dateFormat);
      break;
    case 'Cascader':
      const flatOptions = flatCascaderOptions(options);
      __html = findLabels(value, flatOptions).join('-') || '-';
      break;
    case 'Picker': {
      const { columns, options } = props;
      if (options && options.length) {
        __html = findLabels(value, options).join('-') || '-';
      } else {
        const labels = value?.map((i: string, index: number) => {
          return columns[index].find((j: any) => j.value === i)?.label;
        });
        __html = labels ? labels.join('-') : '-';
      }
      break;
    }
    default:
      __html = '-';
  }

  __html ??= '-';

  return <div dangerouslySetInnerHTML={{ __html }} />;
};
