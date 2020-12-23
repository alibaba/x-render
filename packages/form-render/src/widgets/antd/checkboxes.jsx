import React from 'react';
import { Checkbox } from 'antd';
import { getArray } from '../../base/utils';

export default function checkboxes(p) {
  const schema = p.schema || {};
  const { items = {} } = schema;
  const { enum: enums, enumNames } = items && items.enum ? items : schema;
  const _value = p.value && Array.isArray(p.value) ? p.value : [];
  return (
    <Checkbox.Group
      disabled={p.disabled || p.readOnly}
      value={_value}
      onChange={values => p.onChange(p.name, values)}
    >
      {getArray(enums, [true, false]).map((val, index) => (
        <Checkbox value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                enumNames && Array.isArray(enumNames) ? enumNames[index] : val,
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
