import React from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useTools } from '../../../hooks';
import Core from '../../index';

const CardList = ({
  displayList = [],
  listData,
  changeList,
  schema,
  deleteItem,
  copyItem,
  addItem,
  moveItemUp,
  moveItemDown,
  displayType,
  getFieldsProps,
}) => {
  const { props = {}, itemProps, min = 0, max = 9999 } = schema;
  const { methods, widgets } = useTools();

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

  if (props.delConfirmProps && typeof props.delConfirmProps === 'object') {
    delConfirmProps = { ...delConfirmProps, ...props.delConfirmProps };
  }

  addBtnProps.onClick = addItem;

  return (
    <>
      <div className="fr-card-list">
        {displayList.map((item, idx) => {
          const fieldsProps = getFieldsProps(idx);
          fieldsProps.displayType = displayType;
          return (
            <div
              className={`fr-card-item ${
                displayType === 'row' ? 'fr-card-item-row' : ''
              }`}
              key={idx}
            >
              <div className="fr-card-index">
                {/* <>{props.prefix}</> */}
                {idx + 1}
              </div>
              <Core {...fieldsProps} />

              <div direction="horizontal" className="fr-card-toolbar">
                {!props.hideMove && (
                  <>
                    <ArrowUpOutlined
                      style={{ fontSize: 16, marginLeft: 4 }}
                      onClick={() => moveItemUp(idx)}
                    />
                    <ArrowDownOutlined
                      style={{ fontSize: 16, marginLeft: 4 }}
                      onClick={() => moveItemDown(idx)}
                    />
                  </>
                )}
                {!props.hideAdd && !props.hideCopy && (
                  <CopyOutlined
                    style={{ fontSize: 16, marginLeft: 8 }}
                    onClick={() => copyItem(idx)}
                  />
                )}
                {!props.hideDelete && displayList.length > min && (
                  <Popconfirm
                    onConfirm={() => {
                      if (
                        props.onConfirm &&
                        typeof props.onConfirm === 'string'
                      ) {
                        const cb = methods[props.onConfirm];
                        if (typeof cb === 'function') {
                          const result = cb(item, idx);
                          if (!result) {
                            return;
                          }
                        }
                      }
                      deleteItem(idx);
                    }}
                    {...delConfirmProps}
                  >
                    <CloseOutlined style={{ fontSize: 16, marginLeft: 8 }} />
                  </Popconfirm>
                )}
              </div>
            </div>
          );
        })}
      </div>
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
    </>
  );
};

export default CardList;
