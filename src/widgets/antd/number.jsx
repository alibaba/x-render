/**
 * Updated by Tw93 on 2019-12-07.
 * 数字输入组件
 */

import React from 'react';
import { InputNumber } from 'antd';
import numberHoc from '../../components/numberHoc';

export default function number(p) {
  const FormNumber = numberHoc(p)(InputNumber);
  return <FormNumber />;
}
