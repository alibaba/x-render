import React from 'react';
import { Input } from 'antd';

export default function input(props) {
  const { value, onChange, schema, disabled, options } = props;
  const { format = 'text' } = schema;
  const type = format;
  return (
    <Input
      size="small"
      {...options}
      value={value}
      type={type}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
