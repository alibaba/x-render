import { Space } from 'antd';
import React from 'react';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullScreenIcon';
import ReloadIcon from './ReloadIcon';

const ToolBar = ({ refresh, ...props }) => {
  return (
    <Space size={14} style={{ fontSize: 16, cursor: 'pointer' }}>
      <ReloadIcon refresh={refresh}/>
      <DensityIcon />
      {/* <SettingIcon /> */}
      <FullScreenIcon {...props} />
    </Space>
  );
};

export default ToolBar;
