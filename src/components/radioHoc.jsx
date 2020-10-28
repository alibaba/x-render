/**
 * Created by Tw93 on 2019-12-07.
 * 单选输入组件
 */

import React from 'react';

const getArray = data => {
  if (Array.isArray(data)) return data;
  throw Error("type of your 'enum' is not array");
};

export default p => {
  const Radio = p.Radio;
  const RadioGroup = p.Radio.Group;
  const { enum: enums, enumNames } = p.schema || {};
  return (
    <RadioGroup
      disabled={p.disabled || p.readonly}
      value={p.value}
      onChange={p.onChange}
    >
      {getArray(enums).map((val, index) => (
        <Radio value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames && getArray(enumNames) ? enumNames[index] : val,
            }}
          />
        </Radio>
      ))}
    </RadioGroup>
  );
};
