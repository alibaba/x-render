import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  displayType: 'row',
  column: 3,
  properties: {
    ruleName: {
      title: '铺货规则名称',
      type: 'string',
    },
    ruleType: {
      title: '规则类型',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '有效', value: '1' },
          { label: '下线', value: '2' },
          { label: '删除', value: '3' }
        ]
      }
    },
    supplierId: {
      title: '供应商 Id',
      type: 'string',
    },
    select3: {
      title: '酒店',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    },
    sellerId: {
      title: '铺货店铺',
      type: 'string'
    },

    status: {
      title: '规则状态',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    },
    dateRange: {
      title: '生效起止时间',
      bind: ['effDateStart', 'effDateEnd'],
      type: 'range',
      format: 'date',
    },
    effWeekDays: {
      title: '生效起止时间',
      type: 'array',
      items: {
        type: 'string',
      },
      widget: 'multiSelect',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    },
    obj: {
      type: 'object',
      widget: 'card',
      title: '规则设置',
      labelWidth: 100,
      column: 3,
      properties: {
        obj1: {
          type: 'object',
          widget: 'subInline',
          title: '规则一',
          displayType: 'inline',
          hasBackground: false,
          noStyle: true,
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
              placeholder: '输入框 A'
            },
            input2: {
              title: '输入框 B',
              type: 'string',
              placeholder: '输入框 B'
            },
            input3: {
              title: '输入框 C',
              type: 'string',
              placeholder: '输入框 c'
            }
          }
        },
        obj2: {
          type: 'object',
          widget: 'subInline',
          title: '规则二',
          displayType: 'inline',
          hasBackground: false,
          noStyle: true,
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
              placeholder: '输入框 A'
            },
            input2: {
              title: '输入框 B',
              type: 'string',
              placeholder: '输入框 B'
            },
            input3: {
              title: '输入框 C',
              type: 'string',
              placeholder: '输入框 c'
            }
          }
        },
        obj3: {
          type: 'object',
          widget: 'subInline',
          title: '规则二',
          column: 3,
          displayType: 'inline',
          hasBackground: false,
          noStyle: true,
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
              placeholder: '输入框 A'
            },
            input2: {
              title: '输入框 B',
              type: 'string',
              placeholder: '输入框 B'
            },
            input3: {
              title: '输入框 C',
              type: 'string',
              placeholder: '输入框 c'
            }
          }
        }
      }
    }
  },
};

const Demo = () => {
  const form = useForm();
  const [visible, setVisible] = useState();

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <div>
      <Modal
       open={visible}
       onCancel={() => setVisible(false)}
       destroyOnClose={true}
      >
        <FormRender
          displayType='row'
          form={form}
          schema={schema}
        
          onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
          debug={true}
        />
      </Modal>
      
      <Button onClick={() => setVisible(true)} type='primary'>提交</Button>
    </div>
  );
};

export default Demo;
