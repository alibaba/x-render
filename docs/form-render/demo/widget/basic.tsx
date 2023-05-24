import React from 'react';
import { Input, Button, Space } from 'antd';
import Form, { useForm } from 'form-render';
import type { WidgetProps } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    phone: {
      title: '自定义 Input',
      type: 'string',
      widget: 'CaptchaInput',
      foo: 'xxx',
      props: {
        foo: 'xxxx',
      }
    },
  },
};

const CaptchaInput: React.FC<WidgetProps> = (props) => {
  const { value, onChange } = props;
  console.log('widget props:', props);

  const sendCaptcha = (phone: string) => {
    console.log('send captcha to:', phone);
  }

  return (
    <Space>
      <Input
        value={value}
        placeholder="请输入手机号"
        onChange={(e) => onChange(e.target.value)}
      />
      <Button onClick={() => sendCaptcha(value)}>发送验证码</Button>
    </Space>
  );
};

const Demo = () => {
  const form = useForm();
  return (
    <Form
      form={form}
      schema={schema}
      widgets={{ CaptchaInput }}
      onFinish={formData => alert(JSON.stringify(formData, null, 2))}
      footer
    />
  );
};

export default Demo;
