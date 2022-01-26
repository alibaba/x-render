import React from 'react';
import { useTable } from '../hooks';
import { Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const ReloadIcon = () => {
  const { refresh }: any = useTable();

  return (
    <Tooltip title="刷新">
      <ReloadOutlined onClick={() => refresh()} />
    </Tooltip>
  );
};

export default ReloadIcon;
