/**
 * Updated by Tw93 on 2019-12-07.
 * 单选组件
 */

import React from 'react';
import { Radio } from 'antd';
import radioHoc from '../../components/radioHoc';

export default function radio(p) {
  const onChange = e => p.onChange(p.name, e.target.value);
  const FormRadio = radioHoc(p, onChange)(Radio);
  return <FormRadio />;
}
