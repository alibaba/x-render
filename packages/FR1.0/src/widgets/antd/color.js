import React from 'react';
import ColorPicker from 'rc-color-picker';
import { Input } from 'antd';
import 'rc-color-picker/assets/index.css';

export default function color(p) {
  const { format } = p.schema;
  const onPickerChange = e => {
    if (p.disabled || p.readonly) return;
    p.onChange(e.color);
  };
  const onInputChange = e => {
    // const isHex = value.match(/^(#{0,1})([0-9A-F]{6})$/i);
    p.onChange(e.target.value);
  };

  return (
    <div className="fr-color-picker">
      {
        <ColorPicker
          type={format}
          animation="slide-up"
          color={p.value ? p.value : '#ffffff'}
          onChange={onPickerChange}
        />
      }
      {p.readonly ? (
        <span>{p.value || '#ffffff'}</span>
      ) : (
        <Input
          placeholder="#ffffff"
          disabled={p.disabled}
          value={p.value}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}
