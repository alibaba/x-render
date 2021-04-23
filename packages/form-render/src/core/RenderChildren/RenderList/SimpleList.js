import React from 'react';
import Core from '../../index';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';

const SimpleList = ({
  schema,
  displayList = [],
  dataIndex,
  deleteItem,
  addItem,
  copyItem,
  getFieldsProps,
}) => {
  return (
    <div className="fr-list-1">
      {displayList.map((item, idx) => {
        const fieldsProps = getFieldsProps(idx);
        fieldsProps.displayType = 'inline';
        if (schema.props && schema.props.hideTitle) {
          fieldsProps.hideTitle = true;
        }
        return (
          <div key={idx} style={{ display: 'flex' }}>
            <Core {...fieldsProps} />
            <div style={{ marginTop: 6 }}>
              <Popconfirm
                title="确定删除?"
                onConfirm={() => deleteItem(idx)}
                okText="确定"
                cancelText="取消"
              >
                <DeleteOutlined style={{ fontSize: 17, marginLeft: 8 }} />
              </Popconfirm>
              <CopyOutlined
                style={{ fontSize: 15, marginLeft: 8 }}
                onClick={() => copyItem(idx)}
              />
            </div>
          </div>
        );
      })}
      <Button
        style={{ marginTop: displayList.length > 0 ? 0 : 8 }}
        type="dashed"
        onClick={addItem}
      >
        新增一条
      </Button>
    </div>
  );
};

export default SimpleList;
