import React from 'react';
import { InputNumber, Slider } from 'antd';

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
      <Slider
        style={{ flexGrow: 1, marginRight: 12 }}
        {...setting}
        onChange={handleChange}
        value={typeof p.value === 'number' ? p.value : min || 0}
      />
      <InputNumber
        style={{ width: '35%' }}
        {...p.options}
        value={p.value}
        {...setting}
        disabled={p.disabled}
        readOnly={p.readonly}
        onChange={handleChange}
      />
    </div>
  );
}
