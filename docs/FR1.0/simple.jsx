import React from 'react';
import FormRender, { useForm } from 'form-render-beta';

const schema = {
  type: 'object',
  properties: {
    objectName: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
      },
    },
  },
};

const Demo = () => {
  const form = useForm();

  const onFinish = ({ formData, errorFields }) => {
    console.group('onFinish');
    console.log(formData, 'formData', errorFields, 'errors');
    console.groupEnd();
    alert('formData:' + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <button onClick={form.submit}>提交</button>
      <FormRender
        form={form}
        schema={schema}
        onFinish={onFinish}
        debug={true}
      />
    </div>
  );
};

export default Demo;
