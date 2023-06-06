---
order: 0
toc: content
title: 开始使用
mobile: false
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

**函数组件**

使用 `useForm` hooks 创建 form 实例。
```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from "react";
import FormRender, { useForm } from "form-render";
import { Cascader } from "antd";
const schema = {
  type: "object",
  displayType: "row",
  properties: {
    a: {
      title: "简单输入框",
      type: "string",
      required: true,
    },
    b: {
      title: "简单输入框",
      type: "string",
    },
    list: {
      title: "对象数组",
      description: "对象数组嵌套功能",
      type: "array",
      widget: "cardList",
      displayType: "row",
      props: {
        hasBackground: true,
        hideAdd: true,
        hideCopy: true,
        hideMove: true,
        hideDelete: true,
      },
      items: {
        type: "object",
        title: "组件",
        description: "",
        properties: {
          input1: {
            title: "简单输入框",
            type: "string",
            required: "{{ !!formData.b }}",
            defaultValue: '{{ rootValue.input2 === 2 ? 100003 : "" }}',
          },
          deliveryModelType: {
            title: "简单输入框2",
            type: "number",
          },
          materialType: {
            title: "策略类型",
            type: "number",
            widget: "select",
            required: true,
            // defaultValue: '{{ formData.deliveryModelType }}',
            props: {
              mode: "single",
              disabled: "{{ formData.deliveryModelType === 2   }}",
              options: [
                {
                  label: "test1",
                  value: 1,
                  disabled: "{{ formData.deliveryModelType > 2   }}",
                },
                {
                  label: "test2",
                  value: 2,
                  disabled: "{{ formData.deliveryModelType > 2   }}",
                },
                {
                  label: "test3",
                  value: 3,
                  disabled: "{{ formData.deliveryModelType !== 3  }}",
                },
                {
                  label: "test4",
                  value: 4,
                  disabled: "{{ formData.deliveryModelType !== 4  }}",
                },
              ],
            },
          },
          select1: {
            title: "策略来源",
            type: "number",
            widget: "cascader",
            defaultValue: '{{ rootValue.materialType === 2 ? 100003 : "" }}',
            required: true,
            props: {
              materialType: "{{ rootValue.materialType  }}",
            },
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return (
    <FormRender
      schema={schema}
      form={form}
      onMount={() => {
        form.setValueByPath("list", [
          { input1: 1, materialType: 2, select1: 100003, k: 1 },
          { input1: 2, materialType: 2, select1: 100003, k: 1 },
          { input1: 2, materialType: 3, select1: 100001, k: 1 },
        ]);
      }}
      watch={{
        a: async (value) => {
          setTimeout(() => {
            debugger;
            form.setValueByPath("list", null);
            
            console.log(form.getValueByPath("list"), 'listData')
            
            
            
          }, 2000);
        },
      }}
      widgets={{ cascader: Cascader }}
    />
  );
};

```

**类组件**

对于使用类组件的同学，可以使用 `connectForm` 替代 `useForm` hooks。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import FormRender, { connectForm } from 'form-render';
import schema from './schema/simple';

class Demo extends React.Component {
  onFinish = (formData) => {
    console.log('formData:', formData);
  };

  render() {
    const { form } = this.props;
    return (
      <FormRender 
        form={form} 
        schema={schema} 
        onFinish={this.onFinish} 
        maxWidth={360} 
        footer={true} 
      />
    );
  }
}

export default connectForm(Demo);
```
## 速写 Schema

对于初学者来说记住 schema 所有的字段和使用方式并非易事。为了让大家能够快速上手，建议以以下的顺序尝试。

1. 去 <a href="https://xrender.fun/playground" target='_black'>Playground</a> 逛逛，那里有从基础玩法、高级功能到完整样例的所有 schema 样例。
2. 玩转一下 <a href="https://xrender.fun/schema-builder" target='_black'>表单设计器</a>，拖拖拽拽导出 schema，丢到代码里生成可用表单。本质上这是一个可视化的表单生成器，支持 schema 的导入 & 导出。

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="80%"/>
</div>