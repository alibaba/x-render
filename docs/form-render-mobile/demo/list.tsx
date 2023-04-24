import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';
import { Button, Dialog } from 'antd-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        widget: 'card',
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
          input3: {
            title: '输入框 B',
            type: 'string',
            widget: 'input',
          },
        },
      },
    },
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
  );
};
