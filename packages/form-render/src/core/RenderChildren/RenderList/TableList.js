/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import { Button, Table, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';

const FIELD_LENGTH = 120;

const TableList = ({
  displayList = [],
  dataIndex,
  children,
  deleteItem,
  addItem,
  flatten,
}) => {
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
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 60,
    render: (value, record, idx) => {
      return (
        <Popconfirm
          title="确定删除?"
          onConfirm={() => deleteItem(idx)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      );
    },
  });

  return (
    <>
      <div className="w-100 mb2 tr">
        <Button type="primary" size="small" onClick={addItem}>
          新增
        </Button>
      </div>
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={dataSource}
        rowKey="index"
        size="small"
        pagination={{ size: 'small', hideOnSinglePage: true }}
      />
    </>
  );
};

export default TableList;
