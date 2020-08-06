import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ta(p) {
  const { options, invalid, schema = {} } = p;
  const { maxLength } = schema;
  const style = invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const defaultUi = { rows: 3 };
  const ui = { ...defaultUi, ...options };
  const onChange = e => p.onChange(p.name, e.target.value);
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <TextArea
        style={style}
        disabled={p.disabled || p.readonly}
        value={p.value}
        {...ui}
        onChange={onChange}
      />
      {
        <span
          style={{
            fontSize: 12,
            position: 'absolute',
            bottom: 5,
            right: 11,
            color: p.value.length > maxLength ? '#ff4d4f' : '#999',
          }}
        >
          {p.value.length + ' / ' + maxLength}
        </span>
      }
    </div>
  );
}
