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
