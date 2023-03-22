import { Space } from 'antd';
import React from 'react';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullScreenIcon';
import ReloadIcon from './ReloadIcon';
import ColumnSetting from './ColumnSetting';

const ToolBar = ({ refresh, ...props }) => {
  return (
    <Space size={14} style={{ fontSize: 18 }}>
      <ReloadIcon refresh={refresh} />
      <DensityIcon />
      <FullScreenIcon {...props} />
      <ColumnSetting />
    </Space>
  );
};

export default ToolBar;
