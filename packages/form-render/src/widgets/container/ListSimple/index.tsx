import React from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, CloseOutlined,  ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';
import classnames from 'classnames'

import './index.less';


const getHasBackground = (fields: any[], hasBackground: boolean) => {
  let result = hasBackground;
  if (fields.length === 0) {
    result = false;
  }
  return result;
}

let defaultDelConfirmProps = {
  title: '确定删除?',
  okText: '确定',
  cancelText: '取消',
};

const SimpleList = (props: any) => {
  const { name: listName, schema, rootPath = [], readyOnly } = props;
  const { max } = schema;
  let { hideAdd, hideCopy, hideMove, hideDelete, hasBackground = false, delConfirmProps } = schema.props || {};

  if (readyOnly) {
    hideAdd = true;
    hideCopy = true;
    hideDelete = true;
    hideMove = true;
  }

  if (!schema.items.layout) {
    schema.items.layout = 'inline';
  }

  const form = Form.useFormInstance();

  const handleOnCopy = (add: any, name: number) => () => {
    const initialValue = form.getFieldValue([...listName, name]);
    add(initialValue);
  };

  const _delConfirmProps = {
    ...defaultDelConfirmProps,
    ...delConfirmProps
  };


  return (
    <Form.List name={listName}>
      {(fields, { add, remove, move }) => (
        <div className={classnames('fr-list-simple', {'fr-list-simple-background' : getHasBackground(fields, hasBackground) })}>
          {fields.map(({ key, name  }) => {
            const length = fields.length;
            return (
              <div key={key} className='fr-list-item'>
                {renderCore({ schema, parentPath: [name], rootPath: [...rootPath, ...listName, name] })}
                {!readyOnly && (
                  <Space className={classnames('fr-list-item-operate')}>
                    {!hideMove && (
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
                    {!hideCopy && <CopyOutlined onClick={handleOnCopy(add, name)} /> }
                    {!hideDelete && (
                      <Popconfirm
                        onConfirm={() => remove(name) }
                        {..._delConfirmProps}
                      >
                      <CloseOutlined  />
                    </Popconfirm>
                    )}
                  </Space>
                )}
              </div>
            );
          })}
          {(!max || fields.length < max) && !hideAdd && (
            <div className='add-btn'>
              <Button 
                type='dashed' 
                onClick={() => add()} 
                icon={<PlusOutlined />}
                block={fields.length > 0 ? true : false }
              >
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
