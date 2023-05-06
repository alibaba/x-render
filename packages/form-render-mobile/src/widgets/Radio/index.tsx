import React from 'react';
import { Radio, Space } from 'antd-mobile';
import { filterWidgetProps } from '../../utils';

export default (props: any) => {
  const { options, ...rest } = filterWidgetProps(props);
  return (
    <Radio.Group  {...rest}>
      <Space direction='horizontal' wrap={true}>
        {options.map((item: any) => {
          return <Radio value={item.value} key={item.value}>{item.label}</Radio>
        })}
      </Space>
    </Radio.Group>
  )
}