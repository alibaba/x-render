/**
 * Created by Tw93 on 2019-12-07.
 * 高阶选择组件
 */

import React from 'react';

export default (SelectComponent) => (p) => {
  const { Option } = SelectComponent;
  const onChange = (value) => p.onChange(value);
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const { enum: enums, enumNames } = p.schema || {};
  return (
    <SelectComponent
      style={{ width: '100%', ...style }}
      {...p.options}
      disabled={p.disabled || p.readonly}
      value={p.value}
      onChange={onChange}
    >
      {(enums || []).map((val, index) => {
        let option = enumNames ? enumNames[index] : val;
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
