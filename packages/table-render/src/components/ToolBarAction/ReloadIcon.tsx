import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { useTable } from '../hooks';

const ReloadIcon = () => {
  const { refresh }: any = useTable();

  return (
    <Tooltip title="刷新">
      <ReloadOutlined onClick={() => refresh()} />
    </Tooltip>
  );
};

export default ReloadIcon;
