import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      description: '这是一个对象类型',
      widget: 'collapse',
      items: [
        {
          title: '基础信息',
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
            },
            input2: {
              title: '输入框 B',
              type: 'string',
            },
            input3: {
              title: '输入框 C',
              type: 'string',
            },
            input4: {
              title: '输入框 D',
              type: 'string',
            }
          }
        },
        {
          title: '其他信息',
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
            },
            input2: {
              title: '输入框 B',
              type: 'string',
            },
            input3: {
              title: '输入框 C',
              type: 'string',
            },
            input4: {
              title: '输入框 D',
              type: 'string',
            }
          }
        }
      ]
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
