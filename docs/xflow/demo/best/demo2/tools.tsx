import { Button, Space } from 'antd';
import React from 'react'


export const Tools = () => {
  return (
    <Space className="tools">
      <Button size="small" className="tools-btn" >
        预览
      </Button>
      <Button size="small" className="tools-btn">
        保存
      </Button>
      <Button type="primary" size="small" className="tools-btn">
        立即发布
      </Button>
    </Space>
  );
};
