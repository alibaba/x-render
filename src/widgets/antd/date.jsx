import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import dateHoc from '../../components/dateHoc';

export default function date(p) {
  const onChange = (value, string) => p.onChange(p.name, string);
  const DateComponent = p.format === 'time' ? TimePicker : DatePicker;
  const FormDate = dateHoc({ p, onChange })(DateComponent);
  return <FormDate />;
}
