/**
 * Updated by Tw93 on 2019-12-01.
 * 数组组件
 */

import React from 'react';
import listHoc from '../../components/listHoc';
import { Icon } from '@ant-design/compatible';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { Button } from 'antd';

function FrButton({ icon, children, ...rest }) {
  let IconComponent;
  switch (icon) {
    case 'file-add':
      IconComponent = <PlusCircleOutlined />;
      break;
    case 'delete':
      IconComponent = <DeleteOutlined />;
      break;
    default:
      IconComponent = typeof icon === 'string' ? <Icon type={icon} /> : icon;
      break;
  }
  return (
    <Button {...rest} icon={IconComponent}>
      {children}
    </Button>
  );
}

export default listHoc(FrButton);
