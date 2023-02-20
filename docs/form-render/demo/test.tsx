import React from 'react';
import FormRender, { useForm } from 'form-render';
import { Button } from 'antd';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      labelWidth: '300px'
    },
    select1: {
      title: '单选',
      type: 'string',
      required: true,
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c', disabled: "{{formData.input1 === '1' }}" }
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onValidateFields = () => {
    form.validateFields(['input1'])
    .then(values => {
      console.log(values, 'values');
    })
    .catch(errors => {
      console.log(errors, 'errors');
    });
  }

  return (
    <>
      <FormRender 
        form={form} 
        schema={schema}
        labelCol={{
          span: 5
        }}
        wrapperCol={{ span: 8}}
      />
      <div>
        <Button onClick={onValidateFields}>validateFields Test</Button>
      </div>
    </>
  );
}
