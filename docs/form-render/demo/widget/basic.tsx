import React from 'react';
import { Input, Button, Space } from 'antd';
import Form, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '自定义 Input',
      type: 'string',
      widget: 'CaptchaInput',
    },
  },
};

const schema2 = {
  type: 'object',
  maxWidth: 400,
  properties: {
    input1: {
      title: '输入框 1',
      type: 'string',
    },
    obj: {
      type: 'object',
      widget: 'card',
      title: '一级嵌套',
      properties: {
        input2: {
          title: '输入框 2',
          type: 'string'
        }
      }
    },
    list: {
      title: 'List 嵌套',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: 'List.Item',
        properties: {
          input4: {
            title: '输入框 4',
            type: 'string',
          },
          obj: {
            type: 'object',
            widget: 'card',
            title: '一级嵌套',
            properties: {
              input5: {
                title: '输入框 5',
                type: 'string',
              },
              list: {
                type: 'array',
                widget: 'cardList',
                items: {
                  type: 'object',
                  title: '二级 List.Item',
                  properties: {
                    input6: {
                      title: '输入框 6',
                      type: 'string',
                      widget: 'CaptchaInput'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const CaptchaInput = (props: any) => {
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
      schema={schema2}
      widgets={{ CaptchaInput }}
      onFinish={formData => alert(JSON.stringify(formData, null, 2))}
      footer
    />
  );
};

export default Demo;
