import React from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, CloseOutlined,  ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';
import classnames from 'classnames'

import './index.less';

const defaultDelConfirmProps = {
  title: '确定删除?',
  okText: '确定',
  cancelText: '取消',
};

const getOperateFixed = (schema: any) => {
  let fixed = true;

  if (schema?.items?.props?.extra) {
    fixed = false;
  }
  return fixed;
};

const getOperateStyle = (schema: any) => {
  let style: any = {};
  const widgetName = schema?.items?.theme || schema?.items?.widget || 'collapse';
  if (['card', 'collapse', 'lineTitle'].includes(widgetName) && !schema?.items?.props?.extra) {
    style.top = '15px';
    if (['lineTitle'].includes(widgetName)) {
      style.top = '3px';
      style.padding = 0
    }

    if (!schema?.items?.title) {
      style.right = '24px';
    }
  }
  return style;
};

const CardList = (props: any) => {
  const form = Form.useFormInstance();

  const { name: listName, schema = {}, rootPath = [], readyOnly } = props;
  let { hideAdd, hideCopy, hideMove, hideDelete, hasBackground = false, delConfirmProps } = schema.props || {};

  if (readyOnly) {
    hideAdd = true;
    hideCopy = true;
    hideDelete = true;
    hideMove = true;
  }

  const _delConfirmProps = {
    ...defaultDelConfirmProps,
    ...delConfirmProps
  };

  const handleOnCopy = (add: any, name: number) => () => {
    const initialValue = form.getFieldValue([...listName, name]);
    add(initialValue);
  };

  return (
    <Form.List name={listName} initialValue={[{}]}>
      {(fields, { add, remove, move }) => (
        <div className={classnames('fr-list-card', {'fr-list-card-background' : hasBackground })}>
          {fields.map(({ key, name  }) => {
            const length = fields.length;
            return (
              <div key={key} className='fr-list-item'>
                <div style={{ width: 0, flex: 1 }}>
                  {renderCore({ schema:schema, parentPath: [name], rootPath: [...rootPath, ...listName, name] })}
                </div>
                {!readyOnly && (
                  <Space className={classnames('fr-list-item-operate', {'fr-list-item-operate-fixed' : getOperateFixed(schema) })} style={getOperateStyle(schema)}>
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
          {(!schema.max || fields.length < schema.max) && !readyOnly && (
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

export default CardList;
