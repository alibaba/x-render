import React from 'react';
import { Button, Dialog, Space, Switch } from 'antd-mobile';
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
        // multiple: true,
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
  const [readOnly, setReadOnly] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const onFinish = (formData: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(formData, null, 2)}</pre>,
    })
  };

  return (
    <div>
      <Space style={{marginBottom: 20}}>
        <div>只读: <Switch checked={readOnly} onChange={(val) => setReadOnly(val)} /></div>
        <div>禁用: <Switch checked={disabled} onChange={(val) => setDisabled(val)} /></div>
      </Space>
      <FormRender
        readOnly={readOnly}
        disabled={disabled}
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
