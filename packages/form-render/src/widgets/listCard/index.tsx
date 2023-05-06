import React from 'react';
import { Button, Space, Popconfirm, Divider } from 'antd';
import { PlusOutlined, CloseOutlined, ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import FButton from '../components/FButton';
import { cloneDeep } from 'lodash-es';
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
    hasBackground,
    operateBtnType,
    
    addBtnProps,
    delConfirmProps,
    copyBtnProps,
    deleteBtnProps,
    moveUpBtnProps,
    moveDownBtnProps,

    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,

    addItem,
    copyItem,
    moveItem,
    removeItem
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
          const newSchema = cloneDeep(schema);
          if (newSchema.items.title && typeof newSchema.items.title === 'string') {
            newSchema.items.title += ` ${name + 1}`;
          }
          return (
            <div key={key} className='fr-list-item'>
              <div style={{ width: 0, flex: 1 }}>
                {renderCore({ schema: newSchema, parentPath: [name], rootPath: [...rootPath, name] })}
              </div>
              <Space
                className={classnames('fr-list-item-operate', { 'fr-list-item-operate-fixed': getOperateFixed(schema) })}
                style={getOperateStyle(schema)}
                split={operateBtnType !== 'icon' && <Divider type='vertical' />}
              >
                {!hideMove && (
                  <>
                    <FButton
                      disabled={name === 0}
                      onClick={() => moveItem(name, name - 1)}
                      icon={<ArrowUpOutlined />}
                      {...moveUpBtnProps}
                    />
                    <FButton
                      disabled={name === length - 1}
                      onClick={() => moveItem(name, name + 1)}
                      icon={<ArrowDownOutlined />}
                      {...moveDownBtnProps}
                    />
                  </>
                )}
                {!hideDelete && (
                  <Popconfirm
                    onConfirm={() => removeItem(name)}
                    {...delConfirmProps}
                  >
                    <FButton
                      icon={<CloseOutlined />}
                      {...deleteBtnProps}
                    />
                  </Popconfirm>
                )}
                {!hideCopy && (
                  <FButton
                    onClick={() => handleCopy(name)}
                    icon={<CopyOutlined />}
                    {...copyBtnProps}
                  />
                )}
              </Space>
            </div>
          );
        })}
        {!hideAdd && (
          <div className='fr-list-add-btn'>
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