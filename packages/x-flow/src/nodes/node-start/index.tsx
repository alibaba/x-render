import React, { memo } from 'react';
import NodeContainer from '../../components/NodeContainer';

export default memo((props: any) => {
  const { onClick } = props;
  
  return (
    <NodeContainer
      className='custom-node-code'
      title='开始'
      // icon={icon}
      onClick={onClick}
      hideDesc={true}
    />
  );
});


