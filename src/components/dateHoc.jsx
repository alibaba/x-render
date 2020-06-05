/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default (p, onChange, DateComponent) => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  let { format = 'dateTime' } = p.schema;
  if (p.options.format) {
    format = p.options.format;
  }
  const dateFormat = getFormat(format);
  let defaultObj = {};
  if (p.value) {
    defaultObj.value = moment(p.value, dateFormat);
  } else {
    defaultObj.value = '';
  }

  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const dateParams = {
    ...placeholderObj,
    ...p.options,
    ...defaultObj,
    style: { width: '100%', ...style },
    disabled: p.disabled || p.readonly,
    onChange,
  };

  // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime
  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  return <DateComponent {...dateParams} />;
};
