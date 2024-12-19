import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';
import SwitchBuildInNodeWidget from './SwitchBuildInNodeWidget';

export default memo((props: any) => {
  const {
    onClick,
    type,
    data,
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
  } = props;
  const { settingMap, widgets, iconFontUrl, globalConfig } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;
  const nodeDescription = nodeSetting?.description || '';
  const hideDesc = nodeSetting?.nodePanel?.hideDesc ?? globalConfig?.nodePanel?.hideDesc ?? false;

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
      hideDesc={hideDesc}
      desc={data?.desc}
      iconFontUrl={iconFontUrl}
      NodeWidget={
        <SwitchBuildInNodeWidget
          data={data}
          position={position}
          isConnectable={isConnectable}
          selected={selected}
          isHovered={isHovered}
          handleAddNode={handleAddNode}
          CustomNodeWidget={NodeWidget}
        />
      }
      description={nodeDescription} // 不允许用户更改的节点描述
      iconSvg={nodeSetting?.iconSvg}
    />
  );
});
