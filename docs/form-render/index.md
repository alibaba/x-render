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
import React from 'react';
import FormRender, { useForm } from 'form-render';
// import schema from './schema/simple';


const schema = {
"type":"object",
"title":"质检报告配置类目维度",
"properties":{
"zzConfigList":{
"type":"array",
"title":"配置信息",
"required":true,
"rules":[
{
"required":true,
"message":"必填"
}
],
"widget":"drawerList",
"items":{
"type":"object",
"widget":"lineTitle",
"properties":{
"cateId":{
"type":"string",

            "title":"末级类目ID",
            "required":true,
            "width":"50%",
            "rules":[
              {
                "message":"长度超限，请确认",
                "max":11
              },
              {
                "message":"只允许填写数字",
                "pattern":"^[0-9]+$"
              },
              {
                "required":true,
                "message":"[末级类目ID]必填"
              }
            ],
            "default":""
          },
          "configs":{
            "type":"array",
            "title":"二级项",
            "required":false,
            "columnHidden": true,
            "widget":"drawerList",
            "items":{
              "widget":"lineTitle",
              "type":"object",
              "properties":{
                "firstId":{
                  "type":"string",

                  "title":"一级质检项ID",
                  "required":true,
                  "width":"50%",
                  "rules":[
                    {
                      "message":"长度超限，请确认",
                      "max":11
                    },
                    {
                      "message":"只允许填写数字",
                      "pattern":"^[0-9]+$"
                    },
                    {
                      "required":true,
                      "message":"[一级质检项ID]必填"
                    }
                  ],
                  "default":""
                },

              }
            }
          }
        }
      }
    }
  },
  "displayType":"row"
}

export default () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  return (
    <FormRender 
      form={form} 
      schema={schema} 
      onFinish={onFinish} 
      maxWidth={360} 
      footer={true}
    />
  );
}
```

<!-- **类组件**

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
</div> -->