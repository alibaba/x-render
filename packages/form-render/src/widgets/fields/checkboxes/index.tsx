import React from 'react';
import { Checkbox, Space } from 'antd';
import withFieldWrap from '../../utils/withFieldWrap';

interface Option {
  label: string;
  value: string;
  disabled?: boolean
}

interface Props {
  direction: 'row' | 'column';
  options: Option[];
  [key: string]: any
}
const Checkboxes: React.FC<Props> = (props) => {
  const { direction = 'row', options = [], ...rest } = props

  if (direction === 'column') {
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

export default withFieldWrap(Checkboxes);
