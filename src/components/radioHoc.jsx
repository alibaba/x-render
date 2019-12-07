/**
 * Created by Tw93 on 2019-12-07.
 * 单选输入组件
 */

import React from 'react';

export default p => RadioComponent => {
  const RadioGroup = RadioComponent.Group;
  return class extends React.Component {
    render() {
      return (
        <RadioGroup
          disabled={p.disabled}
          value={p.value}
          onChange={v => p.onChange(p.name, v)}
        >
          {(p.schema.enum || [true, false]).map((val, index) => (
            <RadioComponent value={val} key={index}>
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: p.schema.enumNames ? p.schema.enumNames[index] : val,
                }}
              />
            </RadioComponent>
          ))}
        </RadioGroup>
      );
    }
  };
};
