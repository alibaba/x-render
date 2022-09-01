/* eslint-disable jsx-a11y/anchor-is-valid */
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import React from 'react';
import Core from '../../index';

const FIELD_LENGTH = 170;

const TableList = ({
  displayList = [],
  dataIndex,
  children,
  deleteItem,
  copyItem,
  addItem,
  moveItemUp,
  moveItemDown,
  flatten,
  schema,
  listData,
  changeList,
}) => {
  const { props = {}, itemProps = {} } = schema;
  const { buttons, ...columnProps } = itemProps;
  const { pagination = {}, ...rest } = props;

  let actionColumnProps = {
    colHeaderText: '操作',
    copyText: '复制',
    delText: '删除',
  };

  let delConfirmProps = {
    title: '确定删除?',
    okText: '确定',
    cancelText: '取消',
  };

  let addBtnProps = {
    type: 'primary',
    children: '新增一条',
    size: 'small',
  };

  if (props.actionColumnProps && typeof props.actionColumnProps === 'object') {
    actionColumnProps = { ...actionColumnProps, ...props.actionColumnProps };
  }

  if (props.delConfirmProps && typeof props.delConfirmProps === 'object') {
    delConfirmProps = { ...delConfirmProps, ...props.delConfirmProps };
  }

  if (props.addBtnProps && typeof props.addBtnProps === 'object') {
    addBtnProps = { ...addBtnProps, ...props.addBtnProps };
  }

  const paginationConfig = pagination && {
    size: 'small',
    hideOnSinglePage: true,
    ...pagination,
  };

  const dataSource = displayList.map((item, idx) => {
    return { index: idx };
  });

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    return {
      dataIndex: child,
      title: schema.required ? (
        <>
          <span className="fr-label-required"> *</span>
          <span>{schema.title}</span>
        </>
      ) : (
        schema.title
      ),
      width: FIELD_LENGTH,
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
      ...columnProps,
    };
  });

  if (
    !props.hideDelete ||
    !props.hideAdd ||
    !props.hideCopy ||
    !props.hideMove
  ) {
    columns.push({
      title: actionColumnProps.colHeaderText,
      key: '$action',
      fixed: 'right',
      width: 120,
      render: (value, record) => {
        const idx = record.index;
        return (
          <div>
            {!props.hideAdd && !props.hideCopy && (
              <a onClick={() => copyItem(idx)}>{actionColumnProps.copyText}</a>
            )}
            {!props.hideDelete && (
              <Popconfirm
                onConfirm={() => deleteItem(idx)}
                {...delConfirmProps}
              >
                <a style={{ marginLeft: 8 }}>{actionColumnProps.delText}</a>
              </Popconfirm>
            )}
            {!props.hideMove && (
              <>
                <ArrowUpOutlined
                  style={{ color: '#1890ff', fontSize: 16, marginLeft: 8 }}
                  onClick={() => moveItemUp(idx)}
                />
                <ArrowDownOutlined
                  style={{ color: '#1890ff', fontSize: 16, marginLeft: 8 }}
                  onClick={() => moveItemDown(idx)}
                />
              </>
            )}
          </div>
        );
      },
    });
  }

  return (
    <>
      <div className="w-100 mb2 tr">
        {!props.hideAdd && <Button {...addBtnProps} onClick={addItem} />}
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
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={dataSource}
        rowKey="index"
        size="small"
        pagination={paginationConfig}
        {...rest}
      />
    </>
  );
};

export default TableList;
