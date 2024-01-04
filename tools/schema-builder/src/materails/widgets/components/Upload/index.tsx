import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default (props: any) => {

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  );
}

