import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

export default function list(props) {
  if (!/^#/.test(props.schema.$id)) {
    return props.children;
  }

  return (
    <div className="flex flex-column">
      <div className="fr-set w-100 flex flex-column ba pt4 pb2 ph2 relative b--black-10">
        {props.children}
        <Button
          size="small"
          className="self-end"
          type="dashed"
          icon={<DeleteOutlined />}
        >
          删除
        </Button>
      </div>
      <Button size="small" className="self-end" icon={<PlusCircleOutlined />}>
        添加
      </Button>
    </div>
  );
}
