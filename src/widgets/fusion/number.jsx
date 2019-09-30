import React from 'react';
import { NumberPicker } from '@alifd/next';

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
    <NumberPicker
      {...p.options}
      {...obj}
      disabled={p.disabled}
      readOnly={p.readonly}
      value={p.value}
      onChange={handleChange}
    />
  );
}
