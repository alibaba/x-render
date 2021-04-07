---
order: 1
group:
  title: 开始使用
  order: 1
toc: content
---

form-render 1.x 是下一代的 `React.js` 表单解决方案。项目从内核级别进行了重写，为了能切实承接日益复杂的表单场景需求。我们的目标是以强大的扩展能力对表单场景 100%的覆盖支持，同时保持开发者能快速上手，并以表单编辑器、插件、自定义组件等一系列周边产品带来极致的开发体验。在开发 1.0 的道路上，我们做了一系列的取舍，详见[0.x - 1.0 迁移文档](/FR1.0/migrate)

## 安装

```shell
yarn add form-render
# 或者
npm i form-render
```

form-render 默认使用 antd 作为组件库，并以 peerDependencies 的方式依赖，所以需要同时安装 antd 的依赖。其他的组件库可通过 widgets 的方式传入，详见[自定义组件](/form-render/widget))

```shell
yarn add antd
```

### 第一个表单

```js
import React from 'react';
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
  const onFinish = ({ formData, errorFields }) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
    } else {
      alert('formData:' + JSON.stringify(formData));
    }
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <button onClick={form.submit}>提交</button>
    </div>
  );
};

export default Demo;
```

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
  const onFinish = ({ formData, errorFields }) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
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

从 demo 中我们不难发现的 form-render 的一些设计：

1. 以 schema 来描述表单展示，提交方式与 antd v4 的方式类似
2. schema 以国际标准的 JSON schema 为基础，同时能够方便使用任何 antd 的 props
3. 通过 bind 字段，我们允许数据的双向绑定，数据展示和真实提交的数据可以根据开发需求不同（例如从服务端接口拿到不规则数据时，也能直接使用）

### Form

| Prop         | Description                                    | Type                              | Required | Default    |
| ------------ | ---------------------------------------------- | --------------------------------- | -------- | ---------- |
| schema       | 描述表单的 schema，详见                        | object                            | ✓        |            |
| form         | `useForm`创建的表单实例，与 Form 一对一绑定    | FormInstance                      | ✓        |            |
| onFinish     | 提交后的回调，执行 form.submit() 后触发        | ({formData, errorFields}) => void |          | () => void |
| beforeFinish | 在 onFinish 前触发，一般用于外部校验逻辑的回填 | ({formData, errorFields}) => void |          | () => void |
| displayType  | 表单元素与 label 同行 or 分两行展示            | 'column' / 'row'                  |          | 'column'   |
| widgets      | 自定义组件，当内置组件无法满足时使用           | object                            |          | {}         |

### Form (不常用 props)

| Prop           | Description                                                      | Type        | Default |
| -------------- | ---------------------------------------------------------------- | ----------- | ------- |
| column         | 一行展示多少列                                                   | number      | 1       |
| mapping        | schema 与组件的映射关系表，当内置的表不满足时使用                | object      | {}      |
| theme          | 主题，目前只是对象展示不同                                       | '0'/'1'/... | '0'     |
| debug          | 开启 debug 模式，提供更多信息                                    | boolean     | false   |
| locale         | 展示语言，目前只支持中文、英文                                   | 'cn'/'en'   | 'cn'    |
| configProvider | antd 的 configProvider，配置透传                                 | object      | -       |
| debounceInput  | 是否开启输入时使用快照模式。仅建议在表单巨大且表达式非常多时开启 | boolean     | false   |

### useForm

useForm 用于创建表单实例，所有对表单的外部操作和回调函数全挂在其生产的实例上,例如表单提交是`form.submit`。
使用时需要创建实例，并通过 props 挂钩到与其对应的表单上：

```js
import Form, { useForm } from 'form-render';

const Demo = () => {
  const form = useForm();
  return <Form form={form} schema={...} />;
};
```

对 class 组件的支持会在下一个版本添加上

| Prop           | Description                                         | Type                               |
| -------------- | --------------------------------------------------- | ---------------------------------- |
| submit         | 触发提交流程，一般在提交按钮上使用                  | function                           |
| errorFields    | Check if a field is touched                         | [{name, error: []}]                |
| setErrorFields | 外部手动修改 errorFields 校验信息，用于外部校验回填 | (error: Error[]) => void           |
| setValues      | 外部手动修改 formData，用于已填写的表单的数据回填   | (formData: any) => void            |
| onItemChange   | 外部修改指定单个 field 的数据                       | (path: string, value: any) => void |
| getValues      | 获取表单内部维护的数据 formData                     | () => void                         |
| schema         | 表单的 schema                                       | object                             |
| touchedKeys    | 已经触碰过的 field 的数据路径                       | string[]                           |
| formData       | 表单内部维护的数据，建议使用 getValues/setValues    | object                             |

## schema 可以不用手写哦！

使用 [表单设计器](https://x-render.gitee.io/schema-generator/)，拖拖拽拽导出 schema，丢到代码里生成可用表单

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="750px"/>

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='750px' />

还可在 vscode 商店搜索 “formrender” 下载配套 [可视化插件](https://marketplace.visualstudio.com/items?itemName=F-loat.vscode-plugin-fr-schema)

<img src="https://img.alicdn.com/tfs/TB1b53cmGNj0u4jSZFyXXXgMVXa-2740-1748.gif" alt="schema编辑器" width='750px' />
