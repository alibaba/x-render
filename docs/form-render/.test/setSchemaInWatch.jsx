import React, { useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
      required: true,
    },
    select1: {
      title: '选择框',
      description: '加载中...',
      type: 'string',
      enum: [],
      widget: 'radio',
    },
  },
};

const Demo = () => {
  const form = useForm();

  const onMount = () => {
    // form.setValues({ input1: 'hello world' });
    // form.setSchemaByPath('input2', {
    //   description: 'haha',
    // });
    // form.setSchemaByPath('select1', {
    //   description: '',
    //   props: {
    //     options: [
    //       { value: 'a', label: '在' },
    //       { value: 'b', label: 'er' },
    //       { value: 'c', label: '大师傅' },
    //     ],
    //   },
    // });
  };

  const watch = {
    input1: val => {
      form.setValueByPath('input2', 'hello world');
      form.setSchemaByPath('input2', {
        description: 'haha',
      });
    },
  };

  return (
    <FormRender
      debug
      form={form}
      schema={schema}
      watch={watch}
      onMount={onMount}
    />
  );
};

export default Demo;
