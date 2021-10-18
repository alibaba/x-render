/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import { Button, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';
import {
  CloseOutlined,
  CopyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

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
  const { props = {}, itemProps } = schema;

  let addBtnProps = {
    type: 'dashed',
    children: '新增一条',
  };

  if (props.addBtnProps && typeof props.addBtnProps === 'object') {
    addBtnProps = { ...addBtnProps, ...props.addBtnProps };
  }

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
              <div className="fr-card-index">{idx + 1}</div>
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
                {!props.hideDelete && (
                  <Popconfirm
                    title="确定删除?"
                    onConfirm={() => deleteItem(idx)}
                    okText="确定"
                    cancelText="取消"
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
        {!props.hideAdd && <Button onClick={addItem} {...addBtnProps} />}
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
