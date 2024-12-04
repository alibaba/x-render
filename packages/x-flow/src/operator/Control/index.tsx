import { Button, Tooltip } from 'antd';
import type { MouseEvent } from 'react';
import React, { memo } from 'react';
import IconView from '../../components/IconView';
import NodeSelectPopover from '../../components/NodesPopover';
import { useStore, useStoreApi } from '../../hooks/useStore';
import { useEventEmitterContextContext } from '../../models/event-emitter';

import './index.less';

const Control = (props: any) => {
  const { addNode } = props;

  const addNote = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const storeApi = useStoreApi();
  const panOnDrag = useStore(s => s.panOnDrag);

  const { eventEmitter } = useEventEmitterContextContext();

  const handleInteractionModeChange = panOnDrag => {
    storeApi.setState({ panOnDrag });
  };

  return (
    <div className="fai-reactflow-control">
      <NodeSelectPopover addNode={addNode}>
        <Tooltip title="添加节点">
          <Button
            type="text"
            icon={<IconView type="icon-add-circle" className="icon" />}
          />
        </Tooltip>
      </NodeSelectPopover>
      <Tooltip title="添加注释">
        <div className="control-item" onClick={addNote}>
          <IconView type="icon-sticky-note-add-line" className="icon" />
        </div>
      </Tooltip>
      <div className="separator"></div>
      <Tooltip title="指针模式">
        <div
          className="control-item"
          onClick={() => panOnDrag && handleInteractionModeChange(false)}
        >
          <IconView
            type="icon-indicator"
            className="icon"
            style={{
              color: !panOnDrag ? 'rgba(0, 0, 0, 0.25)' : '#666F83',
            }}
          />
        </div>
      </Tooltip>
      <Tooltip title="手模式">
        <div
          className="control-item"
          onClick={() => !panOnDrag && handleInteractionModeChange(true)}
        >
          <IconView
            type="icon-xianxingshouzhangtubiao"
            className="icon"
            style={{
              color: panOnDrag ? 'rgba(0, 0, 0, 0.25)' : '#666F83',
            }}
          />
        </div>
      </Tooltip>
      <div className="separator"></div>
      <Tooltip title="整理节点">
        <Button
          type="text"
          icon={<IconView type="icon-function-add-line1" className="icon" />}
          onClick={() => {
            eventEmitter?.emit({ type: 'auto-layout-nodes' } as any);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default memo(Control);
