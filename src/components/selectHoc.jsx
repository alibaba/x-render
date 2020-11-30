/**
 * Created by Tw93 on 2019-12-07.
 * 高阶选择组件
 */

import React from 'react';
import { getArray } from '../base/utils';

export default SelectComponent => p => {
  const { Option } = SelectComponent;
  const onChange = value => p.onChange(p.name, value);
  const style = p.invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const { enum: enums, enumNames } = p.schema || {};
  return (
    <SelectComponent
      style={{ width: '100%', ...style }}
      {...p.options}
      disabled={p.disabled || p.readOnly}
      value={p.value}
      onChange={onChange}
    >
      {getArray(enums).map((val, index) => {
        let option =
          enumNames && Array.isArray(enumNames) ? enumNames[index] : val;
        const isHtml = typeof option === 'string' && option[0] === '<';
        if (isHtml) {
          option = <span dangerouslySetInnerHTML={{ __html: option }} />;
        }
        return (
          <Option value={val} key={index}>
            {option}
          </Option>
        );
      })}
    </SelectComponent>
  );
};
