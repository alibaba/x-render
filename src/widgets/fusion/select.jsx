/**
 * Updated by Tw93 on 2019-12-07.
 * 选择组件
 */

import React from 'react';
import { Select } from '@alifd/next';
import selectHoc from '../../components/selectHoc';

export default function select(p) {
  const FormSelect = selectHoc(p)(Select);
  return <FormSelect />;
}
