import { memo } from 'react';
import NodeContainer from '../../FlowEditor/components/NodeContainer';

export default memo((props: any) => {
  const { onClick } = props;

  return (
    <NodeContainer
      className='custom-node-code'
      title='结束'
      icon={{
        type: 'icon-end',
        style: { fontSize: 14, color: '#fff' },
        bgColor: '#F79009'
      }}
      onClick={onClick}
      hideDesc={true}
    />
  );
});


