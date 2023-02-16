import React from 'react';
import { SearchProps } from '../../types';
import SearchForm from '../SearchForm';

const Search: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {

  const {
    refresh,
    getState,
    onMount,
    onSearch,
    ...otherProps
  }  = props;

  const { loading, sorter }: any = getState();

  const handleMount = async () => {
    if (typeof onMount === 'function') {
      await onMount();
    }
  };

  const handleSearch = (data: any) => {
    if (typeof onSearch === 'function') {
      onSearch(data);
    }
    refresh({ ...data, sorter });
  };

  return (
    <SearchForm 
      {...otherProps} 
      loading={loading} 
      onSearch={handleSearch}
      onMount={handleMount}
    />
  );
}

export default Search;
