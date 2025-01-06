import { Space, Typography } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';
import { shallow } from 'zustand/shallow';
import SourceHandle from '../../components/CustomNode/sourceHandle';
import { useStore } from '../../hooks/useStore';
import { uuid } from '../../utils';
import './index.less';

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
    isSwitchBottom,
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

  const renderTitle = (item, index) => (
    <div className="item-header">
      <div className="item-title">
        {item?.title && (
          <Paragraph
            className="item-content-in"
            ellipsis={{
              rows: 1,
              tooltip: {
                title: item?.title,
                color: '#ffff',
                overlayInnerStyle: {
                  color: '#354052',
                  fontSize: '12px',
                },
                getPopupContainer: () =>
                  document.getElementById('xflow-container'),
              },
            }}
          >
            {item?.title}
          </Paragraph>
        )}
      </div>
      <SourceHandle
        position={position}
        isConnectable={
          (edges || [])?.filter(flow => flow?.sourceHandle === item?._id)
            ?.length === 0
        }
        selected={selected}
        isHovered={isHovered}
        handleAddNode={data => {
          handleAddNode(data, item?._id);
        }}
        id={item?._id}
        className="item-handle"
      />
    </div>
  );

  const renderContent = (item, index) => (
    <div className="item-content">
      {CustomNodeWidget ? (
        <CustomNodeWidget data={item} index={index} />
      ) : (
        <>
          {item?.value && (
            <Paragraph
              className="item-content-in"
              ellipsis={{
                rows: 5,
                tooltip: {
                  title: item?.value,
                  color: '#ffff',
                  overlayInnerStyle: {
                    color: '#354052',
                    fontSize: '12px',
                  },
                  getPopupContainer: () =>
                    document.getElementById('xflow-container'),
                },
              }}
            >
              {item?.value}
            </Paragraph>
          )}
        </>
      )}
    </div>
  );

  return (
    <Space
      direction={isSwitchBottom ? 'horizontal' : 'vertical'}
      className={classNames('node-parallel-widget', {
        'node-parallel-widget-bottom': isSwitchBottom,
      })}
      size={5}
    >
      {(data?.list || [{ _id: `id_${uuid()}` }, { _id: `id_${uuid()}` }])?.map(
        (item, index) => (
          <div
            className={classNames('node-parallel-widget-item', {
              'node-parallel-bottom-item': isSwitchBottom,
            })}
            key={index}
          >
            {isSwitchBottom ? (
              <>
                {renderContent(item, index)}
                {renderTitle(item, index)}
              </>
            ) : (
              <>
                {renderTitle(item, index)}
                {renderContent(item, index)}
              </>
            )}
          </div>
        )
      )}
    </Space>
  );
});
