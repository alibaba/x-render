import React from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs';

export default ({ value, onChange, setFieldRef, ...restProps }) => {
  
  const placeholder = restProps.placeholder || '请选择日期';

  return (
    <DatePicker
      ref={ref => setFieldRef(ref)}
      value={value}
      onConfirm={(value) => onChange(value)}
    >
      {value => (
        <div>{value ? dayjs(value).format('YYYY-MM-DD') : placeholder}</div>
      )}
    </DatePicker>
  )
}
