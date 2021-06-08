import React from 'react';
import { InputNumber, Slider } from 'antd';

const PercentSlider = p => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
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

  let hideNumber = false;
  if (p.options && p.options.hideNumber) {
    hideNumber = true;
  }

  const isPercent = string =>
    typeof string === 'string' && string.endsWith('%');

  let numberValue = 100;
  if (isPercent(p.value)) {
    try {
      numberValue = Number(p.value.split('%')[0]);
      if (Number.isNaN(numberValue)) numberValue = 100;
    } catch (error) {}
  }

  const handleChange = newNumber => {
    const a = newNumber + '%';
    p.onChange(a);
  };

  const renderNumber = p.readonly ? (
    <span style={{ width: '80px' }}>
      {p.value === (undefined || '') ? '-' : p.value + '%'}
    </span>
  ) : (
    <InputNumber
      {...p.options}
      {...setting}
      style={{ width: '80px', ...style }}
      value={numberValue}
      disabled={p.disabled}
      onChange={handleChange}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
    />
  );

  return (
    <div className="fr-slider">
      <Slider
        style={{ flexGrow: 1, marginRight: hideNumber ? 0 : 12 }}
        {...setting}
        onChange={handleChange}
        max={100}
        tipFormatter={v => v + '%'}
        value={numberValue || 100}
        disabled={p.disabled || p.readonly}
      />
      {hideNumber ? null : renderNumber}
    </div>
  );
};

export default PercentSlider;
