import React from 'react';
import { DatePicker, TimePicker } from '@alifd/next';
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
      defaultValue: moment(p.value, dateFormat),
    };
  }

  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const onChange = value => {
    p.onChange(p.name, moment(value || '', dateFormat).format(dateFormat));
  };

  if (format === 'time') {
    return (
      <TimePicker
        style={{ width: '100%' }}
        {...p.options}
        disabled={p.disabled}
        {...defaultObj}
        onChange={onChange}
      />
    );
  }
  return (
    <DatePicker
      style={{ width: '100%' }}
      {...placeholderObj}
      showTime={format === 'dateTime'}
      {...p.options}
      {...defaultObj}
      disabled={p.disabled}
      onChange={onChange}
    />
  );
}
