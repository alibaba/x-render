/**
 * Updated by Tw93 on 2019-12-08.
 * 日期组件
 */

import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import dateHoc from '../../components/dateHoc';

export default function date(p) {
  const { format = 'dateTime' } = p.schema;
  const onChange = (value, string) => p.onChange(p.name, string);
  const DateComponent = format === 'time' ? TimePicker : DatePicker;
  const FormDate = dateHoc(p, onChange)(DateComponent);
  return <FormDate />;
}
