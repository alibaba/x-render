/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */

import { DatePicker, TimePicker } from 'antd';
import RangeHoc from '../../components/rangeHoc';

const { RangePicker: DateRange } = DatePicker;
const { RangePicker: TimeRange } = TimePicker;

export default function dateRange(p) {
  const { format = 'dateTime' } = p.schema;
  const onChange = (value, string) => p.onChange(p.name, string);
  const RangeComponent = format === 'time' ? TimeRange : DateRange;
  const hocProps = { ...p, onChange, RangeComponent };
  return <RangeHoc {...hocProps} />;
}
