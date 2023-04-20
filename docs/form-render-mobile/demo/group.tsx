import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    group1: {
      type: 'object',
      widget: 'group',
      title: '分组1',
      properties: {
        input: {
          title: '输入框 A',
          type: 'string',
          widget: 'input',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
          widget: 'input',
        },
      },
    },
    group2: {
      type: 'object',
      widget: 'group',
      title: '分组2',
      description: '这是一个对象类型',
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
          widget: 'input',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
          widget: 'input',
        },
      },
    },
    group3: {
      type: 'object',
      widget: 'group',
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
          widget: 'input',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
          widget: 'input',
        },
      },
    }
  },
};


export default () => {
  const form = useForm();

  const onFinish = (formData: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(formData, null, 2)}</pre>,
    })
  };

  return (
    <div>
      <FormRender
        schema={schema}
        form={form}
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      />
    </div>
  );
}
