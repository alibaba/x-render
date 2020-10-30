/**
 * Updated by Tw93 on 2019-12-07.
 * 单选组件
 */
import React from 'react';
import { Radio } from '@alifd/next';
import RadioHoc from '../../components/radioHoc';

const RadioComponent = p => {
  const { enum: enums, enumNames } = p.schema || {};
  const onChange = v => p.onChange(p.name, v);
  return <RadioHoc {...p} onChange={onChange} Radio={Radio} />;
};

export default RadioComponent;
