import React from 'react';
import Core from '../../index';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';

const SimpleList = ({
  schema,
  displayList = [],
  listData,
  changeList,
  deleteItem,
  addItem,
  copyItem,
  getFieldsProps,
}) => {
  const { props = {}, itemProps } = schema;
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
              <Popconfirm
                title="确定删除?"
                onConfirm={() => deleteItem(idx)}
                okText="确定"
                cancelText="取消"
              >
                <DeleteOutlined style={{ fontSize: 17, marginLeft: 8 }} />
              </Popconfirm>
              <CopyOutlined
                style={{ fontSize: 15, marginLeft: 8 }}
                onClick={() => copyItem(idx)}
              />
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: displayList.length > 0 ? 0 : 8 }}>
        <Button type="dashed" onClick={addItem}>
          新增一条
        </Button>
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
