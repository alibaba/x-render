---
title: Form Render
hero:
  title: FormRender
  desc: 通过 JSON Schema 生成标准 Form，常用于自定义搭建配置界面生成
  actions:
    - text: playground
      link: /playground
    - text: 开始使用
      link: /guide/getting-started
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 开箱即用
    desc: 像写一个input一样写整个表单
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 自由定制
    desc: 联动、自定义组件快速接入，满足定制化需求
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 海量示例
    desc: 新版文档 code Demo & playground 一应俱全
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## 安装

```shell
yarn add form-render
# 或者
npm i form-render
```

同时安装依赖的组件库 (依赖哪个装哪个，天然支持 antd 和 fusion 两套。其他的组件库可通过 widgets 的方式传入，见[自定义组件](/guide/advanced/widget))

```shell
# 例如
yarn add antd
# 或者
yarn add @alifd/next
```

注：一般来说，想使用 form-render 的 antd 主题的项目，dependencies 里肯定装了 antd。这里强调一下这步，主要是针对想尝试写个 demo 玩玩的同学，记得要安装对应的 ui 组件库

## 使用

```jsx
import React, { useState } from 'react';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['选项1', '选项2', '选项3'],
    },
  },
};

const Demo = () => {
  const [formData, setFormData] = useState({});
  return (
    <FormRender schema={schema} formData={formData} onChange={setFormData} />
  );
};

export default Demo;
```

注：由于 fusion 的 css 无法按需引入，且在内部整个引入会造成样式覆盖，所以需要用户外部独立引入

## schema 可以不用手写哦！

使用 [表单设计器](https://x-render.gitee.io/schema-generator/)，拖拖拽拽导出 schema，丢到代码里生成可用表单

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="750px"/>

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='750px' />

## 理念

[详见 form-render 的理念](/guide/design)

## 贡献

想贡献代码、解 BUG 或者提高文档可读性？非常欢迎一起参与进来，在提交 MR 前阅读一下 [Contributing Guide](https://github.com/alibaba/form-render/blob/master/CONTRIBUTING.md)

感谢给 FormRender 贡献代码的你们，以及 JetBrains 提供 Free 使用！

<a href="https://github.com/alibaba/form-render/graphs/contributors"><img src="https://opencollective.com/form-render/contributors.svg?width=890&button=false"/></a><a href="https://www.jetbrains.com/?from=form-render"><img src="https://img.alicdn.com/tfs/TB1gPDDJKL2gK0jSZFmXXc7iXXa-2000-2168.png" width="100px" /></a>

## 反馈与共建

请访问 [github](https://github.com/alibaba/form-render) 或加入讨论群：

<img src="https://img.alicdn.com/tfs/TB1CprJg5pE_u4jSZKbXXbCUVXa-894-1087.jpg" width="240px" />
<!-- <code src='./playground/index.jsx' className='hidden' /> -->
