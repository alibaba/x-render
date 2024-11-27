import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';

export default memo((props: any) => {
  const { onClick, type } = props;
  const { settingMap } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};

  return (
    <NodeContainer
      className="custom-node-code"
      title={nodeSetting.title || '开始'}
      icon={{
        type: nodeSetting?.icon?.type || 'icon-start',
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#17B26A',
      }}
      onClick={onClick}
      hideDesc={true}
    />
  );
});
