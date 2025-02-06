import { Space } from 'antd';
import React from 'react';
import './index.less';
import TextEllipsis from './TextEllipsis';

const showSwitchNode = ({ data, index }) => {
  const { type, value } = data;
  if (!type && !value) {
    return <div style={{ minHeight: '40px' }}></div>;
  }

  return (
    <Space style={{ width: '100%' }} direction="vertical" className="switch-custom-node">
      {type && (
        <div className="condition-label">
          <div style={{ fontWeight: 600, minWidth: '70px' }}>条件类型：</div>
          <TextEllipsis text={type} />
        </div>
      )}
      {value && (
        <div className="condition-label">
          <div style={{ fontWeight: 600, minWidth: '70px' }}>条件语句：</div>
          <TextEllipsis text={value} />
        </div>
      )}
    </Space>
  );
};

export default showSwitchNode;
