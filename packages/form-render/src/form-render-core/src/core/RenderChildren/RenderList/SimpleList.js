import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useTools } from '../../../hooks';
import Core from '../../index';

const SimpleList = ({
  schema,
  displayList = [],
  listData,
  changeList,
  deleteItem,
  addItem,
  copyItem,
  moveItemUp,
  moveItemDown,
  getFieldsProps,
}) => {
  const { props = {}, itemProps, min = 0, max = 99999 } = schema;
  const { widgets } = useTools();

  const CustomAddBtn = widgets[schema['add-widget']];

  const AddWidget = CustomAddBtn || Button;

  let addBtnProps = {
    type: 'dashed',
    children: '新增一条',
  };

  let delConfirmProps = {
    title: '确定删除?',
    okText: '确定',
    cancelText: '取消',
  };

  if (props.addBtnProps && typeof props.addBtnProps === 'object') {
    addBtnProps = { ...addBtnProps, ...props.addBtnProps };
  }

  addBtnProps.onClick = addItem;

  if (props.delConfirmProps && typeof props.delConfirmProps === 'object') {
    delConfirmProps = { ...delConfirmProps, ...props.delConfirmProps };
  }

  return (
    <div className="fr-list-1">
      {displayList.map((item, idx) => {
        const fieldsProps = getFieldsProps(idx);
        fieldsProps.displayType = 'inline';
        if (props.hideTitle) {
          fieldsProps.hideTitle = true;
        }
        return (
          <div key={idx} style={{ display: 'flex' }}>
            <Core {...fieldsProps} />
            <div style={{ marginTop: 6 }}>
              {!props.hideDelete && displayList.length > min && (
                <Popconfirm
                  onConfirm={() => deleteItem(idx)}
                  {...delConfirmProps}
                >
                  <DeleteOutlined style={{ fontSize: 17, marginLeft: 8 }} />
                </Popconfirm>
              )}
              {!props.hideAdd && !props.hideCopy && (
                <CopyOutlined
                  style={{ fontSize: 15, marginLeft: 8 }}
                  onClick={() => copyItem(idx)}
                />
              )}
              {!props.hideMove && (
                <>
                  <ArrowUpOutlined
                    style={{ fontSize: 16, marginLeft: 8 }}
                    onClick={() => moveItemUp(idx)}
                  />
                  <ArrowDownOutlined
                    style={{ fontSize: 16, marginLeft: 8 }}
                    onClick={() => moveItemDown(idx)}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: displayList.length > 0 ? 0 : 8 }}>
        {!props.hideAdd && displayList.length < max && (
          <AddWidget {...addBtnProps} />
        )}
        {Array.isArray(props.buttons)
          ? props.buttons.map((item, idx) => {
              const { callback, text, html } = item;
              let onClick = () => {
                console.log({
                  value: listData,
                  onChange: changeList,
                  schema,
                });
              };
              if (typeof window[callback] === 'function') {
                onClick = () => {
                  window[callback]({
                    value: listData,
                    onChange: changeList,
                    schema,
                  });
                };
              }
              return (
                <Button
                  key={idx.toString()}
                  style={{ marginLeft: 8 }}
                  type="dashed"
                  onClick={onClick}
                >
                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                </Button>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SimpleList;
