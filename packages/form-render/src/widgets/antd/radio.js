import React from 'react';
import { Radio } from 'antd';
import { getArray } from '../../utils';

const Radioes = ({ schema, options: _options, props, ...rest }) => {
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
  const radioProps = {
    options,
    mode: 'multiple',
    ...rest,
  };
  return <Radio.Group {...radioProps} />;
};

export default Radioes;
