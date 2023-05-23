import React from 'react';
import { Input, } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;

const CustomTextArea = props => {
  const { dependValues } = props;

  console.log(dependValues, 'dependValues');

  return <TextArea rows={dependValues?.[0] || 2} />;
};

export default () => {
  const form = useForm();

  const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      // title: '对象数组',
      // description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        properties: {
          input1: {
            title: '密码',
            type: 'string',
            required: true,
          },
          input2: {
            title: '确认密码',
            type: 'string',
            dependencies: ['list[].list[].input1'],
            required: true,
            rules: [
              { 
                validator: (_, value, { form }) => {
                  if (!value || form.getFieldValue(['list', 0, 'input1']) === value) {
                    return true;
                  }
                  return false;
                }, 
                message: '你输入的两个密码不匹配' 
              }
            ]
          },
          list: {
            // title: '对象数组',
            // description: '对象数组嵌套功能',
            type: 'array',
            widget: 'cardList',
            items: {
              type: 'object',
              title: '卡片主题',
              description: '这是一个对象类型',
              column: 3,
              properties: {
                input1: {
                  title: '密码',
                  type: 'string',
                  required: true,
                },
                input2: {
                  title: '确认密码',
                  type: 'string',
                  dependencies: ['list[].input1'],
                  required: true,
                  rules: [
                    { 
                      validator: (_, value, { form }) => {
                        if (!value || form.getFieldValue(['list', 0, 'input1']) === value) {
                          return true;
                        }
                        return false;
                      }, 
                      message: '你输入的两个密码不匹配' 
                    }
                  ]
                }
              },
            },
          },
        },
      },
    },
    // obj: {
    //   type: 'object',
    //   title: '卡片主题',
    //   description: '这是一个对象类型',
    //   widget: 'collapse',
    //   column: 3,
    //   properties: {
    //     input1: {
    //       title: '密码',
    //       type: 'string',
    //       required: true,
    //     },
    //     input2: {
    //       title: '确认密码',
    //       type: 'string',
    //       dependencies: [['obj', 'input1']],
    //       required: true,
    //       rules: [
    //         { 
    //           validator: (_, value, { form }) => {
    //             debugger;
    //             if (!value || form.getFieldValue(['obj', 'input1']) === value) {
    //               return true;
    //             }
    //             return false;
    //           }, 
    //           message: '你输入的两个密码不匹配' 
    //         }
    //       ]
    //     }
    //   }
    // }
    
  }
};

  return (
    <FormRender
      form={form}
      schema={schema}
      widgets={{ CustomTextArea }}
      labelWidth={200}
      maxWidth={400}
    />
  );
}