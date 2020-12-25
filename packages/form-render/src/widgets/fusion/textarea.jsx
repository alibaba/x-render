import React from 'react';
import { Input } from '@alifd/next';

const { TextArea } = Input;

export default function ta(p) {
  const { options, invalid, schema = {} } = p;
  const { maxLength } = schema;
  const style = invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        width: '100%',
      }
    : { width: '100%' };
  const onChange = value => p.onChange(p.name, value);
  const config = {
    ...options,
    maxLength,
    hasLimitHint: maxLength ? true : false,
  };
  return (
    <TextArea
      style={style}
      {...config}
      disabled={p.disabled || p.readOnly}
      value={p.value}
      onChange={onChange}
    />
  );
}
