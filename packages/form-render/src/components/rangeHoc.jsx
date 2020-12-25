/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default ({
  onChange,
  RangeComponent,
  schema = {},
  value,
  options,
  disabled,
  readOnly,
}) => {
  let { format = 'dateTime' } = schema;
  if (options.format) {
    format = options.format;
  }
  const dateFormat = getFormat(format);
  let [start, end] = Array.isArray(value) ? value : [];

  // week的时候会返回 2020-31周 quarter会返回 2020-Q2 需要处理之后才能被 moment
  if (typeof start === 'string' && typeof end === 'string') {
    if (format === 'week') {
      start = start.substring(0, start.length - 1);
      end = end.substring(0, end.length - 1);
    }
    if (format === 'quarter') {
      start = start.replace('Q', '');
      end = end.replace('Q', '');
    }
  }

  const _value =
    start && end ? [moment(start, dateFormat), moment(end, dateFormat)] : [];

  const dateParams = {
    ...options,
    value: _value,
    style: { width: '100%' },
    showTime: format === 'dateTime',
    disabled: disabled || readOnly,
    onChange,
  };

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return <RangeComponent {...dateParams} />;
};
