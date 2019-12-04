import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

export default function date(p) {
  const { format = 'dateTime' } = p.schema;
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    default:
      // dateTime
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
  }
  let defaultObj = {};
  if (p.value) {
    defaultObj = {
      value: moment(p.value, dateFormat),
    };
  }

  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const onTimeChange = (time, timeString) => p.onChange(p.name, timeString);
  const onDateChange = (value, dateString) => p.onChange(p.name, dateString);

  return format === 'time' ? (
    <TimePicker
      {...p.options}
      disabled={p.disabled}
      style={{ width: '100%' }}
      {...defaultObj}
      onChange={onTimeChange}
    />
  ) : (
    <DatePicker
      {...placeholderObj}
      showTime={format === 'dateTime'}
      style={{ width: '100%' }}
      {...defaultObj}
      format={dateFormat}
      {...p.options}
      disabled={p.disabled}
      onChange={onDateChange}
    />
  );
}
