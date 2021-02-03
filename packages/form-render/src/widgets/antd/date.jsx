/**
 * Updated by fateriddle on 2019-12-12.
 * 日期组件
 */

import React, { useState } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../base/utils';

export default ({
  invalid,
  schema,
  options,
  value,
  name,
  onChange,
  disabled,
  readOnly,
}) => {
  const style = invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const { format = 'dateTime' } = schema;
  let _format = format;
  if (options && options.format) {
    _format = options.format;
  }

  _format = getFormat(_format);

  const DateComponent = format === 'time' ? TimePicker : DatePicker;

  let _value = value || '';
  if (_value) {
    _value = moment(_value, _format);
  }

  const _onChange = (value, string) => {
    onChange(name, string);
  };

  const dateParams = {
    ...options,
    value: _value,
    style: { width: '100%', ...style },
    disabled: disabled || readOnly,
    onChange: _onChange,
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
