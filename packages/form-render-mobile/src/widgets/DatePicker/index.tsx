import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd-mobile'
import { getFormat } from '../utils';
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
  
  const dateFormat = format || getFormat(precision);

  return (
    <AntdDatePicker
      ref={ref => setFieldRef(ref)}
      value={value}
      onConfirm={(value) => onChange(value)}
      precision={precision}
      {...restProps}
    >
      {value => (
        <div>{value ? dayjs(value).format(dateFormat) : <span style={{ color: '#ccc' }}>{placeholder}</span>}</div>
      )}
    </AntdDatePicker>
  )
}
