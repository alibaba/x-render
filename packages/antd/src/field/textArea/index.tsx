import React from 'react';
import { Input } from 'antd';

export default (props: any) => {
  let finalProps = {
    autoSize: {
      minRows: 3,
    },
    ...props,
  };
  if (finalProps.rows) delete finalProps.autoSize;

  return <Input.TextArea {...finalProps} />;
};