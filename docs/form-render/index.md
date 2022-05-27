---
order: 1
title: 开始使用
toc: content
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

> 一站式中后台 **表单解决方案**

## 简介

FormRender 1.0 是下一代的 `React.js` 表单解决方案。项目从内核级别进行了重写，为了能切实承接日益复杂的表单场景需求。我们的目标是以强大的扩展能力对表单场景 100%的覆盖支持，同时保持开发者能快速上手，并以表单编辑器、插件、自定义组件等一系列周边产品带来极致的开发体验。在开发 1.0 的道路上，我们做了一系列的取舍，详见 [0.x - 1.0 迁移文档](/form-render/migrate)。

<Alert>
  <span>FormRender 已升级到 v1.x 版本，并对外提供中后台开箱即用 XRender 表单 / 表格 / 图表方案，如需使用老版本(v0.x)，请点击右上角 <a href="http://x-components.gitee.io/form-render/" target="_blank_"> 旧文档 </a>。</span>
</Alert>

## 安装

FormRender 依赖 ant design，单独使用不要忘记同时安装 [antd](https://ant-design.antgroup.com/docs/react/introduce-cn)。

```shell
npm i form-render --save
```

## 最简 demo

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

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
    },
  },
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
  };
  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

对于使用类组件的同学，可以使用 `connectForm` 替代 `useForm` hooks。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { connectForm } from 'form-render';
// import 'antd/dist/antd.css';    如果项目没有对antd、less做任何配置的话，需要加上

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
    },
  },
};

class Demo extends React.Component {
  onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <FormRender form={form} schema={schema} onFinish={this.onFinish} />
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </div>
    );
  }
}

export default connectForm(Demo);
```
<!-- 
**换一个更复杂一点的 schema，FR 支持数据绑定、antd 的 props 透传、表单联动等一系列功能：**

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  displayType: 'row',
  labelWidth: 60,
  type: 'object',
  properties: {
    dateRange: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
    },
    showSetting: {
      title: '是否展示网址',
      type: 'boolean',
    },
    siteUrl: {
      title: '网址',
      type: 'string',
      placeholder: '此处必填',
      hidden: '{{formData.showSetting !== true}}',
      required: true,
      props: {
        addonBefore: 'https://',
        addonAfter: '.com',
      },
    },
  },
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errors) => {
    if (errors.length > 0) {
      alert('errors:' + JSON.stringify(errors));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
 -->
从 demo 中我们不难发现 FormRender 的一些设计：

1. 以 schema 来描述表单展示，提交方式与 antd v4 的方式类似。
2. schema 以国际标准的 JSON schema 为基础，同时能够方便使用任何 antd 的 props。
3. 通过 `bind` 字段，我们允许数据的双向绑定，数据展示和真实提交的数据可以根据开发需求不同（例如从服务端接口拿到不规则数据时，也能直接使用）。
4. 使用 `{{...}}` 书写表达式来完成简单的联动，值得一提的是，这里表达式支持所有 js 语法。FR 还提供自定义组件、dependencies 声明、watch 等工具用于更加复杂的定制。
5. 可以通过 `displayType`，`labelWidth` 等字段轻易修改展示。

## 高级用法

- [如何写表单间的简单联动关系？](/form-render/advanced/function)
- [如何通过监听实现复杂联动？](/form-render/advanced/watch)
- [如何用自定义组件完成定制元素的展示？](/form-render/advanced/widget)
- [如何写一个完整的服务端数据表单加载和提交？](/form-render/advanced/form-methods)
- 想要一个多选组件，该怎么写它的 schema？

  很多同学阅读 schema 文档的目的只是如此，建议打开 [playground](/playground), 点击“基础控件”。这里有所有 FormRender 支持的展示以及对于的 schema。

- [其他常见问题 FAQ](/form-render/faq)

## 如何速写 Schema

对于初学者来说记住 schema 所有的字段和使用方式并非易事。为了让大家能够快速上手，建议以以下的顺序尝试。

1. 去 [Playground](/playground) 逛逛，那里有从基础玩法、高级功能到完整样例的所有 schema 样例。
2. 玩转一下 [表单设计器](https://xrender.fun/generator)，拖拖拽拽导出 schema，丢到代码里生成可用表单。本质上这是一个可视化的表单生成器，支持 schema 的导入 & 导出。

   <div>
      <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="500px"/>
     <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='500px' />
   </div>

3. 详细的 schema 规范见 schema 的 [文档](/form-render/schema)。同时在 vscode 上搜索 `formrender` 可以找到 snippets 插件，手熟起来一整页表单的 schema 弹指间完成。
