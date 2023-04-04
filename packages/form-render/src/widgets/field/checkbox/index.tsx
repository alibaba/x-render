import React from 'react';
import { Checkbox } from 'antd';

interface Props {
  title: string;
  [key: string]: any;
}

const CheckBox: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <>
      <Checkbox {...rest} />
      <span style={{ marginLeft: '12px' }}>{title}</span>
    </>
  );
}

export default CheckBox;

