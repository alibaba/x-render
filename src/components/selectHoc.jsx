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
      return (
        <SelectComponent
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
        </SelectComponent>
      );
    }
  };
};
