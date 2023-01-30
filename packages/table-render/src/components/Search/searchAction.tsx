import React from 'react';
import { Button } from 'antd';
import { useTable } from '../hooks';

const SearchAction = (props: any) => {
  const {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    form,
    ...rest
  } = props;

  const { tableState = {} }: any = useTable();
  const { loading } = tableState;

  const handleClearSearch = () => {
    form.resetFields();
    form.submit();
  };

  const searchBtnArr = typeof searchBtnRender === 'function' ? searchBtnRender(form.submit, handleClearSearch) : [];

  if (searchBtnRender) {
    return (
      <div className="flex justify-end w-100">
        {Array.isArray(searchBtnArr) &&
          searchBtnArr.map((ui, idx) => {
            return (
              <div key={idx.toString()} style={{ marginLeft: 8 }}>
                {ui}
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className={`flex justify-end w-100 ${searchBtnClassName || ''}`} style={searchBtnStyle}>
      <Button loading={loading} className="mr" type="primary" onClick={form.submit}>
        {rest.searchText}
      </Button>
      <Button onClick={handleClearSearch}>{rest.resetText}</Button>
    </div>
  );
}

export default SearchAction;