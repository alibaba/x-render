import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  properties: {
    cascader: {
      title: '级联',
      type: 'array',
      widget: 'cascader',
      props: {
        options: [
          { 
            label: '浙江', 
            value: 1, 
            children: [
              { label: '杭州', value: 2 }
            ]
          },
        ]
      }
    },
    picker: {
      title: '选择',
      type: 'string',
      widget: 'picker',
      props: {
        options: [
          { label: '火车', value: 1 },
          { label: '飞机', value: 2 },
          { label: '火箭', value: 3 }
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
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input',
      required: true,
      placeholder: '请输入'
    },
    textarea: {
      title: '长文本',
      type: 'string',
      widget: 'textArea',
      placeholder: '请输入'
    },
    slider: {
      title: '滑动条',
      type: 'string',
      widget: 'slider',
      props: {
        range: true,
      }
    },
    switch: {
      title: '开关',
      type: 'bool',
      widget: 'switch',
      props: {
        uncheckedText: '关',
        checkedText: '开'
      }
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
        multiple: true,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
          { label: 'D', value: 'd' },
          { label: 'E', value: 'e' },
          { label: 'F', value: 'f' }
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
}
