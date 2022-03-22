/**
 * transform: true
 * defaultShowCode: true
 */
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';
import RichTextEditor from '../../widgets/RichText/src';
import { fakeApi } from './advanced/utils';

const Demo = () => {
  const form = useForm();

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const schema = {
    type: 'object',
    properties: {
      input1: {
        title: '简单输入框',
        type: 'string',
        required: true,
      },
      obj: {
        title: '对象',
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
      listName2: {
        title: '对象数组',
        description: '对象数组嵌套功能',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            input1: {
              title: '简单输入框',
              type: 'string',
              required: true,
            },
            select1: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            },
            obj: {
              title: '对象',
              type: 'object',
              properties: {
                input1: {
                  title: '简单输入框',
                  type: 'string',
                  required: true,
                },
                listName2: {
                  title: '对象数组',
                  description: '对象数组嵌套功能',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      input1: {
                        title: '简单输入框',
                        type: 'string',
                        required: true,
                      },
                      select1: {
                        title: '单选',
                        type: 'string',
                        enum: ['a', 'b', 'c'],
                        enumNames: ['早', '中', '晚'],
                      },
                      obj: {
                        title: '对象',
                        type: 'object',
                        properties: {
                          input1: {
                            title: '简单输入框',
                            type: 'string',
                            required: true,
                          },
                          select1: {
                            title: '单选',
                            type: 'string',
                            enum: ['a', 'b', 'c'],
                            enumNames: ['早', '中', '晚'],
                          },
                        },
                      },
                    },
                  },
                },
                select1: {
                  title: '单选',
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumNames: ['早', '中', '晚'],
                },
              },
            },
          },
        },
      },
    },
  };

  const onMount = () => {
    // form.setValues({ a: 1 });
  };

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        widgets={{
          richText: RichTextEditor,
        }}
        debug
        onMount={onMount}
        onFinish={onFinish}
      />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
