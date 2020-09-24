/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default (p, onChange, RangeComponent) => {
  const { format = 'dateTime' } = p.schema;
  const dateFormat = getFormat(format);
  const [start, end] = Array.isArray(p.value) ? p.value : [];
  const value =
    start && end ? [moment(start, dateFormat), moment(end, dateFormat)] : [];

  const datePrams = {
    ...p.options,
    value,
    style: { width: '100%' },
    showTime: format === 'dateTime',
    disabled: p.disabled || p.readonly,
    onChange,
  };
  return <RangeComponent {...datePrams} />;
};
