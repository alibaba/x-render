import React from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, CloseOutlined, ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import classnames from 'classnames'

import './index.less';

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
    style.top = '14px';
    if (['lineTitle'].includes(widgetName)) {
      style.top = '3px';
      style.padding = 0;
    }
    
    if (!schema?.items?.title) {
      style.right = '0';
    }
  }
  return style;
};

const CardList = (props: any) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
    readOnly,
    hasBackground,
    addBtnProps,
    delConfirmProps,

    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,

    addItem,
    copyItem,
    moveItem,
    removeItem,
  } = props;


  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  return (
    <>
      <div className={classnames('fr-list-card', { 'fr-list-card-background': hasBackground })}>
        {fields.map(({ key, name }) => {
          const length = fields.length;
          return (
            <div key={key} className='fr-list-item'>
              <div style={{ width: 0, flex: 1 }}>
                {renderCore({ schema, parentPath: [name], rootPath: [...rootPath, name] })}
              </div>
              {!readOnly && (
                <Space className={classnames('fr-list-item-operate', { 'fr-list-item-operate-fixed': getOperateFixed(schema) })} style={getOperateStyle(schema)}>
                  {!hideMove && (
                    <>
                      <ArrowUpOutlined
                        style={{ color: name !== 0 ? '#1890ff' : '#c5c5c5' }}
                        onClick={() => name !== 0 && moveItem(name, name - 1)}
                      />
                      <ArrowDownOutlined
                        style={{ color: name !== length - 1 && length !== 1 ? '#1890ff' : '#c5c5c5' }}
                        onClick={() => name !== length - 1 && length !== 1 && moveItem(name, name + 1)}
                      />
                    </>
                  )}
                  {!hideCopy && <CopyOutlined onClick={() => handleCopy(name)} />}
                  {!hideDelete && (
                    <Popconfirm
                      onConfirm={() => removeItem(name)}
                      {...delConfirmProps}
                    >
                      <CloseOutlined />
                    </Popconfirm>
                  )}
                </Space>
              )}
            </div>
          );
        })}
        {(!schema.max || fields.length < schema.max) && !hideAdd && (
          <div className='add-btn'>
            <Button
              {...addBtnProps}
              onClick={() => addItem()}
              icon={<PlusOutlined />}
              block={fields.length > 0 ? true : false}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CardList;
