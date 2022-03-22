import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { useState } from 'react';
import testSchema from './testJson.json';

const schema = {
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
      'ui:widget': 'radio',
    },
  },
};

const Demo = () => {
  const [data, setdata] = useState({});
  const [valid, setValid] = useState([]);
  const form = useForm({
    formData: data,
    onChange: setdata,
    onValidate: err => {
      console.log(err, 'err');
      setValid(err);
    },
  });

  const onSubmit = () => {
    form.submit();
    console.log(data, valid);
    // if (valid.length > 0) {
    //   alert(`errors: ${JSON.stringify(valid)}`);
    // } else {
    //   alert(`data: ${JSON.stringify(data)}`);
    // }
  };

  const onFinish = (formData, errorFields) => {
    console.group('onFinish');
    console.log(formData, 'formData', errorFields, 'errors');
    console.groupEnd();
  };

  return (
    <div>
      <Button type="primary" onClick={onSubmit}>
        提交
      </Button>
      <div>{JSON.stringify(valid)}</div>
      <FormRender
        form={form}
        schema={testSchema.schema}
        onFinish={onFinish}
        // debug
      />
    </div>
  );
};

export default Demo;
