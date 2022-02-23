/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';
import {
  CloseOutlined,
  CopyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import './CardList.less';

const CardList = ({
  addons,
  value = [],
  onChange,
  schema,
  displayType,
  getFieldProps,
  Field,
}) => {
  const { deleteItem, addItem, copyItem, moveItemDown, moveItemUp } = addons;
  const { props = {} } = schema;

  let addBtnProps = {
    type: 'dashed',
    children: '新增一条',
  };

  if (props.addBtnProps && typeof props.addBtnProps === 'object') {
    addBtnProps = { ...addBtnProps, ...props.addBtnProps };
  }

  return (
    <div className="w-100">
      <div className="fr-card-list">
        {value.map((item, idx) => {
          const fieldProps = getFieldProps(idx);
          return (
            <div
              className={`fr-card-item ${
                displayType === 'row' ? 'fr-card-item-row' : ''
              }`}
              key={idx}
            >
              <div className="fr-card-index">{idx + 1}</div>
              <Field {...fieldProps} />

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
      <div style={{ marginTop: value.length > 0 ? 0 : 8 }}>
        {!props.hideAdd && <Button onClick={addItem} {...addBtnProps} />}
        {Array.isArray(props.buttons)
          ? props.buttons.map((item, idx) => {
              const { callback, text, html } = item;
              let onClick = () => {
                console.log({
                  value,
                  onChange,
                  schema,
                });
              };
              if (typeof window[callback] === 'function') {
                onClick = () => {
                  window[callback]({
                    value,
                    onChange,
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

export default CardList;
