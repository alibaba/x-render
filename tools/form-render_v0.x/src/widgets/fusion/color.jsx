import React from 'react';
import ColorPicker from 'rc-color-picker';
import { Input } from '@alifd/next';
import 'rc-color-picker/assets/index.css';
import Color from 'color';

export default function color(p) {
  const { format } = p.schema;
  const defaultColor = '#ffffff';
  const onPickerChange = e => {
    if (p.disabled || p.readOnly) return;
    let { color, alpha } = e;
    if (alpha !== 100) {
      color = Color(color)
        .alpha(alpha / 100)
        .string();
    }
    p.onChange(p.name, color);
  };
  const onInputChange = value => {
    p.onChange(p.name, value);
  };

  return (
    <div className="fr-color-picker">
      {
        <ColorPicker
          type={format}
          animation="slide-up"
          color={p.value || defaultColor}
          onClose={onPickerChange}
        />
      }
      {p.readOnly ? (
        <span>{p.value || defaultColor}</span>
      ) : (
        <Input
          style={{ width: '100%' }}
          placeholder={defaultColor}
          disabled={p.disabled}
          value={p.value}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}
