import React, { useRef, useImperativeHandle} from 'react';
import { DatePicker as AntdDatePicker } from 'antd-mobile';
import { getFormat } from '../utils';
import dayjs from 'dayjs';
import formatPlugin from 'dayjs/plugin/advancedFormat';
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear';
import updateLocalePlugin from 'dayjs/plugin/updateLocale';
import { omit } from 'lodash-es';

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
    format,
    ...restProps
  } = omit(props, ['addons', 'schema'])
  
  const pickerRef: any = useRef(null);
  
  // 使用useImperativeHandle暴露方法给外部
  useImperativeHandle(props.addons.fieldRef, () => ({
    ...pickerRef?.current
  }));

  const dateFormat = format || getFormat(precision);
  
  const handleChange = (date: Date) => {
    const dateString = dayjs(date).format(dateFormat);
    onChange(dateString);
  }

  return (
    <AntdDatePicker
      ref={pickerRef}
      value={dayjs(value, dateFormat).toDate()}
      onConfirm={handleChange}
      precision={precision}
      {...restProps}
    >
      {date => (
        <div>{(date && value) ? dayjs(date).format(dateFormat) : <span style={{ color: '#ccc' }}>{placeholder}</span>}</div>
      )}
    </AntdDatePicker>
  )
}
