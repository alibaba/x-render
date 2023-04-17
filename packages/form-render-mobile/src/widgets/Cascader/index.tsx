import React from 'react';
import {Cascader} from 'antd-mobile';
import omit from 'lodash/omit';

export default (props: any) => {
  const { 
    placeholder = '请选择',
    value,
    onChange,
    options,
    setFieldRef, 
  } = props;

  const cascaderProps = omit(props, ['schema', 'addons']);
  
  return (
    <Cascader
      {...cascaderProps}
      ref={ref => setFieldRef(ref)}
      value={value}
      options={options}
      onConfirm={onChange}
    >
      {items => {
        if (items.every(i => i === null)) {
          return <span style={{ color: '#ccc' }}>{placeholder}</span>;
        } else {
          return items.map(i => i?.label ?? '未选择').join('-')
        }
      }}
    </Cascader>
  )
}
