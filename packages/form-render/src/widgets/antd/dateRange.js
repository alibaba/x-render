/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';

const { RangePicker: DateRange } = DatePicker;
const { RangePicker: TimeRange } = TimePicker;

export default function dateRange(p) {
  const { format = 'dateTime' } = p && p.schema;
  const onChange = (value, string) => p.onChange(string);
  const RangeComponent = format === 'time' ? TimeRange : DateRange;
  const hocProps = { ...p, onChange, RangeComponent };
  return <RangeHoc {...hocProps} />;
}

const RangeHoc = ({
  onChange,
  RangeComponent,
  value,
  schema = {},
  options,
  disabled,
  readOnly,
}) => {
  let { format = 'dateTime' } = schema;
  if (options && options.format) {
    format = options.format;
  }
  const dateFormat = getFormat(format);
  let [start, end] = Array.isArray(value) ? value : [];

  // week的时候会返回 2020-31周 quarter会返回 2020-Q2 需要处理之后才能被 moment
  if (typeof start === 'string' && typeof end === 'string') {
    if (format === 'week') {
      start = start.substring(0, start.length - 1);
      end = end.substring(0, end.length - 1);
    }
    if (format === 'quarter') {
      start = start.replace('Q', '');
      end = end.replace('Q', '');
    }
  }

  const _value =
    start && end ? [moment(start, dateFormat), moment(end, dateFormat)] : [];

  const dateParams = {
    ...options,
    value: _value,
    style: { width: '100%' },
    showTime: format === 'dateTime',
    disabled: disabled || readOnly,
    onChange,
  };

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return <RangeComponent {...dateParams} />;
};
