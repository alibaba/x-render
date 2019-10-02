import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export default function radio(p) {
  return (
    <RadioGroup
      disabled={p.disabled}
      value={p.value}
      onChange={e => p.onChange(p.name, e.target.value)}
    >
      {(p.schema.enum || [true, false]).map((val, index) => (
        <Radio value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: p.schema.enumNames ? p.schema.enumNames[index] : val,
            }}
          />
        </Radio>
      ))}
    </RadioGroup>
  );
}
