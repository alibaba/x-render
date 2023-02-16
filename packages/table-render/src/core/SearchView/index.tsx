import React, { useContext, useEffect } from 'react';
import { SearchProps } from '../../types';
import SearchForm from '../SearchForm';

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
    getState,
    ...otherProps
  }  = props;


  const { loading, sorter }: any = getState();

  const handleMount = async () => {
    if (typeof onMount === 'function') {
      await onMount();
    }
  }

  const handleSearch = (data: any) => {
    if (typeof onSearch === 'function') {
      onSearch(data);
    }
    refresh({ ...data, sorter });
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
