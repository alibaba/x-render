import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd-mobile'
import dayjs from 'dayjs';
import formatPlugin from 'dayjs/plugin/advancedFormat';
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear';
import updateLocalePlugin from 'dayjs/plugin/updateLocale';
import { omit } from 'lodash';

dayjs.extend(updateLocalePlugin);
dayjs.extend(formatPlugin);
dayjs.extend(weekOfYearPlugin);

dayjs.updateLocale("en",{
  weekStart:1,
})

const defaultFormatMap = {
  'day': 'YYYY-MM-DD',
  'year': 'YYYY',
  'month': 'YYYY-MM',
  'week': 'YYYY-w',
  'hour': 'YYYY-MM-DD hh',
  'minute': 'YYYY-MM-DD hh:mm',
  'second': 'YYYY-MM-DD hh:mm:ss',
  'week-day': 'w-d',
}

export default (props: any) => {
  const { 
    value, 
    onChange, 
    precision = 'day', 
    placeholder = '请选择日期', 
    setFieldRef, 
    format,
    ...restProps
  } = omit(props, ['addons', 'schema'])
  
  const dateFormat = format || defaultFormatMap[precision];

  return (
    <AntdDatePicker
      ref={ref => setFieldRef(ref)}
      value={value}
      onConfirm={(value) => onChange(value)}
      precision={precision}
      {...restProps}
    >
      {value => (
        <div>{value ? dayjs(value).format(dateFormat) : placeholder}</div>
      )}
    </AntdDatePicker>
  )
}
