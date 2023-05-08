/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import TimePicker from '../../components/TimePicker';
import dayjs from 'dayjs';
import React from 'react';
import { getFormat } from '../../utils';

const { RangePicker } = TimePicker;

const TimeRange = ({ onChange, format='time', value, style, schema }) => {
  const timeFormat = getFormat(format);
  let [start, end] = Array.isArray(value) ? value : [];

  const _value =
    start && end ? [dayjs(start, schema?.props?.format || timeFormat), dayjs(end, schema?.props?.format || timeFormat)] : [];

  const handleChange = (_: any, stringList: any) => {
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
    ...(schema.props || {}),
  };

  return <RangePicker {...timeParams} />;
};

export default TimeRange;
