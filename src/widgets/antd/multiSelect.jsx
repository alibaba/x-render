/**
 * Updated by Tw93 on 2019-12-07.
 * 多选组件
 */

import React from 'react';
import rangeHoc from '../../components/rangeHoc';

export default function multiSelect(p) {
  const FormMulti = rangeHoc(p)(Select);
  return <FormMulti />;
}
