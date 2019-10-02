import React from 'react';
import { Checkbox } from '@alifd/next';

export default function checkboxes(p) {
  return (
    <Checkbox.Group
      disabled={p.disabled}
      value={p.value}
      onChange={values => p.onChange(p.name, values)}
    >
      {(p.schema.enum || [true, false]).map((val, index) => (
        <Checkbox value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: p.schema.enumNames ? p.schema.enumNames[index] : val,
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
