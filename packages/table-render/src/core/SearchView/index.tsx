import React from 'react';
import { SearchProps } from '../../types';
import { SearchForm } from 'form-render';
import { isFunction } from '../../utils'

const Search: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {

  const {
    refresh,
    getState,
    onMount,
    watch: _watch,
    mode,
    form,
    ...otherProps
  }  = props;

  const { loading, sorter }: any = getState();

  let watch = { ..._watch };
  if (mode === 'simple') {
    watch = {
      '#': (value) => {
        form.submit();
        const callBack: any = _watch['#'];
        if (isFunction(callBack)) {
          callBack(value);
        }
      },
      ..._watch,
    }
  }

  const handleMount = async () => {
    if (typeof onMount === 'function') {
      await onMount();
    }
  };

  const handleSearch = (data: any) => {
    refresh({ ...data, sorter });
  };

  return (
    <SearchForm 
      {...otherProps}
      mode={mode}
      form={form}
      watch={watch}
      loading={loading} 
      onSearch={handleSearch}
      onMount={handleMount}
    />
  );
}

export default Search;
