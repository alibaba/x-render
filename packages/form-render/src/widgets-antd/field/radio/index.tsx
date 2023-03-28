import React from 'react';
import { Radio, Space } from 'antd';

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  direction: 'vertical' | 'horizontal',
  options: string[] | number[] | Option[]
  [key: string]: any
}

export default (props: Props) => {
  const { direction = 'horizontal', options = [], ...rest } = props

  if (direction === 'vertical') {
    return <Radio.Group {...rest} >
      <Space direction='vertical'>
        {
          options.map((item: Option) => {
            const { value, label, ...rest } = item
            return <Radio key={value} value={value} {...rest}>{label}</Radio>
          })
        }
      </Space>
    </Radio.Group>
  }

  return <Radio.Group {...rest} options={options} />;
};
