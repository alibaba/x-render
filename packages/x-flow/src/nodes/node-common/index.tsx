import React, { memo, useContext } from 'react';
import { ConfigContext } from '../../models/context';
import NodeContainer from '../../components/NodeContainer';


export default memo((props: any) => {
  const { type, onClick } = props;
  const { settingMap } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};

  return (
    <NodeContainer
      className='custom-node-code'
      title={nodeSetting.title}
      icon={{
        type: nodeSetting?.icon?.type,
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#F79009'
      }}
      onClick={onClick}
      hideDesc={true}
    />
  );
});


