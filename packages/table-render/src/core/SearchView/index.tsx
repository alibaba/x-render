import React, { useContext, useEffect } from 'react';
import { SearchProps } from '../../types';
import SearchForm from '../SearchForm';
import { TRContext } from '../../models/context';

const Search: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {

  const {
    hidden,
    onMount,
    onSearch,
    api,
    afterSearch,
    className,
    form,
    refresh,
    ...otherProps
  }  = props;

  const store = useContext(TRContext);

  const { tableState, loading }: any = store.getState();

  const handleMount = async () => {
    if (typeof onMount === 'function') {
      await onMount();
    }
  }

  const handleSearch = (data: any) => {
    if (typeof onSearch === 'function') {
      onSearch(data);
    }
    refresh({ ...data, sorter: tableState?.sorter });
  };

  if (hidden) {
    return null;
  }

  return (
    <SearchForm 
      {...otherProps} 
      form={form}
      loading={loading} 
      onSearch={handleSearch}
      onMount={handleMount}
    />
  );
}

export default Search;
