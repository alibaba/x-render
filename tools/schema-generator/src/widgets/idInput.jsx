import React from 'react';
import { Input } from 'antd';
import { getKeyFromUniqueId, changeKeyFromUniqueId } from '../utils';

export default function IdInput({
  onChange,
  value,
  disabled,
  readonly,
  options,
}) {
  const handleChange = e => {
    try {
      const newId = changeKeyFromUniqueId(value, e.target.value);
      onChange(newId);
    } catch (error) {}
  };

  return (
    <Input
      disabled={disabled || readonly}
      {...options}
      onChange={handleChange}
      value={getKeyFromUniqueId(value)}
    />
  );
}
