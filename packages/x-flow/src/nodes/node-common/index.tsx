import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';

export default memo((props: any) => {
  const { type, onClick, data } = props;
  const { settingMap } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};

  return (
    <NodeContainer
      className="custom-node-code"
      title={data?.title || nodeSetting.title}
      icon={{
        type: nodeSetting?.icon?.type,
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#F79009',
      }}
      onClick={onClick}
      hideDesc={nodeSetting?.hideDesc || !data?.desc}
      desc={data?.desc}
    />
  );
});
