/**
 * Created by Tw93 on 2019-12-07.
 * 滑动输入组件
 */

import React from 'react';
import { InputNumber, Slider } from 'antd';

const SliderWithNumber = p => {
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

  const renderNumber = p.readonly ? (
    <span style={{ width: '90px' }}>
      {p.value === (undefined || '') ? '-' : p.value}
    </span>
  ) : (
    <InputNumber
      {...p.options}
      {...setting}
      style={{ width: '90px', ...style }}
      value={p.value}
      disabled={p.disabled}
      onChange={p.onChange}
    />
  );

  return (
    <div className='fr-slider'>
      <Slider
        style={{ flexGrow: 1, marginRight: hideNumber ? 0 : 12 }}
        {...setting}
        onChange={p.onChange}
        value={typeof p.value === 'number' ? p.value : min || 0}
        disabled={p.disabled || p.readonly}
      />
      {hideNumber ? null : renderNumber}
    </div>
  );
};

export default SliderWithNumber;
