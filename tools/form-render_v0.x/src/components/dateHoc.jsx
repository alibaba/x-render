/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default (p, onChange, DateComponent) => {
  const style = p.invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  let { format = 'dateTime' } = p.schema;
  if (p.options && p.options.format) {
    format = p.options.format;
  }

  let _value = p.value || '';
  const dateFormat = getFormat(format);

  if (_value) {
    _value = moment(_value, dateFormat);
  }

  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const dateParams = {
    ...placeholderObj,
    ...p.options,
    value: _value,
    style: { width: '100%', ...style },
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
