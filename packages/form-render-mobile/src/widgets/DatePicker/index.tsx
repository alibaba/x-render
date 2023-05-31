import React, { useRef, useImperativeHandle} from 'react';
import { DatePicker as AntdDatePicker } from 'antd-mobile';
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
    format,
    ...restProps
  } = omit(props, ['addons', 'schema'])
  
  const pickerRef: any = useRef(null);
  
  // 使用useImperativeHandle暴露方法给外部
  useImperativeHandle(props.addons.fieldRef, () => ({
    ...pickerRef?.current
  }));

  const dateFormat = format || getFormat(precision);

  return (
    <AntdDatePicker
      ref={pickerRef}
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
