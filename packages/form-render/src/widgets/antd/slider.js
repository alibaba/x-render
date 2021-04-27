/**
 * Created by Tw93 on 2019-12-07.
 * 滑动输入组件
 */

import React from 'react';
import { InputNumber, Slider } from 'antd';

const SliderWithNumber = ({
  schema,
  value,
  onChange,
  hideInput,
  inputProps,
  ...rest
}) => {
  const { max, min, step } = schema;
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

  return (
    <div className="fr-slider">
      <Slider
        style={{ flexGrow: 1, marginRight: hideInput ? 0 : 12 }}
        {...setting}
        onChange={onChange}
        value={typeof value === 'number' ? value : min || 0}
        {...rest}
      />
      {hideInput ? null : (
        <InputNumber
          {...setting}
          {...inputProps}
          style={{ width: '90px' }}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SliderWithNumber;
