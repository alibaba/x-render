import React, { useRef, useImperativeHandle} from 'react';
import { Cascader } from 'antd-mobile';
import { omit } from 'lodash-es';

export default (props: any) => {
  const { 
    placeholder = '请选择',
    value,
    onChange,
    options,
    ...rest
  } = omit(props, ['addons', 'schema']);

  const pickerRef: any = useRef(null);
  
  // 使用useImperativeHandle暴露方法给外部
  useImperativeHandle(props.addons.fieldRef, () => ({
    ...pickerRef?.current
  }));
 
  return (
    <Cascader
      {...rest}
      ref={pickerRef}
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
  );
}
