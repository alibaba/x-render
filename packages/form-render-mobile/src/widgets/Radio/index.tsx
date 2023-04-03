import React from 'react'
import { Radio, Space } from 'antd-mobile'

export default ({ options, ...props }) => {
  return (
    <Radio.Group  {...props}>
      <Space direction='horizontal' wrap={true}>
        {options.map((item) => {
          return <Radio value={item.value} key={item.value}>{item.label}</Radio>
        })}
      </Space>
    </Radio.Group>
  )
}