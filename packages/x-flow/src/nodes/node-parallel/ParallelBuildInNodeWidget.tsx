import { Space } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';
import { shallow } from 'zustand/shallow';
import SourceHandle from '../../components/CustomNode/sourceHandle';
import TextEllipsis from '../../components/TextEllipsis';
import { useStore } from '../../hooks/useStore';
import { uuid } from '../../utils';
import './index.less';

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
    nodeSetting,
  } = props;

  const { parallelExtra } = nodeSetting;

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

  const renderTitle = (item, index) => {
    const defTitle = item?.title || `事件${index}`;
    const title = parallelExtra?.titleKey
      ? item[parallelExtra?.titleKey]
      : defTitle;
    return (
      <div className="item-header">
        <div className="item-title">
          {title && (
            <TextEllipsis
              text={title}
              // rows={1}
              // type="paragraph"
              className="item-content-in"
            />
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
  };

  const renderContent = (item, index) => {
    const value = parallelExtra?.valueKey
      ? item[parallelExtra?.valueKey]
      : item?.value;
    return (
      <div className="item-content">
        {CustomNodeWidget ? (
          <CustomNodeWidget data={item} index={index} />
        ) : (
          <div>
            {value && (
              <div className="item-content-in">
                <TextEllipsis text={value} rows={5} type="paragraph" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
