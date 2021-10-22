/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import Core from '../../index';
import { useSet } from '../../../hooks';
import { getDataPath, getKeyFromPath, getDisplayValue } from '../../../utils';
import { Button, Table, Drawer, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ErrorMessage from '../../RenderField/ErrorMessage';

const FIELD_LENGTH = 170;

const DrawerList = ({
  displayList = [],
  dataPath,
  children,
  deleteItem,
  addItem,
  moveItemDown,
  moveItemUp,
  flatten,
  errorFields,
  getFieldsProps,
  schema,
  changeList,
  listData,
}) => {
  const { props = {}, itemProps = {} } = schema;
  const { buttons, ...columnProps } = itemProps;
  const { pagination = {}, ...rest } = props;

  const paginationConfig = pagination && {
    size: 'small',
    hideOnSinglePage: true,
    ...pagination,
  };

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
      ...columnProps,
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 120,
    render: (value, record, idx) => {
      const index = (value && value.$idx) || 0;
      return (
        <div>
          <a onClick={() => openDrawer(index)}>编辑</a>
          {!props.hideDelete && (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => deleteItem(index)}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 8 }}>删除</a>
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
        {!props.hideAdd && (
          <Button type="primary" size="small" onClick={handleAdd}>
            新增
          </Button>
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
                  size="small"
                  onClick={onClick}
                >
                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                </Button>
              );
            })
          : null}
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
        size="small"
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
        pagination={paginationConfig}
        {...rest}
      />
    </>
  );
};

export default DrawerList;
