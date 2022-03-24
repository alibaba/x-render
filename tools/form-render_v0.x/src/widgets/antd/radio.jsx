/**
 * Updated by Tw93 on 2019-12-07.
 * 单选组件
 */
import { Radio } from 'antd';
import React from 'react';
import RadioHoc from '../../components/radioHoc';

const RadioComponent = p => {
  const { enum: enums, enumNames } = p.schema || {};
  const onChange = e => p.onChange(p.name, e.target.value);
  return <RadioHoc {...p} onChange={onChange} Radio={Radio} />;
};

export default RadioComponent;
