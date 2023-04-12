import React from 'react';
import { getWidgetName } from '../../models/mapping';
import { getFormat } from '../utils';
import dayjs from 'dayjs';

interface IProps {
  value: any
  options: any[],
  schema: any
}

const findLabels = (value: any[], options: any[]) => {
  return value.map(v => options.find(o => o.value === v)?.label);
}

const isValidateArray = (list: unknown) => Array.isArray(list) && list.length > 0;

export default (props: IProps & Record<string, any>) => {
  const { value, options, schema = {} } = props;
  let __html: string;
  
  const widgetName = getWidgetName(schema);

  switch(widgetName) {
    case 'Input':
    case 'TextArea':
    case 'Rate':
    case 'Stepper':
      __html = value;
      break;
    case 'Slider':
      if (isValidateArray(value)) {
        __html = value.join('-')
      } else {
        __html = value;
      }
      break;
    case 'Selector':
      if (isValidateArray(value)) {
        __html = findLabels(value, options).join('，')
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
      const dateFormat = format || getFormat(precision);
      __html = dayjs(value).format(dateFormat);
      break;
    default:
      __html = '-'
  }

  __html ??= '-'

  return <div dangerouslySetInnerHTML={{ __html }} />;
}
