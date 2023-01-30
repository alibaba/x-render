import React, { useEffect } from 'react';
import { Col } from 'antd';

import FormRender from 'form-render';
import { SearchProps } from '../../types';
import { useTable } from '../hooks';
import SearchAction from './searchAction';

const Search: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {

  const {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    searchText = '查询',
    resetText = '重置',
    searchWithError = true,
    style = {},
    widgets,
    searchOnMount = true,
    hidden,
    schema,
    propsSchema,
    onMount,
    onSearch,
    api,
    afterSearch,
    className,
    ...otherProps
  } = props;

  const { refresh, syncMethods, form, tableState }: any = useTable();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    syncMethods({
      searchApi: api,
      syncAfterSearch: afterSearch,
    });

    if (!searchOnMount) {
      return;
    }

    if (hidden) {
      refresh();
    }

    if (typeof onMount === 'function') {
      await onMount();
    }

    form.submit();
  }

  if (hidden) {
    return null;
  }

  const btnProps = {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    searchText,
    resetText,
    form,
  };

  const onFinish = (values: any) => {
    doSearch(values);
  };

  const onFinishFailed = ({ values }) => {
    if (!searchWithError) {
      return;
    }
    doSearch(values);
  }

  const doSearch = (data: any) => {
    if (typeof onSearch === 'function') {
      onSearch(data);
    }
    refresh({ ...data, sorter: tableState?.sorter });
  };

  return (
    <div
      className={`tr-search ${className}`}
      style={style}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          form.submit();
        }
      }}
    >
      <FormRender
        displayType='row'
        {...otherProps}
        column={3}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        schema={schema || propsSchema}
        widgets={widgets}
        operateExtra={(
          <Col className='search-action-col'>
            <SearchAction {...btnProps} />
          </Col>
        )}
      />
    </div>
  );
}

export default Search;
