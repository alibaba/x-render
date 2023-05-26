import React from 'react';
import { SearchForm } from 'form-render';
import { isFunction, _debounce } from '../../utils';
import { SearchProps } from '../../types';

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
      '#': _debounce((value) => {
        form.submit();
        const callBack: any = _watch?.['#'];
        if (isFunction(callBack)) {
          callBack(value);
        }
      }, 300),
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
      schema={otherProps.schema || {}}
    />
  );
}

export default Search;
