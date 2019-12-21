/**
 * Created by Tw93 on 2019-12-07.
 * 抽离数字输入组件
 */

import React from 'react';

export default NumberComponent => p => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
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
      {...obj}
      style={{ width: '100%', ...style }}
      disabled={p.disabled || p.readonly}
      {...p.options}
      value={p.value}
      onChange={onChange}
    />
  );
};
