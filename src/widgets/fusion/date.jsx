/**
 * Updated by fateriddle on 2019-12-12.
 * 日期组件
 */

import { DatePicker, TimePicker } from '@alifd/next';
import moment from 'moment';
import dateHoc from '../../components/dateHoc';
import { getFormat } from '../../base/utils';

export default function date(p) {
  const { format = 'dateTime' } = p.schema;
  const dateFormat = getFormat(format);
  const onChange = value => {
    let timeValue = value ? moment(value).format(dateFormat) : '';
    p.onChange(p.name, timeValue);
  };
  const DateComponent = format === 'time' ? TimePicker : DatePicker;
  return dateHoc(p, onChange, DateComponent);
}
