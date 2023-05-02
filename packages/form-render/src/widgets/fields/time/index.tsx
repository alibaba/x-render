import dayjs from 'dayjs';
import React from 'react';

import TimePicker from '../../components/TimePicker';
import { getFormat } from '../../utils';
import withFieldWrap from '../../utils/withFieldWrap';

const Time = ({ onChange, format ='time', value, style, ...rest }) => {
  const timeFormat = getFormat(format);
  const _value = value ? dayjs(value, timeFormat) : undefined;

  const handleChange = (_: any, valueStr: string) => {
    onChange(valueStr);
  };

  const timeParams: any = {
    value: _value,
    style: { width: '100%', ...style },
    onChange: handleChange,
    format: timeFormat,
    ...rest,
  };

  return <TimePicker {...timeParams} />;
};
export default withFieldWrap(Time);