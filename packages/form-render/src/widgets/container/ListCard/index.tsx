import React from 'react';
import { Form, Button, Space } from 'antd';
import { PlusOutlined, CloseOutlined,  ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';

const CardList = (props: any) => {
  const { name: listName, schema, form } = props;
  
  return (
    <Form.List name={listName}>
      {(fields, { add, remove, move }) => (
        <div style={{ padding: '0 10px' }}>
          {fields.map(({ key, name  }) => {
            const length = fields.length;
            debugger;
            
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'flex-start', marginTop: name === 0 ? '52px' : 0 }}>
                <div style={{ width: 0, flex: 1}}>
                  {renderCore({ schema, parentPath: [name], parentLitPath: [...listName, name] })}
                </div>
                <Space style={{ padding: '0 20px', height: '32px' }}>
                  <CopyOutlined onClick={() => {
                    const initialValue	 = form.getFieldValue([...listName, name]);
                    add(initialValue);
                  }}/>
                  <CloseOutlined onClick={() => remove(name)} />
                  <ArrowUpOutlined
                    style={{ color: name !== 0 ? '#1890ff' : '#c5c5c5', marginRight: '6px' }}
                    onClick={() => name !== 0 && move(name, name - 1)}
                  />
                  <ArrowDownOutlined
                    style={{ color: name !== length - 1 && length !== 1 ? '#1890ff' : '#c5c5c5'}}
                    onClick={() => name !== length - 1 && length !== 1 && move(name, name + 1)}
                  />
                </Space>
              </div>
            );
          })}
          <Form.Item>
            <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
              新增一条
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
}

export default CardList;
