import React from 'react';
import { Button, Icon } from '@alifd/next';
import listHoc from '../../components/listHoc';

function FrButton({ icon, children, ...rest }) {
  let iconName;
  switch (icon) {
    case 'file-add':
      iconName = 'add';
      break;
    case 'delete':
      iconName = 'ashbin';
      break;
    default:
      iconName = icon;
      break;
  }
  return (
    <Button {...rest}>
      {iconName ? <Icon type={iconName} /> : null}
      {children}
    </Button>
  );
}

export default listHoc(FrButton);
