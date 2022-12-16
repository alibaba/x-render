import * as React from 'react';
import { Select } from 'antd';
import { getArray } from '../../utils';
import { useTools } from '../../form-render-core/src/hooks';


const MultiSelect = ({ schema, value, style, options: _options, ...rest }) => {
  const { methods } = useTools();

  let options;
  // 如果已经有外部注入的options了，内部的schema就会被忽略
  if (_options && Array.isArray(_options)) {
    options = _options;
  } else {
    const { enum: enums, enumNames } = schema || {};
    options = getArray(enums).map((item, idx) => {
      let label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
      const isHtml = typeof label === 'string' && label[0] === '<';
      if (isHtml) {
        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
      }
      return { label, value: item };
    });
  }

  const selectProps = {
    options,
    mode: 'multiple',
    style: { width: '100%', ...style },
    ...rest,
  };

  if (rest.showSearch && !!schema.props.onSearch && typeof schema.props.onSearch === 'string') {
    selectProps.onSearch = search => {
      const _onSearch = methods[schema.props.onSearch];
      if (typeof _onSearch === 'function') _onSearch(search);
    };
  }


  const _value = Array.isArray(value) ? value : undefined;

  return <Select value={_value} {...selectProps} />;
};

export default MultiSelect;
