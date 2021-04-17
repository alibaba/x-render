import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { getFormat } from '../../utils';

// TODO: 不要使用moment，使用dayjs
export default ({ onChange, format, value, style, ...rest }) => {
  const timeFormat = getFormat(format);
  const _value = value ? moment(value, timeFormat) : undefined;

  const handleChange = (value, string) => {
    onChange(string);
  };

  const timeParams = {
    value: _value,
    style: { width: '100%', ...style },
    onChange: handleChange,
    ...rest,
  };

  return <TimePicker {...timeParams} />;
};
