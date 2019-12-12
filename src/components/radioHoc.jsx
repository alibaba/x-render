/**
 * Created by Tw93 on 2019-12-07.
 * 单选输入组件
 */

import React from 'react';

export default (p, onChange, RadioComponent) => {
  const RadioGroup = RadioComponent.Group;
  const { enum: enums, enumNames } = p.schema || {};
  return (
    <RadioGroup
      disabled={p.disabled || p.readonly}
      value={p.value}
      onChange={onChange}
    >
      {(enums || [true, false]).map((val, index) => (
        <RadioComponent value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val,
            }}
          />
        </RadioComponent>
      ))}
    </RadioGroup>
  );
};
