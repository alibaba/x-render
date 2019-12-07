/**
 * Updated by Tw93 on 2019-12-07.
 * 数字输入组件
 */

import React from 'react';
import { NumberPicker } from '@alifd/next';
import numberHoc from '../../components/numberHoc';

export default function number(p) {
  const FormNumber = numberHoc(p)(NumberPicker);
  return <FormNumber />;
}
