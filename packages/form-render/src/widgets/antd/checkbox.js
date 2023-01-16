/**
 * Created by Tw93 on 2019-12-07.
 * 滑动输入组件
 */

import { Checkbox } from 'antd';
import React from 'react';

const SliderWithNumber = ({
  title,
  ...rest
}) => {
  
  return (
    <div className="fr-slider">
      <Checkbox {...rest} />
      <span style={{ marginLeft: '6px'}}>{title}</span>
    </div>
  );
}

export default SliderWithNumber;
