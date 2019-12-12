import React from 'react';
import { Checkbox } from '@alifd/next';

export default function checkboxes(p) {
  const { enum: enums, enumNames } = p.schema || {};
  const _value = p.value && Array.isArray(p.value) ? p.value : [];
  // if (p.readonly) {
  //   let displayText = _value.join(',');
  //   if (enumNames) {
  //     const idxs = _value.map(v => enums.indexOf(v));
  //     const nameList = enumNames.filter((e, i) => idxs.indexOf(i) > -1);
  //     displayText = nameList.join(',');
  //   }
  //   return <span>{displayText}</span>;
  // }
  return (
    <Checkbox.Group
      disabled={p.disabled || p.readonly}
      value={_value}
      onChange={values => p.onChange(p.name, values)}
    >
      {(enums || [true, false]).map((val, index) => (
        <Checkbox value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val,
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
