/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import Core from '../../index';
import { useSet } from '../../../hooks';
import { getDataPath, getKeyFromPath, getDisplayValue } from '../../../utils';
import { Button, Table, Drawer, Space, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';
import ErrorMessage from '../../RenderField/ErrorMessage';

const FIELD_LENGTH = 120;

const DrawerList = ({
  displayList = [],
  dataPath,
  dataIndex,
  children,
  deleteItem,
  addItem,
  moveItemDown,
  moveItemUp,
  flatten,
  errorFields,
  getFieldsProps,
}) => {
  const currentIndex = useRef(-1);
  const [state, setState] = useSet({
    showDrawer: false,
  });

  const { showDrawer } = state;

  const dataSource = displayList.map((item, index) => ({
    ...item,
    $idx: index,
  }));

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    const _dataIndex = getKeyFromPath(child);
    return {
      dataIndex: _dataIndex,
      title: schema.required ? (
        <>
          <span className="fr-label-required"> *</span>
          <span>{schema.title}</span>
        </>
      ) : (
        schema.title
      ),
      width: FIELD_LENGTH,
      render: (value, record) => {
        const childPath = getDataPath(child, [record.$idx]);
        const errorObj = errorFields.find(item => item.name == childPath) || {};
        //TODO: 万一error在更深的层，这个办法是find不到的，会展示那一行没有提示。可以整一行加一个红线的方式处理
        return (
          <div>
            <div>{getDisplayValue(value, schema)}</div>
            {errorObj.error && (
              <ErrorMessage message={errorObj.error} schema={schema} />
            )}
          </div>
        );
      },
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 80,
    render: (value, record, idx) => {
      const index = (value && value.$idx) || 0;
      return (
        <Space>
          <a onClick={() => openDrawer(index)}>编辑</a>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => deleteItem(index)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
          {/* <ArrowUp height={18} width={24} onClick={() => moveItemUp(index)} />
          <ArrowDown
            height={18}
            width={24}
            onClick={() => moveItemDown(index)}
          /> */}
        </Space>
      );
    },
  });

  const fieldsProps = getFieldsProps(currentIndex.current);

  const openDrawer = index => {
    currentIndex.current = index;
    setState({
      showDrawer: true,
    });
  };

  const closeDrawer = () => {
    currentIndex.current = -1;
    setState({
      showDrawer: false,
    });
  };

  const handleAdd = () => {
    const newIndex = addItem();
    openDrawer(newIndex);
  };

  return (
    <>
      <div className="w-100 mb2 tr">
        <Button type="primary" size="small" onClick={handleAdd}>
          新增
        </Button>
      </div>
      <Drawer
        width="600"
        title="编辑"
        placement="right"
        onClose={closeDrawer}
        visible={showDrawer}
        destroyOnClose // 必须要加，currentIndex不是一个state，Core不会重新渲染就跪了
      >
        <div className="fr-container">
          <Core {...fieldsProps} />
        </div>
      </Drawer>
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record, idx) => {
          const index = record && record.$idx;
          const hasError = errorFields.find(
            item => item.name.indexOf(`${dataPath}[${index}]`) > -1
          );
          return hasError ? 'fr-row-error' : '';
        }}
        rowKey="$idx"
        size="small"
        pagination={{ size: 'small', hideOnSinglePage: true }}
      />
    </>
  );
};

export default DrawerList;
