import { PlusOutlined } from '@ant-design/icons';
import { Handle } from '@xyflow/react';
import { Tooltip } from 'antd';
import React, { memo, useContext, useMemo, useRef, useState } from 'react';
import NodeSelectPopover from '../NodesPopover';
import { ConfigContext } from '../../models/context';


export default memo((props: any) => {
  const {
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
    switchTitle,
    ...rest
  } = props;
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [openNodeSelectPopover, setOpenNodeSelectPopover] = useState(false);
  const popoverRef = useRef(null);
  const { antdVersion,globalConfig } = useContext(ConfigContext);
  const handleProps = globalConfig?.handle || {}

  const toolTipVersionProps = useMemo(() => {
    if (antdVersion === 'V5') {
      return {
        open: isShowTooltip,
      };
    }
    // V4
    return {
      visible: isShowTooltip,
    };
  }, [isShowTooltip]);

  return (
    <Handle
      type="source"
      position={position}
      isConnectable={isConnectable}
      onMouseEnter={() => setIsShowTooltip(true)}
      onMouseLeave={() => setIsShowTooltip(false)}
      onClick={e => {
        e.stopPropagation();
        popoverRef?.current?.changeOpen(true);
        setIsShowTooltip(false);
        setOpenNodeSelectPopover(true);
      }}
      {...handleProps}
      {...rest}
    >
      {(selected || isHovered || openNodeSelectPopover ) && (
        <>
          {switchTitle && (
            <div className="xflow-node-switch-title">{switchTitle}</div>
          )}
          {isConnectable && <div className="xflow-node-add-box">
            <NodeSelectPopover
              placement="right"
              addNode={handleAddNode}
              ref={popoverRef}
              onNodeSelectPopoverChange={val => setOpenNodeSelectPopover(val)}
            >
              <Tooltip
                title="点击添加节点"
                arrow={false}
                overlayInnerStyle={{
                  background: '#fff',
                  color: '#354052',
                  fontSize: '12px',
                }}
                color='#fff'
                {...toolTipVersionProps}
                getPopupContainer={() =>
                  document.getElementById('xflow-container') as HTMLElement
                }
              >
                <PlusOutlined style={{ color: '#fff', fontSize: 10 }} />
              </Tooltip>
            </NodeSelectPopover>
          </div>}
        </>
      )}
    </Handle>
  );
});
