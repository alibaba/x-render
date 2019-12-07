/**
 * Updated by Tw93 on 2019-12-07.
 * 多选组件
 */

import React from 'react';
import { Select } from '@alifd/next';
import multiSelectHoc from '../../components/multiSelectHoc';

export default function multiSelect(p) {
  const FormMulti = multiSelectHoc(p)(Select);
  return <FormMulti />;
}
