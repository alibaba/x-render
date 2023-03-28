/**
 * Created by Tw93 on 2019-12-07.
 * 多选框组件
 */
import React from 'react';
import { Checkbox } from 'antd';

interface Props {
  title: string;
  [key: string]: any;
}

const CheckBox: React.FC<Props> = ({
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

export default CheckBox;

