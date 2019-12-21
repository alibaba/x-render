import React from 'react';
import { Input } from '@alifd/next';

const { TextArea } = Input;

export default function ta(p) {
  const { options, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const onChange = value => p.onChange(p.name, value);
  return (
    <TextArea
      style={style}
      {...options}
      disabled={p.disabled || p.readonly}
      value={p.value}
      onChange={onChange}
    />
  );
}
