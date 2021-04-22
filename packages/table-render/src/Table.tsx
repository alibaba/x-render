import React, {useEffect, useMemo, useRef} from 'react';

import {useDeepCompareEffect, useTable} from './hooks';
import {Table, Radio, Space} from 'antd';

import {columnSort, genColumnKey, genProColumnToColumn, getDate, getDateTime, getMoneyType} from './utils';
import {renderDom} from './field';

import ErrorBoundary from './components/ErrorBoundary';
import ToolBarAction from './components/ToolBarAction';

import {ColumnsState, ProTableProps} from './typing';

const ProTable = (props: ProTableProps) => {
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }
  const {tableState, setTable, doSearch, columnsMap, setColumnsMap, setSortKeyColumns}: any = useTable();
  const {dataSource, pagination, loading, api, tableSize} = tableState;
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  const onPageChange = (page: any, pageSize: any) => {
    setTable({pagination: {...pagination, current: page, pageSize}});
    if (
      !props.pageChangeWithRequest &&
      props.pageChangeWithRequest !== undefined
    )
      return;
    doSearch({current: page, pageSize});
  };

  const {
    headerTitle,
    toolbarRender,
    style = {},
    className = '',
    toolbarAction = false,
  } = props;

  // ---------- 列计算相关 start  -----------------
  const tableColumn = useMemo(() => {
    return genProColumnToColumn({
      columns: props.columns,
      columnsMap,
    }).sort(columnSort(columnsMap));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.columns]);

  /** Table Column 变化的时候更新一下，这个参数将会用于渲染 */
  useDeepCompareEffect(() => {
    if (tableColumn && tableColumn.length > 0) {
      // 重新生成key的字符串用于排序
      const columnKeys = tableColumn.map((item) => genColumnKey(item.key, item.index));
      setSortKeyColumns(columnKeys);
    }
  }, [tableColumn]);

  const columns = useMemo(() => {
    return tableColumn.filter((item) => {
      // 删掉不应该显示的
      const columnKey = genColumnKey(item.key, item.index);
      const config = columnsMap[columnKey];
      if (config && config.show === false) {
        return false;
      }
      return true;
    });
  }, [columnsMap, tableColumn]);

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
          pageSize: props.pagination?.pageSize || pagination.pageSize,
          total: props.pagination?.total || pagination.total,
          current: props.pagination?.current || pagination.current,
        },
    loading,
    size: tableSize,
    columns: columns
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
      setTable({tableSize: props.size});
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
              <TableTitle title={headerTitle}/>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Space align="center">
                <Space size={8} style={{marginRight: 8}}>
                  {Array.isArray(toolbarArray) &&
                  toolbarArray.map((ui, idx) => {
                    return <div key={idx.toString()}>{ui}</div>;
                  })}
                </Space>
                {toolbarAction && <ToolBarAction fullScreen={fullScreen} tableColumn={tableColumn}/>}
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

const TableTitle = ({title}: any) => {
  const {tableState, setTable, doSearch}: any = useTable();
  const {tab, api} = tableState;
  const _tab = tab || 0;
  const onTabChange = (e: any) => {
    const _tab = e.target.value;
    setTable({tab: _tab});
    doSearch({tab: _tab});
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
  return <div className="tr-single-tab"/>; // 给一个空的占位
};
