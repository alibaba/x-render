/**
 * Created by Tw93 on 2019-12-07.
 * 滑动输入组件
 */

import React from 'react';

export default (SliderComponent, NumberComponent) => p => {
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

  const onChange = value => {
    p.onChange(p.name, value);
  };

  return (
    <div className="fr-slider">
      <SliderComponent
        style={{ flexGrow: 1, marginRight: 12 }}
        {...setting}
        onChange={onChange}
        value={typeof p.value === 'number' ? p.value : min || 0}
        disabled={p.disabled || p.readonly}
      />
      {p.readonly ? (
        <span style={{ width: '90px' }}>
          {p.value === (undefined || '') ? '-' : p.value}
        </span>
      ) : (
        <NumberComponent
          {...p.options}
          {...setting}
          style={{ width: '90px', ...style }}
          value={p.value}
          disabled={p.disabled}
          onChange={onChange}
        />
      )}
    </div>
  );
};
