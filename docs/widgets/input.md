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
    checkbox1: {
      title: '是否选择',
      type: 'boolean',
      widget: 'checkbox',
    },
    color1: {
      title: 'color',
      type: 'string',
      format: 'color',
    },
    image1: {
      title: '图片展示',
      type: 'string',
      format: 'image',
    },
    slider1: {
      title: '带滑动条',
      type: 'number',
      widget: 'slider',
    },
    width: {
      title: '元素宽度',
      type: 'string',
      widget: 'percentSlider',
    },
    input4: {
      title: 'url',
      type: 'string',
      format: 'url',
      required: true,
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




