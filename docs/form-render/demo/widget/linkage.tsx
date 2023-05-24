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
      props: {
        // 当 age 字段更新时，自定义组件 MyInput 会接收到最新的 age 属性
        age: '{{ formData.age }}'
      }
    },
  }
}

const MyInput: React.FC<WidgetProps> = (props) => {
  const { value, onChange, age } = props;

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
