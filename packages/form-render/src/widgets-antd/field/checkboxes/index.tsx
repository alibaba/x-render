import React from 'react';
import { Checkbox, Space } from 'antd';

interface Option {
  label: string;
  value: string;
  disabled?: boolean
}

interface Props {
  direction: 'vertical' | 'horizontal';
  options: Option[];
  [key: string]: any
}

export default (props: Props) => {
  const { direction = 'horizontal', options = [], ...rest } = props

  if (direction === 'vertical') {
    return <Checkbox.Group {...rest} >
      <Space direction='vertical'>
        {
          options.map((item: Option) => {
            const { value, label, ...rest } = item
            return <Checkbox key={value} value={value} {...rest}>{label}</Checkbox>
          })
        }
      </Space>
    </Checkbox.Group>
  }

  return <Checkbox.Group {...rest} options={options} />;
};
