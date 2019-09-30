import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ta(p) {
  const { options } = p;
  const defaultUi = { rows: 3 };
  const ui = { ...defaultUi, ...options };
  const onChange = e => p.onChange(p.name, e.target.value);
  return (
    <TextArea
      {...p.options}
      disabled={p.disabled}
      readOnly={p.readonly}
      value={p.value}
      {...ui}
      onChange={onChange}
    />
  );
}
