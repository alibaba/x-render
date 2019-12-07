import React from 'react';
import { DatePicker } from '@alifd/next';
import moment from 'moment';
import rangeHoc from '../../components/rangeHoc';
import { getFormat } from '../../base/utils';
const { RangePicker } = DatePicker;

export default function dateRange(p) {
  const { format = 'dateTime' } = p.schema;
  const dateFormat = getFormat(format);

  const onChange = value => {
    if (Array.isArray(value)) {
      const result = value.map(
        // null 的时候返回空字符串
        item => (item || '') && moment(item).format(dateFormat)
      );
      p.onChange(p.name, result);
    }
  };
  const FormRange = rangeHoc({ p, onChange })(RangePicker);
  return <FormRange />;
}
