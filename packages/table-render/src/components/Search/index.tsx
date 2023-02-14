import React from 'react';
import { SearchProps } from '../../types';
import { useTable } from '../hooks';
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
    ...otherProps
  }  = props;

  const { refresh, syncMethods, form, tableState }: any = useTable();
  const { loading } = tableState;

  const handleMount = async () => {
    syncMethods({
      searchApi: api,
      syncAfterSearch: afterSearch,
    });

    if (hidden) {
      refresh();
    }

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
