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
      const { enum: enums, enumNames } = p.schema || {};
      const _value = p.value && Array.isArray(p.value) ? p.value : [];
      if (p.readonly) {
        let displayText = _value.join(',');
        if (enumNames) {
          const idxs = _value.map(v => enums.indexOf(v));
          const nameList = enumNames.filter((e, i) => idxs.indexOf(i) > -1);
          displayText = nameList.join(',');
        }
        return <span>{displayText}</span>;
      }
      return (
        <MultiComponent
          {...p.options}
          style={{ width: '100%' }}
          mode="multiple"
          disabled={p.disabled}
          value={_value}
          onChange={onChange}
        >
          {(enums || []).map((val, index) => (
            <Option value={val} key={index}>
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: enumNames ? enumNames[index] : val,
                }}
              />
            </Option>
          ))}
        </MultiComponent>
      );
    }
  };
};
