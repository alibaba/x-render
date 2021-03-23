import React from 'react';
import { Checkbox } from 'antd';

export default function Checkboxes({
  schema,
  value,
  onChange,
  disabled,
  readOnly,
  options,
}) {
  const { enum: enums, enumNames } = schema || {};
  const _value = value && Array.isArray(value) ? value : [];
  if (Array.isArray(enums)) {
    return (
      <Checkbox.Group
        disabled={disabled || readOnly}
        value={_value}
        onChange={onChange}
        {...options}
      >
        {enums.map((val, index) => (
          <Checkbox value={val} key={index}>
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  enumNames && Array.isArray(enumNames)
                    ? enumNames[index]
                    : val,
              }}
            />
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  }
  return null;
}
