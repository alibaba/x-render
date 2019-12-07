import React from 'react';
import { DatePicker } from 'antd';
import rangeHoc from '../../components/rangeHoc';

const { RangePicker } = DatePicker;

export default function dateRange(p) {
  const onChange = (value, string) => p.onChange(p.name, string);
  const FormRange = rangeHoc({ p, onChange })(RangePicker);
  return <FormRange />;
}
