/**
 * 滑动输入组件
 */
import React from 'react';
import { InputNumber, Slider } from 'antd';
import withFieldWrap from '../../utils/withFieldWrap';
import './index.less';
interface SliderWithNumberProps {
  schema: {
    max?: number;
    min?: number;
    step?: number;
  };
  value: number;
  onChange: (value: number) => void;
  hideInput?: boolean;
  inputProps?: any;
  style?: React.CSSProperties;
}

const SliderWithNumber: React.FC<SliderWithNumberProps> = ({
  schema,
  value,
  onChange,
  hideInput,
  inputProps,
  style,
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
    <div className='fr-slider' style={style}>
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
}

export default withFieldWrap(SliderWithNumber, ['addons', 'dependValues']);

