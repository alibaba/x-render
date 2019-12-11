/**
 * Created by Tw93 on 2019-12-07.
 * 高阶选择组件
 */

import React from 'react';

export default p => SelectComponent => {
  const { Option } = SelectComponent;
  const onChange = value => p.onChange(p.name, value);
  return class extends React.Component {
    render() {
      const style = p.invalid ? { borderColor: '#f5222d' } : {};
      const { enum: enums, enumNames } = p.schema || {};
      // if (p.readonly) {
      //   let displayText = p.value;
      //   if (enumNames) {
      //     const idx = enums.indexOf(p.value);
      //     displayText = enumNames[idx];
      //   }
      //   return <span>{displayText}</span>;
      // }
      return (
        <SelectComponent
          style={{ width: '100%', ...style }}
          {...p.options}
          disabled={p.disabled || p.readonly}
          value={p.value}
          onChange={onChange}
        >
          {(enums || []).map((val, index) => {
            let option = enumNames ? enumNames[index] : val;
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
        </SelectComponent>
      );
    }
  };
};
