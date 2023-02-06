import { Button } from 'antd';
import Form, { useForm } from 'form-render';
import React from 'react';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      rules: [
        {
          pattern: '^([0-9A-Z]{15}|[0-9A-Z]{18})$',
          message: '请输入18位或15位正确格式的统一社会信用代码',
        },
      ],
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
    },
  },
};

const Demo = () => {
  const form = useForm();

  function setError() {
    form.setErrorFields([
      {
        name: 'input2',
        error: ['错误信息1', '错误信息2'],
      },
    ]);
  }

  return (
    <div>
      <Form
        debug
        form={form}
        schema={schema}
        onMount={() => {
          form.setSchemaByPath('obj', { hidden: true });
        }}
        onFinish={(data, errors) => {
          console.log('data', data, 'errors', errors);
        }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
      <Button type="primary" onClick={setError}>
        设置 error
      </Button>
    </div>
  );
};

export default Demo;
