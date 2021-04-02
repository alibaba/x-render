import React from 'react';
import moment from 'moment';
import { DatePicker, TimePicker } from 'antd';
import { getFormat } from '../../utils';

// TODO: 不要使用moment，使用dayjs
export default p => {
  let { format = 'dateTime' } = p.schema;
  if (p.options && p.options.format) {
    format = p.options.format;
  }
  const DateComponent = format === 'time' ? TimePicker : DatePicker;
  const dateFormat = getFormat(format);
  // week的时候会返回 2020-31周 quarter会返回 2020-Q2 需要处理之后才能被 moment
  let _value = p.value || '';
  if (typeof _value === 'string') {
    if (format === 'week') {
      _value = _value.substring(0, _value.length - 1);
    }
    if (format === 'quarter') {
      _value = _value.replace('Q', '');
    }
  }
  if (_value) {
    _value = moment(_value, dateFormat);
  }

  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const onChange = (value, string) => p.onChange(string);

  const dateParams = {
    ...placeholderObj,
    ...p.options,
    value: _value,
    style: { width: '100%' },
    disabled: p.disabled || p.readOnly,
    onChange,
  };

  // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime
  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return <DateComponent {...dateParams} />;
};
