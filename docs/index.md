---
title: Form Render
hero:
  title: FormRender
  desc: 通过 JSON Schema 生成标准 Form，常用于自定义搭建配置界面生成
  actions:
    - text: playground
      link: /_demos/index
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
# or
npm i form-render
```

## 使用

```js
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

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

## 理念

[详见 form-render 的理念](/guide/design)

## 贡献

想贡献代码、解 BUG 或者提高文档可读性？非常欢迎一起参与进来，在提交 MR 前阅读一下 [Contributing Guide](https://github.com/alibaba/form-render/blob/master/CONTRIBUTING.md)

感谢给 FormRender 贡献代码的你们，以及 JetBrains 提供 Free 使用！

<a href="https://github.com/alibaba/form-render/graphs/contributors"><img src="https://opencollective.com/form-render/contributors.svg?width=890&button=false"/></a><a href="https://www.jetbrains.com/?from=form-render"><img src="https://img.alicdn.com/tfs/TB1gPDDJKL2gK0jSZFmXXc7iXXa-2000-2168.png" width="100px" /></a>

## 反馈与共建

请访问 [github](https://github.com/alibaba/form-render) 或加入讨论群：

<img src="https://qpluspicture.oss-cn-beijing.aliyuncs.com/ts-upload/IMG_8838.JPG" width="240">

<code src='./playground/index.jsx' className='hidden' />
