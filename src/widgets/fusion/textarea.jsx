import React from 'react';
import { Input } from '@alifd/next';

const { TextArea } = Input;

export default function ta(p) {
  const { options } = p;
  const onChange = value => p.onChange(p.name, value);
  return (
    <TextArea
      {...p.options}
      {...options}
      disabled={p.disabled}
      value={p.value}
      readOnly={p.readonly}
      onChange={onChange}
    />
  );
}
