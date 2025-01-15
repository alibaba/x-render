import { Empty } from 'antd';
import React, { memo } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../../hooks/useStore';
import { isTruthy } from '../../../utils';
import TrackNodeItem from './TrackNodeItem';

// 追踪面板，默认值展示有状态的节点
export default memo((props: any) => {
  const { logList, onTrackCollapseChange } = props;
  const { nodes, setNodes } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
    }),
    shallow
  );

  const statusNode = (nodes || [])?.filter(item =>
    isTruthy(item?.data?._status)
  );
  const trackList = (statusNode || [])?.map(node => {
    const logTrackList = logList?.find(item => item?.nodeId == node?.id);
    return { ...node, logTrackList: logTrackList?.codePanel || [] };
  });

  return (
    <div className="log-track-panel">
      {trackList?.length ? (
        (trackList || [])?.map((item, index) => (
          <TrackNodeItem
            nodeType={item?.data?._nodeType}
            key={item?.id}
            nodeStatus={item?.data?._status}
            node={item}
            logTrackList={item?.logTrackList || []}
            onTrackCollapseChange={onTrackCollapseChange}
          />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无有状态节点"
          style={{ fontSize: '12px' }}
        />
      )}
    </div>
  );
});
