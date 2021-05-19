import React, { useEffect, useRef } from 'react';

import { useTable } from './hooks';
import { Table, Radio, Space } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import { getDate, getDateTime, getMoneyType } from './utils';
import { renderDom } from './field';

import ErrorBoundary from './components/ErrorBoundary';
import ToolBarAction from './components/ToolBarAction';

import { ProTableProps } from './typing';

const ProTable = (props: ProTableProps) => {
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用searchApi，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }
  const { tableState, setTable, doSearch }: any = useTable();
  const { dataSource, pagination, loading, searchApi, tableSize } = tableState;
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  const onPageChange = (page: any, pageSize: any) => {
    setTable({ pagination: { ...pagination, current: page, pageSize } });
    doSearch({ current: page, pageSize });
  };

  const {
    headerTitle,
    toolbarRender,
    columns,
    style = {},
    className = '',
    toolbarAction = false,
  } = props;

  columns.map((item: any) => {
    const result = item;
    // 用户在columns中自定义的render会覆盖tr的预设render
    if (result.render) return result;

    switch (result.valueType) {
      case 'date':
        result.render = (value: any) => renderDom(getDate(value), result);
        break;
      case 'dateTime':
        result.render = (value: any) => renderDom(getDateTime(value), result);
        break;
      case 'money':
        result.render = (value: any) => renderDom(getMoneyType(value), result);
        break;
      case 'code':
        result.render = (value: any) => renderDom(value, result);
        break;
      case 'text':
      default:
        result.render = (value: any) => renderDom(value, result);
    }
    return result;
  });
  const tableProps = {
    ...props,
    // dataSource不准在使用ProTable时用props赋值
    dataSource,
    pagination:
      props.pagination === false
        ? false
        : {
            onChange: onPageChange,
            size: 'small',
            ...props.pagination,
            pageSize: pagination.pageSize,
            total: pagination.total,
            current: pagination.current,
          },
    loading,
    size: tableSize,
  };

  const toolbarArray =
    typeof toolbarRender === 'function' ? toolbarRender() : [];
  const showTableTop =
    headerTitle ||
    (toolbarArray && toolbarArray.length) ||
    Array.isArray(searchApi);

  const fullScreen = () => {
    return Promise.resolve(rootRef.current?.requestFullscreen());
  };

  useEffect(() => {
    if (props.size) {
      setTable({ tableSize: props.size });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div
        className={`tr-table-wrapper ${className}`}
        style={style}
        ref={rootRef}
      >
        {
          <div
            className={showTableTop ? 'tr-table-top' : 'tr-table-top-nohead'}
          >
            <div className="tr-table-title">
              <TableTitle title={headerTitle} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Space align="center">
                <Space size={8} style={{ marginRight: 8 }}>
                  {Array.isArray(toolbarArray) &&
                    toolbarArray.map((ui, idx) => {
                      return <div key={idx.toString()}>{ui}</div>;
                    })}
                </Space>
                {toolbarAction && <ToolBarAction fullScreen={fullScreen} />}
              </Space>
            </div>
          </div>
        }
        <Table {...tableProps} />
      </div>
    </ErrorBoundary>
  );
};

export default ProTable;

const TableTitle = ({ title }: any) => {
  const { tableState, setTable, doSearch }: any = useTable();
  const { tab, searchApi } = tableState;
  const _tab = tab || 0;
  const onTabChange = (e: any) => {
    const _tab = e.target.value;
    setTable({ tab: _tab });
    doSearch({ tab: _tab });
  };

  if (typeof searchApi === 'function')
    return <div className="tr-single-tab">{title}</div>;
  if (searchApi && Array.isArray(searchApi)) {
    if (searchApi.length === 1)
      return <div className="tr-single-tab">{searchApi[0].name}</div>;
    return (
      <>
        <Radio.Group onChange={onTabChange} value={_tab}>
          {searchApi.map((item, i) => {
            return (
              <Radio.Button key={i.toString()} value={i}>
                {item.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        {title && <div className="tr-extra-tab">{title}</div>}
      </>
    );
  }
  return <div className="tr-single-tab" />; // 给一个空的占位
};
