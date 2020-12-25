/**
 * Updated by fateriddle on 2019-12-12.
 * 日期组件
 */

import { DatePicker, TimePicker } from '@alifd/next';
import moment from 'moment';
import dateHoc from '../../components/dateHoc';
import { getFormat } from '../../base/utils';
const { MonthPicker, YearPicker, WeekPicker } = DatePicker;

export default function date(p) {
  let { format = 'dateTime' } = p.schema;
  if (p.options.format) {
    format = p.options.format;
  }
  const dateFormat = getFormat(format);
  const { picker } = p.options;
  const onChange = value => {
    let timeValue = value ? moment(value).format(dateFormat) : '';
    p.onChange(p.name, timeValue);
  };

  let DateComponent = DatePicker;
  if (format === 'time') {
    DateComponent = TimePicker;
  } else {
    switch (picker) {
      case 'month':
        DateComponent = MonthPicker;
        break;
      case 'week':
        DateComponent = WeekPicker;
        break;
      case 'year':
        DateComponent = YearPicker;
        break;
      default:
        DateComponent = DatePicker;
        break;
    }
  }

  return dateHoc(p, onChange, DateComponent);
}
