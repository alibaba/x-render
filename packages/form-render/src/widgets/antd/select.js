import * as React from 'react';
import { Select } from 'antd';
import { isUndefined } from 'lodash-es';
import { getArray } from '../../utils';
import { useTools } from '../../form-render-core/src/hooks';

const FrSelect = ({
  schema,
  style,
  value,
  onChange,
  options: _options,
  addons,
  ...rest
}) => {
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

  const handleChange = val => {
    let _val = !isUndefined(val) ? val : null;
    onChange(_val);
  };

  const finalProps = {
    value,
    options,
    style: { width: '100%', ...style },
    onChange: handleChange,
    ...rest,
  };

  if (rest.showSearch && !!schema.props.onSearch && typeof schema.props.onSearch === 'string') {
    finalProps.onSearch = search => {
      const _onSearch = methods[schema.props.onSearch] || addons.watch[schema.props.onSearch];
      if (typeof _onSearch === 'function') _onSearch(search);
    };
  }

  return (
    <>
      <Select defaultValue={value} {...finalProps} />
    </>
  );
};

export default FrSelect;
