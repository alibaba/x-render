import React from 'react';
import { Picker } from 'antd-mobile';

export default (props: any) => {
  const { 
    value, 
    onChange, 
    setFieldRef,
    placeholder = '请选择',
    options,
    columns,
    ...restProps
  } = props;

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
      ref={ref => setFieldRef(ref)}
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
