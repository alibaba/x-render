import React from 'react';
import { Input } from 'antd';

export default function jsonInput({
  onChange,
  value,
  disabled,
  readonly,
  options,
}) {
  const handleChange = e => {
    try {
      onChange(JSON.parse(e.target.value));
    } catch {
      onChange(e.target.value);
    }
  };

  const inputValue = typeof value === 'string' ? value : JSON.stringify(value)

  return (
    <Input
      disabled={disabled || readonly}
      {...options}
      onChange={handleChange}
      value={inputValue}
    />
  );
}
