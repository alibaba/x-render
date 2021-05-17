/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import { Button, Popconfirm, Table } from 'antd';
import { useVT } from 'virtualizedtableforantd4';

const FIELD_LENGTH = 120;

const VirtualList = ({
  displayList = [],
  dataIndex,
  children,
  deleteItem,
  addItem,
  flatten,
  schema,
  listData,
  changeList,
}) => {
  const { props = {}, itemProps = {} } = schema;
  const { scrollY = 600 } = props;

  const [vt, set_components] = useVT(() => ({ scroll: { y: scrollY } }), []);

  const dataSource = displayList.map((item, idx) => {
    return { index: idx };
  });

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    return {
      dataIndex: child,
      width: FIELD_LENGTH,
      title: schema.required ? (
        <>
          <span className="fr-label-required"> *</span>
          <span>{schema.title}</span>
        </>
      ) : (
        schema.title
      ),
      render: (value, record, index) => {
        // Check: record.index 似乎是antd自己会给的，不错哦
        const childIndex = [...dataIndex, record.index];
        return (
          <Core
            hideTitle={true}
            displayType="inline"
            key={index.toString()}
            id={child}
            dataIndex={childIndex}
          />
        );
      },
    };
  });

  if (!props.hideDelete || Array.isArray(itemProps.buttons)) {
    columns.push({
      title: '操作',
      key: '$action',
      fixed: 'right',
      render: (value, record, idx) => {
        return (
          <>
            {!props.hideDelete && (
              <Popconfirm
                title="确定删除?"
                onConfirm={() => deleteItem(idx)}
                okText="确定"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
            )}
            {Array.isArray(itemProps.buttons)
              ? itemProps.buttons.map((item, idx) => {
                  const { callback, text, html } = item;
                  let onClick = () => {};
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
                    <a
                      key={idx.toString()}
                      style={{ marginLeft: 8 }}
                      size="small"
                      onClick={onClick}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: html || text }}
                      />
                    </a>
                  );
                })
              : null}
          </>
        );
      },
    });
  }

  return (
    <>
      <div className="w-100 mb2 tr">
        {!props.hideAdd && (
          <Button type="primary" size="small" onClick={addItem}>
            新增
          </Button>
        )}
        {Array.isArray(props.buttons)
          ? props.buttons.map((item, idx) => {
              const { callback, text, html } = item;

              let onClick = () => {};
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
                  size="small"
                  onClick={onClick}
                >
                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                </Button>
              );
            })
          : null}
      </div>

      <Table
        rowKey="index"
        scroll={{ y: scrollY, x: 'max-content' }}
        components={vt}
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default VirtualList;
