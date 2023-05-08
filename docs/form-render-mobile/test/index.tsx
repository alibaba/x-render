import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  properties: {
    
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
      onMount={() => [
       
        form.setValues({ picker: [1], radio: 'a'})

        
      ]}
      footer={
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
      }
    />
  );
}
