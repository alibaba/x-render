/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶多选组件
 */

import React from 'react';
import { getArray } from '../base/utils';

export default MultiComponent => p => {
  const { Option } = MultiComponent;
  const onChange = value => p.onChange(p.name, value);
  const style = p.invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const schema = p.schema || {};
  const { items = {} } = schema;
  const { enum: enums, enumNames } = items && items.enum ? items : schema;
  const _value = p.value && Array.isArray(p.value) ? p.value : [];
  return (
    <MultiComponent
      {...p.options}
      style={{ width: '100%', ...style }}
      mode="multiple"
      disabled={p.disabled || p.readOnly}
      value={_value}
      onChange={onChange}
    >
      {getArray(enums).map((val, index) => (
        <Option value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                enumNames && Array.isArray(enumNames) ? enumNames[index] : val,
            }}
          />
        </Option>
      ))}
    </MultiComponent>
  );
};
