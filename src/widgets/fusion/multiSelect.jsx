import React from 'react';
import { Select } from '@alifd/next';

const { Option } = Select;

export default function select(p) {
  const onChange = value => p.onChange(p.name, value);
  return (
    <Select
      style={{ width: '100%' }}
      {...p.options}
      mode="multiple"
      disabled={p.disabled}
      value={p.value}
      onChange={onChange}
    >
      {(p.schema.enum || []).map((val, index) => (
        <Option value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: p.schema.enumNames ? p.schema.enumNames[index] : val,
            }}
          />
        </Option>
      ))}
    </Select>
  );
}
