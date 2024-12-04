import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';
import SwitchBuildInNodeWidget from './SwitchBuildInNodeWidget';

export default memo((props: any) => {
  const {
    onClick,
    type,
    data,
    nodeMinHeight
  } = props;
  const { settingMap, widgets, iconFontUrl } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;

  return (
    <NodeContainer
      className='custom-node-code'
      title={data?.title || nodeSetting?.title || 'Switch'}
      icon={{
        type: nodeSetting?.icon?.type || 'icon-switch',
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#06AED4',
      }}
      onClick={onClick}
      hideDesc={nodeSetting?.hideDesc || !data?.desc}
      desc={data?.desc}
      NodeWidget={NodeWidget ? <NodeWidget data={data} /> : <SwitchBuildInNodeWidget data={data} />}
      nodeMinHeight={nodeMinHeight}
      iconFontUrl={iconFontUrl}
    />
  );
});
