---
order: 1
title: 组件调试
toc: content
---


```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm, Input } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      widget: 'demo'
    },
    select1: {
      title: '单选',
      type: 'string',
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

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  return (
    <>
      <FormRender 
        form={form} 
        schema={schema} 
        onFinish={onFinish} 
        fieldCol={8}
        widgets={{
          demo: Input
        }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </>
  );
}
```




