import React, { useEffect } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import FormRender from 'form-render';

import ActionView from './ActionView';
import { SearchProps } from '../../types';
import './index.less';

const SearchForm: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {
  if (props.hidden) {
    return;
  }
  const {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    searchText = '查询',
    resetText = '重置',

    searchWithError = true,
    searchOnMount = true,
    style = {},
    className,

    form,
    schema,
    propsSchema,
    widgets,
    hidden,
    api,
    onMount,
    onSearch,
    afterSearch,
    ...otherProps
  } = props;

  const actionProps = {
    searchBtnRender,
    style: searchBtnStyle,
    className: searchBtnClassName,
    searchText,
    resetText,
    form
  };

  useEffect(() => {
    initMount();
  }, []);

  const initMount = async () => {
    if (!searchOnMount) {
      return;
    }

    if (typeof onMount === 'function') {
      await onMount();
    }

    form.submit();
  };

  const handleFinish = (values: any) => {
    onSearch(values);
  };

  const handleFinishFailed = ({ values }) => {
    if (!searchWithError) {
      return;
    }
    onSearch(values);
  };

  const handleKeyDown = (ev: any) => {
    if (ev.keyCode === 13) {
      form.submit();
    }
  };

  return (
    <div
      className={classnames('tr-search', { [className] : !!className })}
      style={style}
      onKeyDown={handleKeyDown}
    >
      <FormRender
        displayType='row'
        column={3}
        {...otherProps}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        schema={schema || propsSchema}
        widgets={widgets}
        operateExtra={(
          <Col className='search-action-col'>
            <ActionView {...actionProps} />
          </Col>
        )}
      />
    </div>
  );
}

export default SearchForm;

