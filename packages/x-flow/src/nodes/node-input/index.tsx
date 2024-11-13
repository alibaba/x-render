import { memo } from 'react';
import NodeContainer from '../../FlowEditor/components/NodeContainer';
import { iconSettingMap } from '../constant';

export default memo((props: any) => {
  const { onClick } = props;
  const { icon } = iconSettingMap['Start'];

  return (
    <NodeContainer
      className='custom-node-code'
      title='开始'
      icon={icon}
      onClick={onClick}
      hideDesc={true}
    />
  );
});


