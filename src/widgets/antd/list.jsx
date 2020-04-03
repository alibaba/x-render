/**
 * Updated by Tw93 on 2019-12-01.
 * 数组组件
 */

import React from 'react';
import listHoc from '../../components/listHoc';
import * as Icons from '@ant-design/icons';

import { Button } from 'antd';

function FrButton({ icon, children, ...rest }) {
  let iconName;
  switch (icon) {
    case 'add':
      iconName = 'PlusCircleOutlined';
      break;
    case 'delete':
      iconName = 'DeleteOutlined';
      break;
    default:
      iconName = icon;
      break;
  }
  const IconComponent = Icons[iconName];
  if (IconComponent) {
    return (
      <Button {...rest} icon={<IconComponent />}>
        {children}
      </Button>
    );
  }
  return <Button {...rest}>{children}</Button>;
}

export default listHoc(FrButton);
