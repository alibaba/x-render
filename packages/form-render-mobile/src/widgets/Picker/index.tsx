import React, { useRef, useImperativeHandle} from 'react';
import { Picker } from 'antd-mobile';
import { omit } from 'lodash-es';

export default (props: any) => {
  const { 
    value, 
    onChange, 
    placeholder = '请选择',
    options,
    columns,
    ...restProps
  } = omit(props, ['addons', 'schema']);

  const pickerRef: any = useRef(null);
  
  // 使用useImperativeHandle暴露方法给外部
  useImperativeHandle(props.addons.fieldRef, () => ({
    ...pickerRef?.current
  }));

  // 只有一列的场景更多，这里兼容下
  const finalColumns = React.useMemo(() => {
    if (columns && columns.length > 0) {
      return columns;
    } else {
      return [options]
    }
  }, [options, columns]);

  return (
    <Picker
      value={value}
      onConfirm={(val: any) => onChange(val)}
      ref={pickerRef}
      columns={finalColumns}
      {...restProps}
    >
      {items => {
        if (items.every(i => i === null)) {
          return <span style={{color: '#ccc'}}>{placeholder}</span>;
        } else {
          return items.map(i => i?.label ?? '未选择').join('-')
        }
      }}
    </Picker>
  )
}
