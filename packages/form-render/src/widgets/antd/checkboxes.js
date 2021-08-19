import React from 'react';
import { Checkbox } from 'antd';
import { getArray } from '../../utils';

const Checkboxes = ({ schema, options: _options, ...rest }) => {
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

  const checkboxesProps = {
    options,
    mode: 'multiple',
    ...rest,
  }
  return <Checkbox.Group {...checkboxesProps} />
}
  
export default Checkboxes;
