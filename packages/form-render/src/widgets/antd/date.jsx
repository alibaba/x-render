/**
 * Updated by fateriddle on 2019-12-12.
 * 日期组件
 */

import { DatePicker, TimePicker } from 'antd';
import dateHoc from '../../components/dateHoc';

export default function date(p) {
  const { format = 'dateTime' } = p.schema;
  const onChange = (value, string) => p.onChange(p.name, string);
  const DateComponent = format === 'time' ? TimePicker : DatePicker;
  return dateHoc(p, onChange, DateComponent);
}
