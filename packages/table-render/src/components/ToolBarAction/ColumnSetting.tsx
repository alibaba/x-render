import { SettingOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import React from 'react';

const ColumnSetting = props => {
  return (
    <Popover
      arrowPointAtCenter
      title="列设置"
      trigger="click"
      placement="bottomRight"
      content="列设置"
    >
      <Tooltip title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
};
export default ColumnSetting;
