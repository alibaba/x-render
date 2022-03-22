import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export default function list(props) {
  if (!/^#/.test(props.schema.$id)) {
    return <div className="w-100">{props.children}</div>;
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
