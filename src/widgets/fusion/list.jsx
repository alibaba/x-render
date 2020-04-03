import React from 'react';
import { Button, Icon } from '@alifd/next';
import listHoc from '../../components/listHoc';

function FrButton({ icon, children, type, ...rest }) {
  let iconName;
  switch (icon) {
    case 'delete':
      iconName = 'ashbin';
      break;
    default:
      iconName = icon;
      break;
  }

  const restProps = type === 'dashed' ? rest : { ...rest, type }; // fusion不支持dashed，antd支持，这边强兼容一下

  return (
    <Button {...restProps}>
      {iconName ? <Icon type={iconName} /> : null}
      {children}
    </Button>
  );
}

export default listHoc(FrButton);
