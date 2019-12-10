/**
 * Created by Tw93 on 2019-12-07.
 * 单选输入组件
 */

import React from 'react';

export default (p, onChange) => RadioComponent => {
  const RadioGroup = RadioComponent.Group;
  return class extends React.Component {
    render() {
      const { enum: enums, enumNames } = p.schema || {};
      if (p.readonly) {
        let displayText = p.value;
        if (enumNames) {
          const idx = enums.indexOf(p.value);
          displayText = enumNames[idx];
        }
        return <span>{displayText}</span>;
      }
      return (
        <RadioGroup disabled={p.disabled} value={p.value} onChange={onChange}>
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
    }
  };
};
