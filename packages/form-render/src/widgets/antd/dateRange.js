/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { getFormat } from '../../utils';
import { useTools } from '../../form-render-core/src/hooks';

const { RangePicker } = DatePicker;

const DateRange = ({ onChange, format, value, style, ...rest }) => {
  const { methods } = useTools();
  const { schema = {} } = rest;
  const { props = {} } = schema;
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

  let _value = [];

  if (start && end) {
    _value = [moment(start, dateFormat), moment(end, dateFormat)];
  }

  const handleChange = (val, stringList) => {
    const emptyList1 = stringList[0] === '' || stringList[1] === '';
    const emptyList2 =
      stringList[0] === undefined || stringList[1] === undefined;
    if (emptyList1 || emptyList2) {
      onChange(null);
    } else {
      onChange(stringList);
    }
  };

  let dateParams = {
    value: _value,
    style: { width: '100%', ...style },
    onChange: handleChange,
  };

  // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime
  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  dateParams = { ...dateParams, ...rest };

  if (dateFormat === format) {
    dateParams.format = format;
  }

  if (props.disabledDate && typeof props.disabledDate === 'string') {
    const func = methods[props.disabledDate];
    if (typeof func === 'function') {
      dateParams.disabledDate = func;
    }
  }

  if (props.disabledTime && typeof props.disabledTime === 'string') {
    const func = methods[props.disabledTime];
    if (typeof func === 'function') {
      dateParams.disabledTime = func;
    }
  }

  return <RangePicker {...dateParams} />;
};

export default DateRange;
