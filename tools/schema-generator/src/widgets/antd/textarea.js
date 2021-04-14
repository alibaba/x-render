import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ta(p) {
  const { options, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const defaultUi = { rows: 3 };
  const ui = { ...defaultUi, ...options };
  const onChange = (e) => p.onChange(e.target.value);
  return (
    <TextArea
      style={style}
      disabled={p.disabled || p.readonly}
      value={p.value}
      {...ui}
      onChange={onChange}
    />
  );
}
