
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { getFormat, transformDateValue } from '../../utils';
import DatePicker from '../../components/DatePicker';
import withFieldWrap from '../../utils/withFieldWrap';


dayjs.extend(quarterOfYear);

const DateCmpt = ({ onChange, format, value, style, ...rest }) => {
  const dateFormat = getFormat(format);
  
  const valueObj = useMemo(() => {
    return transformDateValue(value, format, dateFormat);
  }, [value]);

  const handleChange = (dateValue: any, dateString: string) => {
    let newValue = dateString;
    if (format === 'week' || format === 'quarter') {
      newValue = dayjs(dateValue).format(dateFormat);
    }
    onChange(newValue);
  };

  const dateParams: any = {
    value: valueObj,
    style: { width: '100%', ...style },
    onChange: handleChange,
  };

  // TODO: format 是在 options 里自定义的情况，是否要判断一下要不要 showTime
  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  if (dateFormat === format) {
    dateParams.format = format;
  }

  return <DatePicker {...dateParams} {...rest} />;
};

export default withFieldWrap(DateCmpt);
