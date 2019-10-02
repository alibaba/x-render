import React from 'react';
import { InputNumber } from 'antd';

export default function number(p) {
  const { max, min, step } = p.schema;
  let obj = {};
  if (max || max === 0) {
    obj = { max };
  }

  if (min || min === 0) {
    obj = { ...obj, min };
  }

  if (step) {
    obj = { ...obj, step };
  }

  const handleChange = value => {
    p.onChange(p.name, value);
  };

  return (
    <InputNumber
      {...p.options}
      style={{ width: '100%' }}
      value={p.value}
      {...obj}
      disabled={p.disabled}
      readOnly={p.readonly}
      onChange={handleChange}
    />
  );
}
