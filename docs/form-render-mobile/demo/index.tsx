import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  properties: {
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input',
      required: true,
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
    },
    date: {
      title: '日期',
      type: 'string',
      widget: 'datePicker',
      props: {
        precision: 'month'
      }
    },
    city: {
      title: '城市',
      type: 'array',
      widget: 'cascader',
      props: {
        options: [
          { label: '浙江', value: 1, children: [
            { label: '杭州', value: 2}
          ] },
        ]
      }
    }
  }
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
      widgets={{
        InputNumber: () => {return 1},
        Serialnumber: () => { return 1}
      }}
      footer={
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
      }
    />
  );
}
