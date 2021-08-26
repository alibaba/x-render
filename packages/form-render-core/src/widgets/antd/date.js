import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getFormat } from '../../utils';

// TODO: 不要使用moment，使用dayjs
export default ({ onChange, format, value, style, ...rest }) => {
  const dateFormat = getFormat(format);
  // week的时候会返回 2020-31周 quarter会返回 2020-Q2 需要处理之后才能被 moment
  let _value = value || undefined;
  if (typeof _value === 'string') {
    if (format === 'week') {
      _value = _value ? _value.substring(0, _value.length - 1) : _value;
    }
    if (format === 'quarter') {
      _value = _value.replace('Q', '');
    }
  }
  if (_value) {
    _value = moment(_value, dateFormat);
  }

  const handleChange = (value, string) => {
    onChange(string);
  };

  let dateParams = {
    value: _value,
    style: { width: '100%', ...style },
    onChange: handleChange,
  };

  // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime
  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  dateParams = { ...dateParams, ...rest };

  if (dateFormat === format) {
    dateParams.format = format;
  }

  return <DatePicker {...dateParams} />;
};
