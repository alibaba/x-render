import React from 'react';
import { Input, Space } from 'antd';
import Form, { useForm } from 'form-render';
import type { WidgetProps } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    age: {
      title: '年龄',
      type: 'string',
      props: {
        style: {
          width: 200
        }
      }
    },
    name: {
      title: '姓名',
      type: 'string',
      widget: 'MyInput',
      dependencies: ['age'],
    },
  }
}

const MyInput: React.FC<WidgetProps> = (props) => {
  const { value, onChange, addons } = props;
  const { dependValues } = addons;
  const [age] = dependValues;

  return (
    <Space>
      <Input
        style={{ width: 200 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div>{age}</div>
    </Space>
  );
};

const Demo = () => {
  const form = useForm();
  return (
    <Form
      form={form}
      schema={schema}
      widgets={{ MyInput }}
    />
  );
};

export default Demo;
