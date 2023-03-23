import React from 'react';
import { Button } from 'antd';

const HeaderTitle = (props: any) => {
  const { icon, children, btnType, ...otherProps } = props;

  let btnProps = { ...otherProps };
  if (btnType === 'icon') {
    btnProps.icon = icon;
    btnProps.size = 'small'
  } else {
    btnProps.children = children;
  }

  return (
    <Button type='link' style={{ padding: 0 }} {...btnProps} />
  );
}

export default HeaderTitle
