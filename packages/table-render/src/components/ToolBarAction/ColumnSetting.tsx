import React from 'react';
import { Checkbox, Tree, Popover, ConfigProvider, Tooltip } from 'antd';
import {
  SettingOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';

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
