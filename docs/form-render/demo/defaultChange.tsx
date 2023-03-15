import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  column: 3,
  properties: {
    input1: {
      bind: 'a.b.c',
      title: 'Field A',
      type: 'string',
      required: true,
      //default: '1111',
      defaultValue: '1111sss'
    },
    input2: {
      title: 'Field B',
      type: 'string',
      required: true,
      default: '{{formData.input1}}'
    },
    obj: {
      type: 'object',
      title: '卡片主题',
      widget: 'card',
      description: '这是一个对象类型',
      column: 3,
      properties: {
        input1: {
          title: 'Field A',
          type: 'string',
        },
        input2: {
          title: 'Field B',
          type: 'string',
          default: '{{formData.obj.input1}}'
        }
      }
    },
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
      default: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'lineTitle',
        properties: {
          input1: {
            title: 'Field A',
            type: 'string',
          },
          input2: {
            title: 'Field B',
            type: 'string',
            default: '{{rootValue.input1}}'
          },
          obj: {
            type: 'object',
            title: '卡片主题',
            widget: 'card',
            description: '这是一个对象类型',
            column: 3,
            properties: {
              input1: {
                title: 'Field A',
                type: 'string',
              },
              input2: {
                title: 'Field B',
                type: 'string',
                default: '{{formData.obj.input1}}'
              },
              list: {
                title: '对象数组',
                description: '对象数组嵌套功能',
                type: 'array',
                widget: 'cardList',
                items: {
                  type: 'object',
                  title: '卡片主题',
                  description: '这是一个对象类型',
                  column: 3,
                  widget: 'lineTitle',
                  properties: {
                    input1: {
                      title: 'Field A',
                      type: 'string',
                    },
                    input2: {
                      title: 'Field B',
                      type: 'string',
                      default: '{{rootValue.input1}}'
                    }
                  }
                }
              }
            }
          },
          // list: {
          //   title: '对象数组',
          //   description: '对象数组嵌套功能',
          //   type: 'array',
          //   widget: 'cardList',
          //   items: {
          //     type: 'object',
          //     title: '卡片主题',
          //     description: '这是一个对象类型',
          //     column: 3,
          //     widget: 'lineTitle',
          //     properties: {
          //       input1: {
          //         title: 'Field A',
          //         type: 'string',
          //       },
          //       input2: {
          //         title: 'Field B',
          //         type: 'string',
          //         default: '{{rootValue.input1}}'
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }
};

const Demo = () => {
  const form = useForm();

  const beforeFinish: any = ({ data, errors, schema }) => {
    if (data.objectName && data.objectName.input1 === '123') return;
    return delay(1000).then(() => {
      return {
        name: 'objectName.select1',
        error: ['外部校验错误'],
      };
    });
  };

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <div>
      <FormRender
        displayType='row'
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
        debug={true}
        widgets={{
          title: ({ children }) => {
            return children;
          }
        }}
      />
      <Button onClick={form.submit} type='primary'>提交</Button>
    </div>
  );
};

export default Demo;
