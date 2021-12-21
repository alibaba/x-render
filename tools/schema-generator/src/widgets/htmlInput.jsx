import React from 'react';
import { Input } from 'antd';

export default function HtmlInput({
  value,
  disabled,
  readonly,
  options,
  onChange,
}) {
  const handleChange = e => {
    const { value: newVal } = e.target;
    onChange(newVal && newVal.replace(/on(.*?=)/g, 'no$1'));
  };

  return (
    <Input
      disabled={disabled || readonly}
      {...options}
      onChange={handleChange}
      value={value && value.replace(/no(.*?=)/g, 'on$1')}
    />
  );
}
