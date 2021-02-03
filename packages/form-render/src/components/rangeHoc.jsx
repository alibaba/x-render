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
  const { format = 'dateTime' } = schema;
  let _format = format;
  if (options && options.format) {
    _format = options.format;
  }
  _format = getFormat(_format);

  let [start, end] = Array.isArray(value) ? value : [];

  const _value =
    start && end ? [moment(start, _format), moment(end, _format)] : [];

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
