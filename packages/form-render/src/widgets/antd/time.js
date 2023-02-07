import dayjs from 'dayjs';
import React from 'react';

import TimePicker from './timePicker';
import { getFormat } from '../utils';

// TODO: 不要使用moment，使用dayjs
export default ({ onChange, format, value, style, ...rest }) => {
  const timeFormat = getFormat(format);
  const _value = value ? dayjs(value, timeFormat) : undefined;

  const handleChange = (value, string) => {
    onChange(string);
  };

  const timeParams = {
    value: _value,
    style: { width: '100%', ...style },
    onChange: handleChange,
    format: timeFormat,
    ...rest,
  };

  return <TimePicker {...timeParams} />;
};