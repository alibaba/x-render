/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import TimePicker from './timePicker';
import dayjs from 'dayjs';
import React from 'react';
import { getFormat } from '../utils';

const { RangePicker } = TimePicker;

const TimeRange = ({ onChange, format, value, style, ...rest }) => {
  const timeFormat = getFormat(format);
  let [start, end] = Array.isArray(value) ? value : [];
  const _value =
    start && end ? [dayjs(start, timeFormat), dayjs(end, timeFormat)] : [];

  const handleChange = (value, stringList) => {
    const emptyList1 = stringList[0] === '' || stringList[1] === '';
    const emptyList2 =
      stringList[0] === undefined || stringList[1] === undefined;
    if (emptyList1 || emptyList2) {
      onChange(undefined);
    } else {
      onChange(stringList);
    }
  };

  const timeParams = {
    style: { width: '100%', ...style },
    value: _value,
    onChange: handleChange,
    ...(rest.schema.props || {}),
  };

  return <RangePicker {...timeParams} />;
};

export default TimeRange;
