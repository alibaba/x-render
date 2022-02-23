import React from 'react';
import { Button, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  CopyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const SimpleList = ({
  addons,
  value = [],
  onChange,
  schema,
  getFieldProps,
  Field,
}) => {
  const {
    deleteItem,
    addItem,
    copyItem,
    moveItemDown,
    moveItemUp,
  } = addons;
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
      <div className="fr-list-1">
        {value.map((item, idx) => {
          const fieldProps = getFieldProps(idx, {
            displayType: 'inline',
          });
          if (props.hideTitle) {
            fieldProps.hideTitle = true;
          }
          return (
            <div key={idx} style={{ display: 'flex' }}>
              <Field {...fieldProps} />
              <div style={{ marginTop: 6 }}>
                {!props.hideDelete && (
                  <Popconfirm
                    title="确定删除?"
                    onConfirm={() => deleteItem(idx)}
                    okText="确定"
                    cancelText="取消"
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
    </div>
  );
};

export default SimpleList;
