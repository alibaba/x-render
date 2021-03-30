import React from 'react';
import FormRender, { useForm } from 'form-render-beta';

const delay = ms => new Promise(res => setTimeout(res, ms));

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
          description: '输入‘123’，避免外部校验错误',
          type: 'string',
          required: true,
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          'ui:widget': 'radio',
        },
      },
    },
  },
};

const Demo = () => {
  const form = useForm();

  const beforeFinish = ({ formData, errorFields }) => {
    if (formData.objectName.input1 === '123') return;
    return delay(1000).then(() => {
      form.setErrorFields({
        name: 'objectName.select1',
        error: ['外部校验错误'],
      });
    });
  };

  const onFinish = ({ formData, errorFields }) => {
    console.group('onFinish');
    console.log(formData, 'formData', errorFields, 'errors');
    console.groupEnd();
    if (errorFields.length > 0) return;
    alert('formData:' + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <button onClick={form.submit}>提交</button>
      <FormRender
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
        debug={true}
      />
    </div>
  );
};

export default Demo;
