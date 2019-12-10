/**
 * Created by Tw93 on 2019-12-07.
 * 抽离数字输入组件
 */

import React from 'react';

export default p => NumberComponent => {
  return class extends React.Component {
    render() {
      if (p.readonly) {
        return <span>{p.value === (undefined || '') ? '-' : p.value}</span>;
      }

      const { max, min, step } = p.schema;
      let obj = {};
      if (max || max === 0) {
        obj = { max };
      }

      if (min || min === 0) {
        obj = { ...obj, min };
      }

      if (step) {
        obj = { ...obj, step };
      }

      const onChange = value => {
        p.onChange(p.name, value);
      };

      return (
        <NumberComponent
          {...p.options}
          {...obj}
          style={{ width: '100%' }}
          value={p.value}
          disabled={p.disabled}
          onChange={onChange}
        />
      );
    }
  };
};
