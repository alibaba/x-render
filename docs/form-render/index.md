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

> 一站式中后台**表单解决方案**

FormRender 1.0 是下一代的 `React.js` 表单解决方案。项目从内核级别进行了重写，为了能切实承接日益复杂的表单场景需求。我们的目标是以强大的扩展能力对表单场景 100%的覆盖支持，同时保持开发者能快速上手，并以表单编辑器、插件、自定义组件等一系列周边产品带来极致的开发体验。在开发 1.0 的道路上，我们做了一系列的取舍，详见[0.x - 1.0 迁移文档](/form-render/migrate)

## 安装

FormRender 依赖 ant design，单独使用不要忘记安装～

```shell
npm i form-render --save
```

## 使用

**最简使用 demo：**

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
  return (
    <div>
      <FormRender form={form} schema={schema} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

**换一个更复杂一点的 schema，我们支持数据绑定、antd 的 props 透传等一系列功能：**

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    dateRange: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
    },
    siteUrl: {
      title: '网址',
      type: 'string',
      placeholder: '此处必填',
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

**从 demo 中我们不难发现的 FormRender 的一些设计：**

1. 以 schema 来描述表单展示，提交方式与 antd v4 的方式类似
2. schema 以国际标准的 JSON schema 为基础，同时能够方便使用任何 antd 的 props
3. 通过 bind 字段，我们允许数据的双向绑定，数据展示和真实提交的数据可以根据开发需求不同（例如从服务端接口拿到不规则数据时，也能直接使用）

## 组件 Props

```js
import Form, { useForm } from 'form-render';
```

#### \<Form \/> (常用 props)

| 参数         | 描述                                                           | 类型                                                | 是否必填 | 默认值     |
| ------------ | -------------------------------------------------------------- | --------------------------------------------------- | -------- | ---------- |
| schema       | 描述表单的 schema，详见                                        | `object`                                            | 是       |            |
| form         | `useForm`创建的表单实例，与 Form 一对一绑定                    | `FormInstance`                                      | 是       |            |
| onFinish     | 提交后的回调，执行 form.submit() 后触发                        | `function(formData, errorFields: string[]) => void` | 否       | () => void |
| beforeFinish | 在 onFinish 前触发，一般用于外部校验逻辑的回填                 | `function(formData, errorFields: string[]) => void` | 否       | () => void |
| displayType  | 表单元素与 label 同行 or 分两行展示, inline 则整个展示自然顺排 | `string('column' / 'row' / 'inline')`               | 否       | 'column'   |
| widgets      | 自定义组件，当内置组件无法满足时使用                           | `object`                                            | 否       | {}         |

#### \<Form \/> (不常用 props)

| 参数           | 描述                                                             | 类型                | 默认值 |
| -------------- | ---------------------------------------------------------------- | ------------------- | ------ |
| column         | 一行展示多少列                                                   | `number`            | 1      |
| mapping        | schema 与组件的映射关系表，当内置的表不满足时使用                | `object`            | {}     |
| debug          | 开启 debug 模式，提供更多信息                                    | `boolean`           | false  |
| locale         | 展示语言，目前只支持中文、英文                                   | `string('cn'/'en')` | 'cn'   |
| configProvider | antd 的 configProvider，配置透传                                 | `object`            | -      |
| debounceInput  | 是否开启输入时使用快照模式。仅建议在表单巨大且表达式非常多时开启 | `boolean`           | false  |

#### useForm

**useForm 用于创建表单实例，所有对表单的外部操作和回调函数全挂在其生产的实例上,例如表单提交是 `form.submit`。
使用时需要创建实例，并通过 props 挂钩到与其对应的表单上：**

```js
import Form, { useForm } from 'form-render';

const Demo = () => {
  const form = useForm();
  return <Form form={form} schema={...} />;
};
```

**对 class 组件的参数如下：**

| 参数              | 描述                                                | 类型                                 |
| ----------------- | --------------------------------------------------- | ------------------------------------ |
| submit            | 触发提交流程，一般在提交按钮上使用                  | `function`                           |
| errorFields       | Check if a field is touched                         | `array,[{name, error: []}]`          |
| setErrorFields    | 外部手动修改 errorFields 校验信息，用于外部校验回填 | `(error: Error[]) => void`           |
| setValues         | 外部手动修改 formData，用于已填写的表单的数据回填   | `(formData: any) => void`            |
| onItemChange      | 外部修改指定单个 field 的数据                       | `(path: string, value: any) => void` |
| getValues         | 获取表单内部维护的数据 formData                     | `() => void`                         |
| schema            | 表单的 schema                                       | object                               |
| touchedKeys       | 已经触碰过的 field 的数据路径                       | `string[]`                           |
| removeErrorByPath | 外部手动删除某一个 path 下所有的校验信息            | `(path: string) => void`             |
| formData          | 表单内部维护的数据，建议使用 getValues/setValues    | `object`                             |

## 如何速写 Schema

**对于初学者来说记住 schema 所有的字段和使用方式并非易事。为了让大家能够快速上手，建议以以下的顺序尝试：**

1. 去[playground](/playground) 逛逛，那里有从基础玩法、高级功能到完整样例的所有 schema 样例
2. 玩转一下 [表单设计器](https://x-render.gitee.io/schema-generator/)，拖拖拽拽导出 schema，丢到代码里生成可用表单。本质上这是一个可视化的 schema 生成器，支持 schema 的导入 & 导出

   <div>
      <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="500px"/>
     <img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='500px' />
   </div>

3. 详细的 schema 规范见[schema 的文档](/form-render/schema)。同时在 vscode 上搜索“formrender”可以找到 snippets 插件，手熟起来一整页表单的 schema 弹指间完成

## 高级用法

1. [如何写表单间的联动关系](/form-render/function)
2. [如何用自定义组件完成定制元素的展示](/form-render/widget)
3. [如何写一个完整的服务端数据表单加载和提交](/form-render/form-methods)
4. [常见问题 FAQ](/form-render/faq)
