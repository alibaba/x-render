import React from 'react';
import { NumberPicker, Range } from '@alifd/next';

export default function number(p) {
  const { max, min, step } = p.schema;
  let setting = {};
  if (max || max === 0) {
    setting = { max };
  }

  if (min || min === 0) {
    setting = { ...setting, min };
  }

  if (step) {
    setting = { ...setting, step };
  }

  const handleChange = value => {
    p.onChange(p.name, value);
  };

  return (
    <div className="fr-slider">
      <Range
        style={{ flexGrow: 1, marginRight: 12 }}
        {...setting}
        defaultValue={min || 20}
        onChange={handleChange}
        value={typeof p.value === 'number' ? p.value : min || 0}
      />
      <NumberPicker
        style={{ width: '35%' }}
        {...p.options}
        {...setting}
        disabled={p.disabled}
        readOnly={p.readonly}
        value={p.value}
        onChange={handleChange}
      />
    </div>
  );
}
