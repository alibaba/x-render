import React from 'react';
import { Select } from '@alifd/next';

const { Option } = Select;

export default function select(p) {
  const onChange = value => p.onChange(p.name, value);
  return (
    <Select
      style={{ width: '100%' }}
      {...p.options}
      disabled={p.disabled}
      value={p.value}
      onChange={onChange}
    >
      {(p.schema.enum || []).map((val, index) => {
        let option = p.schema.enumNames ? p.schema.enumNames[index] : val;
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
    </Select>
  );
}
