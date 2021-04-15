/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';

const { RangePicker } = TimePicker;

const TimeRange = ({ onChange, format, value, style, ...rest }) => {
  const timeFormat = getFormat(format);
  let [start, end] = Array.isArray(value) ? value : [];
  const _value =
    start && end ? [moment(start, timeFormat), moment(end, timeFormat)] : [];

  const handleChange = (value, stringList) => {
    onChange(stringList);
  };

  const timeParams = {
    style: { width: '100%', ...style },
    value: _value,
    onChange: handleChange,
    ...rest,
  };

  return <RangePicker {...timeParams} />;
};

export default TimeRange;
