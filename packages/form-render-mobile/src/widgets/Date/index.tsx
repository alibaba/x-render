import React from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs';

export default ({ value, onChange, ...props }) => {
  console.log('props', value, props);

  // const [visible, setVisible] = React.useState(false);

  return (
    <DatePicker
      // visible={visible}
      // onCancel={() => setVisible(false)}
      value={value}
      onConfirm={value => {
        onChange(value);
        // setVisible(false);
      }}
    >
      {value => (
        <div>{value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'}</div>
      )}
    </DatePicker>
  )
}