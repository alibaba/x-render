import { PlusOutlined } from '@ant-design/icons';
import { Handle } from '@xyflow/react';
import { Tooltip } from 'antd';
import React, { memo, useRef, useState } from 'react';
import NodeSelectPopover from '../NodesPopover';

export default memo((props: any) => {
  const {
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
    id,
    switchTitle,
    ...rest
  } = props;
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [openNodeSelectPopover, setOpenNodeSelectPopover] = useState(false);
  const popoverRef = useRef(null);

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
      id={id}
      {...rest}
    >
      {(selected || isHovered || openNodeSelectPopover) && (
        <>
          {switchTitle && <div className="xflow-node-switch-title">{switchTitle}</div>}
          <div className="xflow-node-add-box">
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
                open={isShowTooltip}
              >
                <PlusOutlined style={{ color: '#fff', fontSize: 10 }} />
              </Tooltip>
            </NodeSelectPopover>
          </div>
        </>
      )}
    </Handle>
  );
});
