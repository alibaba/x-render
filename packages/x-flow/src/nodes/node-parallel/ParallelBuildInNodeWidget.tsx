import { Space, Typography } from 'antd';
import React, { memo } from 'react';
import SourceHandle from '../../components/CustomNode/sourceHandle';
import './index.less';
import { uuid } from '../../utils';
import { useStore } from '../../hooks/useStore';
import { shallow } from 'zustand/shallow';


const { Paragraph } = Typography;

export default memo((props: any) => {
  const {
    data,
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
    CustomNodeWidget,
  } = props;

  const { nodes, edges } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      addNodes: state.addNodes,
      addEdges: state.addEdges,
      onEdgesChange: state.onEdgesChange,
    }),
    shallow
  );

  return (
    <Space direction='vertical' className="node-switch-widget" size={5}>
      {(data?.list || [{ _parallelId: `parallel_${uuid()}` }, { _parallelId: `parallel_${uuid()}` }])?.map((item, index) => (
        <div className="node-switch-widget-item" key={index}>
          <div className="item-header">
            <div className="item-title">
              {CustomNodeWidget ? (
                <CustomNodeWidget data={item} index={index} />
              ) : (
                <>
                  {item?.value && (
                    <Paragraph
                      className="item-content-in"
                      ellipsis={{
                        rows: 1,
                        tooltip: {
                          title: item?.value,
                          color: '#ffff',
                          overlayInnerStyle: {
                            color: '#354052',
                            fontSize: '12px',
                          },
                          getPopupContainer: () => document.getElementById('xflow-container')
                        },
                      }}
                    >
                      {item?.value}
                    </Paragraph>
                  )}
                </>
              )}
            </div>
            <SourceHandle
              position={position}
              isConnectable={
                (edges || [])?.filter(
                  flow => flow?.sourceHandle === item?._parallelId
                )?.length === 0
              }
              selected={selected}
              isHovered={isHovered}
              handleAddNode={data => {
                handleAddNode(data, item?._parallelId);
              }}
              id={item?._parallelId}
              className="item-handle"
            />
          </div>
        </div>
      ))}
    </Space>
  );
});
