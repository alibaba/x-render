import * as React from 'react';
import { InputNumber, Slider } from 'antd';

interface Props {
  schema: {
    max?: number;
    min?: number;
    step?: number;
  };
  options?: {
    hideNumber?: boolean;
  };
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readonly?: boolean;
}

const PercentSlider: React.FC<Props> = (p) => {
  const { max, min, step } = p.schema;
  let setting: { max?: number; min?: number; step?: number } = {};
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

  const isPercent = (string: string): boolean =>
    typeof string === 'string' && string.endsWith('%');

  let numberValue = 100;
  if (isPercent(p.value)) {
    try {
      numberValue = Number(p.value.split('%')[0]);
      if (Number.isNaN(numberValue)) numberValue = 100;
    } catch (error) {}
  }

  const handleChange = (newNumber: number | undefined): void => {
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
      style={{ width: '80px' }}
      value={numberValue}
      disabled={p.disabled}
      onChange={handleChange}
      formatter={(value) => `${value}%`}
      parser={(value) => Number(value.replace('%', ''))}
    />
  );

  return (
    <div className="fr-slider">
      <Slider
        style={{ flexGrow: 1, marginRight: hideNumber ? 0 : 12 }}
        {...setting}
        onChange={handleChange}
        max={100}
        tooltip={{ formatter: (v) => v + '%' }}
        value={numberValue || 100}
        disabled={p.disabled || p.readonly}
      />
      {hideNumber ? null : renderNumber}
    </div>
  );
};

export default PercentSlider;

 