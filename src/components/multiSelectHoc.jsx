/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶多选组件
 */

import React from 'react';

export default p => MultiComponent => {
  const { Option } = MultiComponent;
  const onChange = value => p.onChange(p.name, value);
  return class extends React.Component {
    render() {
      return (
        <MultiComponent
          {...p.options}
          style={{ width: '100%' }}
          mode="multiple"
          disabled={p.disabled}
          value={p.value}
          onChange={onChange}
        >
          {(p.schema.enum || []).map((val, index) => (
            <Option value={val} key={index}>
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: p.schema.enumNames ? p.schema.enumNames[index] : val,
                }}
              />
            </Option>
          ))}
        </MultiComponent>
      );
    }
  };
};
