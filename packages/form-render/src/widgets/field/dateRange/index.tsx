/**
 * Updated by Tw93 on 2019-12-08.
 * 日历多选组件
 */
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import DatePicker from '../../components/DatePicker';
import { getFormat, transformDateValue } from '../../utils';
import withFieldWrap from '../../utils/withFieldWrap';

dayjs.extend(quarterOfYear);
const { RangePicker } = DatePicker;

const DateRange = ({ onChange, format, value, style, ...rest }) => {
  const dateFormat = getFormat(format);

  const valueObj = useMemo(() => {
    if (!value) {
      return value;
    }
    return value.map((item: any) => transformDateValue(item, format, dateFormat));
  }, [value]);


  const handleChange = (val: any[], _stringList: any[]) => {
    let stringList = _stringList;
    if (['week', 'quarter'].includes(format)) {
      stringList = (val || []).map((item: any) => dayjs(item).format(dateFormat));
    }

    const isPass = stringList.every(item => !!item);

    if (!isPass) {
      stringList = null;
    }

    onChange(stringList);
  };

  let dateParams: any = {
    value: valueObj,
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

  return <RangePicker {...dateParams} />;
};

export default withFieldWrap(DateRange);
