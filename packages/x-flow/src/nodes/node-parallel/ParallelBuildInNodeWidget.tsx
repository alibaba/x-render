import { Space, Typography } from 'antd';
import React, { memo } from 'react';
import SourceHandle from '../../components/CustomNode/sourceHandle';
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
  } = props;

  return (
    <Space direction='vertical' className="node-switch-widget" size={5}>
      {(data?.list || [{},{}])?.map((item, index) => (
        <div className="node-switch-widget-item" key={index}>
          <div className="item-header">
            <div className="item-title">
              {`事件${index}` }
            </div>
            <SourceHandle
              position={position}
              isConnectable={isConnectable}
              selected={selected}
              isHovered={isHovered}
              handleAddNode={handleAddNode}
              id={`id_${index}`}
              className="item-handle"
            />
          </div>
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
        </div>
      ))}
    </Space>
  );
});
