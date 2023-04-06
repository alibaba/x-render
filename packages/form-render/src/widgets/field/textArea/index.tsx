import React from 'react';
import { Input } from 'antd';
import withFieldWrap from '../../utils/withFieldWrap';

const TextArea = (props: any) => {
  let finalProps = {
    autoSize: {
      minRows: 3,
    },
    ...props,
  };
  if (finalProps.rows) delete finalProps.autoSize;

  return <Input.TextArea {...finalProps} />;
};


export default withFieldWrap(TextArea)