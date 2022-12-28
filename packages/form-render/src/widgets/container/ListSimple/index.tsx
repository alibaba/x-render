import React from 'react';
import { Form, Button, Space } from 'antd';
import { PlusOutlined, CloseOutlined,  ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';
import classnames from 'classnames'

import './index.less';

const getOperateFixed = (schema: any) => {
  let result = false;
  if (['card', 'collapse', 'lineTitle'].includes(schema.items.theme) && !schema?.items?.props?.extra) {
    result = true;
  }
  return result;
};

const getOperateStyle = (schema: any) => {
  let result: any = {};
  if (['card', 'collapse', 'lineTitle'].includes(schema.items.theme) && !schema?.items?.props?.extra) {
    result.top = '15px';
    if (['lineTitle'].includes(schema.items.theme)) {
      result.top = 0;
      result.padding = 0
    }
  }
  return result;
};

const getHasBackground = (fields: any[], hasBackground: boolean) => {
  let result = hasBackground;
  if (fields.length === 0) {
    result = false;
  }
  return result;
}

const SimpleList = (props: any) => {
  const { name: listName, schema } = props;
  const { max, props: listProps } = schema;
  const { copyable = true, moveable = true, hasBackground = true } = listProps || {};
  const form = Form.useFormInstance();

  const handleOnCopy = (add: any, name: number) => () => {
    const initialValue = form.getFieldValue([...listName, name]);
    add(initialValue);
  };

  return (
    <Form.List name={listName}>
      {(fields, { add, remove, move }) => (
        <div className={classnames('fr-list-card', {'fr-list-card-background' : getHasBackground(fields, hasBackground) })}>
          {fields.map(({ key, name  }) => {
            const length = fields.length;
            return (
              <div key={key} className='fr-list-item'>
                <div style={{ width: 0, flex: 1 }}>
                  {renderCore({ schema, parentPath: [name], rootPath: [...listName, name] })}
                </div>
                <Space className={classnames('fr-list-item-operate', {'fr-list-item-operate-fixed' : getOperateFixed(schema) })} style={getOperateStyle(schema)}>
                  {moveable && (
                    <>
                      <ArrowUpOutlined
                        style={{ color: name !== 0 ? '#1890ff' : '#c5c5c5' }}
                        onClick={() => name !== 0 && move(name, name - 1)}
                      />
                      <ArrowDownOutlined
                        style={{ color: name !== length - 1 && length !== 1 ? '#1890ff' : '#c5c5c5'}}
                        onClick={() => name !== length - 1 && length !== 1 && move(name, name + 1)}
                      />
                    </>
                  )}
                  {copyable && <CopyOutlined onClick={handleOnCopy(add, name)} /> }
                  <CloseOutlined onClick={() => remove(name)} />
                </Space>
              </div>
            );
          })}
          {(!max || fields.length < max) && (
            <div className='add-btn'>
              <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}  block={fields.length > 0 ? true : false } >
                新增一条
              </Button>
            </div>
          )}
        </div>
      )}
    </Form.List>
  );
}

export default SimpleList;
