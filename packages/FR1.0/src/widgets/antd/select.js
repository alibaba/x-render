import React from 'react';
import { Select } from 'antd';
import { createWidget } from '../../HOC';
import { getArray } from '../../utils';

const mapProps = ({ schema, style, ...rest }) => {
  let options;
  // 如果已经有外部注入的options了，内部的schema就会被忽略
  if (rest && rest.options && Array.isArray(rest.options)) {
    options = rest.options;
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

  return {
    options,
    style: { width: '100%', ...style },
  };
};

const A = props => {
  // if (props.schema.$id === 'allEnum.select') {
  //   console.log(props, 'selectProps');
  // }
  return <Select {...props} />;
};

const Component = createWidget(mapProps)(A);

export default Component;
