/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Button, Dialog, Space, Switch } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      widget: 'card',
      title: '卡片主题',
      description: '这是一个对象类型',
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
        },
      },
    },
  },
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
