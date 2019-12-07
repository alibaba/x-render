import React from 'react';
import { DatePicker, TimePicker } from '@alifd/next';
import moment from 'moment';
import dateHoc from '../../components/dateHoc';
import { getFormat } from '../../base/utils';

export default function date(p) {
  const { format } = p.schema;
  const dateFormat = getFormat(format);
  const onChange = value => {
    p.onChange(p.name, moment(value || '', dateFormat).format(dateFormat));
  };
  const DateComponent = p.format === 'time' ? TimePicker : DatePicker;
  const FormDate = dateHoc({ p, onChange })(DateComponent);
  return <FormDate />;
}
