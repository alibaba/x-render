/**
 * Updated by Tw93 on 2019-12-07.
 * 滑动组件
 */
import React from 'react';
import { InputNumber, Slider } from 'antd';
import sliderHoc from '../../components/sliderHoc';

export default function number(p) {
  const FormSlider = sliderHoc(p)(Slider, InputNumber);
  return <FormSlider />;
}
