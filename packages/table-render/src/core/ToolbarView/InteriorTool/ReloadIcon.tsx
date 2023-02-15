import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

const ReloadIcon = ({ refresh }) => {
  return (
    <Tooltip title="刷新">
      <ReloadOutlined onClick={() => refresh()} />
    </Tooltip>
  );
};

export default ReloadIcon;
