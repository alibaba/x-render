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

  const _value = p.value || '';
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <TextArea
        style={style}
        disabled={p.disabled || p.readOnly}
        value={p.value}
        {...ui}
        onChange={onChange}
      />
      {maxLength ? (
        <span
          style={{
            fontSize: 12,
            position: 'absolute',
            bottom: 5,
            right: 11,
            color: _value.length > maxLength ? '#ff4d4f' : '#999',
          }}
        >
          {_value.length + ' / ' + maxLength}
        </span>
      ) : null}
    </div>
  );
}
