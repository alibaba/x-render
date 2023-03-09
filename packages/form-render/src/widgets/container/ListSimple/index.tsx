import React from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, CloseOutlined, ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

const getHasBackground = (fields: any[], hasBackground: boolean) => {
  let result = hasBackground;
  if (fields.length === 0) {
    result = false;
  }
  return result;
}

const SimpleList = (props: any) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
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

  if (!schema.items.displayType) {
    schema.items.displayType = 'inline';
    schema.items.inlineMode = true;
  }

  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  return (
    <div className={classnames('fr-list-simple', { 'fr-list-simple-background': getHasBackground(fields, hasBackground) })}>
      {fields.map(({ key, name }) => {
        const length = fields.length;
        return (
          <div key={key} className='fr-list-item'>
            {renderCore({ schema, parentPath: [name], rootPath: [...rootPath, name] })}
            <Space className={classnames('fr-list-item-operate')} >
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

          </div>
        );
      })}
      {(!schema.max || fields.length < schema.max) && !hideAdd && (
        <Button
          className='add-btn'
          icon={<PlusOutlined />}
          onClick={addItem}
          block={fields.length > 0 ? true : false}
          {...addBtnProps}
        />
      )}
    </div>
  );
}

export default SimpleList;
