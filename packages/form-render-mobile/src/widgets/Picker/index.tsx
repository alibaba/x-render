import React from 'react';
import { Picker } from 'antd-mobile';

export default (props: any) => {
  const { 
    value, 
    onChange, 
    setFieldRef,
    placeholder = '请选择',
    ...restProps
  } = props;

  return (
    <Picker
      value={value}
      onConfirm={(val: any) => onChange(val)}
      ref={ref => setFieldRef(ref)}
      {...restProps}
    >
      {items => {
        if (items.every(i => i === null)) {
          return placeholder;
        } else {
          return items.map(i => i?.label ?? '未选择').join('-')
        }
      }}
    </Picker>
  )
}
