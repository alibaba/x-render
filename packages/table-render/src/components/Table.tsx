import { Radio, Space, Table, TableProps } from 'antd';
import React, { useEffect, useRef } from 'react';
import { TableRenderProps } from '../types';
import { getDate, getDateTime, getMoneyType } from '../utils';
import ErrorBoundary from './ErrorBoundary';
import { renderDom } from './field';
import { useTable } from './hooks';
import ToolBarAction from './ToolBarAction';

const ProTable: <RecordType extends object = any>(
  props: TableRenderProps<RecordType>
) => React.ReactElement = props => {
  //@ts-ignore
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }
  const { tableState, setTable, doSearch } = useTable();
  const { dataSource, pagination, loading, api, tableSize } = tableState;
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  const onChange = ({ current, pageSize }, filters, sorter) => {
    setTable({ pagination: { ...pagination, current, pageSize }, sorter });
    if (
      !props.pageChangeWithRequest &&
      props.pageChangeWithRequest !== undefined
    )
      return;
    doSearch({ current, pageSize, sorter });
  };

  const {
    debug,
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

  const tableProps: TableProps<typeof dataSource[number]> = {
    ...props,
    onChange,
    // dataSource不准在使用ProTable时用props赋值
    dataSource,
    pagination:
      props.pagination === false
        ? false
        : {
            // onChange: onPageChange,
            size: 'small',
            ...props.pagination,
            pageSize: props.pagination?.pageSize || pagination.pageSize,
            total: props.pagination?.total || pagination.total,
            current: props.pagination?.current || pagination.current,
          },
    loading,
    size: tableSize,
  };

  const toolbarArray =
    typeof toolbarRender === 'function' ? toolbarRender() : [];
  const showTableTop =
    headerTitle || (toolbarArray && toolbarArray.length) || Array.isArray(api);

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
        id="tr-table"
      >
        {debug ? (
          <div className="mv2 bg-black-05 pa2 br2">
            <div>{'dataSource:' + JSON.stringify(dataSource)}</div>
            {/* <div>{'pagination:' + JSON.stringify(pagination)}</div> */}
          </div>
        ) : null}
        {
          <div
            className={showTableTop ? 'tr-table-top' : 'tr-table-top-nohead'}
          >
            <div className="tr-table-title">
              <TableTitle title={headerTitle} {...props} />
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

const TableTitle = ({ title, ...rest }: any) => {
  const { tableState, setTable, doSearch } = useTable();
  const { tab, api } = tableState;
  const _tab = tab || 0;
  const onTabChange = (e: any) => {
    if (rest.onTabChange && typeof rest.onTabChange === 'function') {
      return rest.onTabChange(e);
    }
    const _tab = e.target.value;
    setTable({ tab: _tab });
    doSearch({ tab: _tab });
  };

  if (typeof api === 'function')
    return <div className="tr-single-tab">{title}</div>;
  if (api && Array.isArray(api)) {
    if (api.length === 1)
      return <div className="tr-single-tab">{api[0].name}</div>;
    return (
      <>
        <Radio.Group onChange={onTabChange} value={_tab}>
          {api.map((item, i) => {
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
