import React from 'react';
import { Tag } from 'antd';

const CustomGroupTitle = ({ logData }) => {
  return (
    <div className="log-detail-panel-title" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="log-detail-panel-title-text">
          {logData?.groupTitle}
        </span>
        <Tag color="blue" style={{ marginLeft: 8 }}>自定义分组标题</Tag>
      </div>
      <div className="log-detail-panel-title-line" />
    </div>
  );
};

export default CustomGroupTitle;
