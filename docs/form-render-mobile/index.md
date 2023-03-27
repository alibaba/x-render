---
order: 0
toc: content
title: 开始使用
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">FormRender</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/form-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/form-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/form-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/form-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

中后台表单解决方案，通过 JsonSchema 协议渲染表单


```shell
npm i form-render --save
```
## 使用方式

**基础**

使用 `useForm` hooks 创建 form 实例。
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input'
    },
    textarea: {
      title: '长文本',
      type: 'string',
      widget: 'textArea'
    },
    slider: {
      title: '滑动条',
      type: 'string',
      widget: 'slider'
    },
    switch: {
      title: '开关',
      type: 'bool',
      widget: 'switch'
    },
    stepper: {
      title: '步进器',
      type: 'number',
      widget: 'stepper'
    },
    rate: {
      title: '评分',
      type: 'string',
      widget: 'rate'
    },
    selector: {
      title: '选择组',
      type: 'string',
      widget: 'selector',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    },
    radio: {
      title: '单选',
      type: 'string',
      widget: 'radio',
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
      />
    </>
  );
}
```



**复杂**

使用 `useForm` hooks 创建 form 实例。
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      type: 'array',
      items: {
        type: 'object',
        widget: 'Card',
        title: '联系人',
        properties: {
          input: {
            title: '输入框',
            type: 'string',
            widget: 'input'
          },
          slider: {
            title: '滑动条',
            type: 'string',
            widget: 'slider'
          },
          switch: {
            title: '开关',
            type: 'bool',
            widget: 'switch'
          },
          stepper: {
            title: '步进器',
            type: 'number',
            widget: 'stepper'
          },
          rate: {
            title: '评分',
            type: 'string',
            widget: 'rate'
          },
        }
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
      />
    </>
  );
}
```


