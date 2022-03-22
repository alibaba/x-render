import FormRender, { useForm } from 'form-render';
import React from 'react';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    range1: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
    },
    objectName: {
      title: '对象',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        input1: {
          bind: 'a.b.c',
          title: '简单输入框',
          description: '输入‘123’，避免外部校验错误',
          type: 'string',
          required: true,
        },
        input2: {
          title: '简单输入框2',
          type: 'string',
          required: true,
        },
        select1: {
          title: '单选',
          bind: false,
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

  const beforeFinish = ({ data, errors, schema }) => {
    if (data.objectName && data.objectName.input1 === '123') return;
    return delay(1000).then(() => {
      return {
        name: 'objectName.select1',
        error: ['外部校验错误'],
      };
    });
  };

  const onFinish = (formData, errors) => {
    console.group('onFinish');
    console.log(formData, 'formData', errors, 'errors');
    console.groupEnd();
    if (errors.length > 0) return;
    // alert('formData:' + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log(form.getValues());
        }}
      >
        取值
      </button>
      <button
        onClick={() => {
          form.setValues({
            a: { b: { c: '23434' } },
            startDate: '2021-03-10',
            endDate: '2021-04-08',
            obj: { input2: 'heelo' },
          });
        }}
      >
        赋值
      </button>
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
