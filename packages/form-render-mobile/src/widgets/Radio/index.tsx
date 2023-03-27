import React from 'react'
import { Radio, Space } from 'antd-mobile'

export default () => {
  return (
    <Radio.Group defaultValue='1'>
      <Space direction='horizontal' wrap={true}>
        <Radio value='1'>第一项</Radio>
        <Radio value='2'>第二项</Radio>
        <Radio value='3'>第三项</Radio>
      </Space>
    </Radio.Group>
  )
}