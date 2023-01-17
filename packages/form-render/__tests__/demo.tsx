import * as React from 'react';
import { useState } from 'react';
import FormRender, { useForm } from '../src/index';
import { normalSchema } from './schema';

const SimpleForm = () => {
  const form = useForm();
  const [state, setState] = useState({
    input1: 'fr',
    select1: 'd',
  });
  const onFinish = (formData, errors) => {
    setState(formData);
  };

  const watch = {
    // # 为全局
    '#': val => {
      console.log('表单的实时数据为：', val);
    },
    input1: {
      handler: val => {
        console.log(val);
      },
      immediate: true,
    },
    onSearch: val => {},
  };

  const onMount = () => {
    form.setValueByPath('link', 'www.baidu.com');
  };

  const onClick = () => {
    form.setValueByPath('link', 'www.baidu.com');
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={normalSchema as any}
        onFinish={onFinish}
        watch={watch}
        onMount={onMount}
      />
      <div data-testid="fr-value">
        <div data-testid="input">{state?.input1}</div>
        <div data-testid="select">{state?.select1}</div>
      </div>
      <button data-testid="submit" onClick={form.submit}>
        提交
      </button>
      <button data-testid="test" onClick={onClick}>
        提交
      </button>
    </div>
  );
};

export default SimpleForm;
