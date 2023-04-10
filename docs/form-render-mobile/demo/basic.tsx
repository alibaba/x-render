import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  properties: {
    date: {
      title: '日期',
      type: 'string',
      widget: 'datePicker',
      props: {
        precision: 'month'
      }
    },
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input',
      required: true,
    },
    textarea: {
      title: '长文本',
      type: 'string',
      widget: 'textArea'
    },
    slider: {
      title: '滑动条',
      type: 'string',
      widget: 'slider'
    },
    switch: {
      title: '开关',
      type: 'bool',
      widget: 'switch'
    },
    stepper: {
      title: '步进器',
      type: 'number',
      widget: 'stepper'
    },
    rate: {
      title: '评分',
      type: 'string',
      widget: 'rate'
    },
    selector: {
      title: '选择组',
      type: 'string',
      widget: 'selector',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    },
    radio: {
      title: '单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};


export default () => {
  const form = useForm();

  const onFinish = (formData) => {
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
}
