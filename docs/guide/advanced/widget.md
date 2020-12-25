---
order: 2
group:
  title: 高级功能
toc: false
---

# 自定义组件

当 form-render 提供的组件无法 100%满足用户需求时，可以考虑自己写一个。自定义组件功能使 form-render 拥有很好扩展性，可能的应用场景如下：

- 我需要写一个异步加载的搜索输入框（普适性不高/难以用 schema 描述的组件）
- 我们团队使用 xxx ui，与 antd/fusion 不搭，希望能适配一套 xxx ui 组件的 form-render（欢迎 Pull Request）
- 我需要在表单内部写一个 excel 上传按钮（完全定制化的需求）

注：如果是新增一个常用组件，建议给 FormRender 维护的同学来提 Pull Request，这样可以更好扩展其生态

form-render 的社区以及提供了部分 [常用自定义组件](/widgets)

## 如何使用

```jsx
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '网址',
      type: 'string',
      'ui:widget': 'siteInput',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['选项1', '选项2', '选项3'],
      'ui:widget': 'radio',
    },
  },
};

const SiteInput = ({ value, onChange, name }) => {
  return (
    <Input
      addonBefore="http://"
      addonAfter=".com"
      value={value}
      onChange={e => onChange(name, e.target.value)}
    />
  );
};

const Demo = () => {
  const [formData, setFormData] = useState({});
  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };
  return (
    <div>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setFormData}
        widgets={{
          siteInput: SiteInput,
        }}
      />
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

- 如上例，可以使用内置的自定义组件，如`radio`、`checkboxes`。也可以真正写一个定制的组件并通过`widgets`这个 props 注册
- 使用方法都是在 schema 中的对应元素里使用`ui:widget`字段指明使用的自定义组件
- **注意**自定义组件的 `onChange`，接收的入参是`(name, value)`
- **整体代码参考以下 codesandbox 样例：**
  - [省市区选择案例](https://codesandbox.io/s/form-renderjichudemo-f55oy)
  - [下拉选框 + 选项从服务端获取](https://codesandbox.io/s/zidingyizujian-forked-wuujb)

### 写自定义组件

1. 可以 clone 下对应 git 代码，然后参考 `widget/antd` 或者 `widget/fusion`里面对应的组件写法。

- 组件接收到的 props:

  - **default**: 对应 `default` 字段
  - **description**：对应 `description`
  - **displayType**：值为 row 和 column，用于处理在横竖模式下组件显示不同的情况
  - **disabled**：对应 `ui:disable`
  - **hidden**：对应 `ui:hidden`
  - **name**：对应 `title` 字段
  - **onChange**：函数，接收 name/value 两个入参，调用可修改 formData 里对应名字字段的值（见下例）
  - **options**：对应 `ui:options` 字段，所有的其他字段没有 cover 到的参数都建议放在 options 里
  - **readOnly**：对应 `ui:readonly` 字段
  - **required**：组件是否是必填的
  - **rootValue**：组件对应键值对所在的 data 树从父级开始的所有值
  - **schema**：组件对应的子 schema
  - **value**：组件的值

简单的说，通过`title`、`description`、`default`、`ui:hidden`、`ui:disable` 和 `ui:readonly`等 schema 字段定义的值在`this.props`中可直接获得，剩下的字段也可以在`schema`（注意这个是组件对应的子 schema）中获得，比如`schema.type`。更多细节的入参，建议不要新添特殊字段，而统一放在`ui:options`这个对象中传递。

### 使用自定义组件

自定义组件的使用方式非常简单。只需在顶层通过`widgets` props 注入即可：

```js
import MyCheckbox from './path/to/MyCheckbox'
...
<FormRender
  schema={schema}
  formData={formData}
  onChange={this.onChange}
  onValidate={this.onValidate}
  // 注入
  widgets={{ myBox: MyCheckbox, mySecondUI: SomethingElse }}
/>
```

然后即可在 schema 中通过`ui:widget`参数使用：

```json
// schema
"myWidget": {
  "title": "自定义checkbox",
  "type": "boolean",
  "ui:widget": "myBox",
  "ui:options": {
    "defaultChecked": true
  }
}
```

## mapping 的使用：如何让自定义组件作为默认？

比如你不喜欢 form-render（简称 FR） 的 input 组件，希望自己写一个，然后每次使用如下的 schema 时，FR 都默认渲染自定义组件，这该如何实现呢？

```json
{
  "title": "简单输入框",
  "type": "string"
}
```

为了回答这个问题，你可能会提出另一个问题，FR 是如何决定一个 schema 的默认渲染组件是哪个的呢？
在 FR 内部会有一个映射表 mapping，FR 读取 schema 后根据其特征（type/format 等）在 mapping 中寻找所对应的组件，并进行渲染。

```js
// 例如在antd下映射如下：
export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  'string:upload': 'upload',
  'string:date': 'date',
  'string:dateTime': 'date',
  'string:time': 'date',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'input',
  'string:email': 'input',
  'string:url': 'url',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  '*?enum': 'select',
  'array?enum': 'checkboxes',
};
```

所以想要让自定义组件作为默认渲染组件，只需要覆盖 mapping 即可, 如下的代码可使 `MyCustomComponent` 组件作为日期选择的默认展示：

```json
// schema
{
  "string": {
    "title": "现在默认使用自定义组件了",
    "type": "string",
    "format": "date"
  }
}
```

```js
import MyCustomComponent from './MyCustomComponent';
...
<FormRender
  {...SCHEMA}
  formData={formData}
  onChange={setData}
  onValidate={onValidate}
  widgets={{ myDatePicker: MyCustomComponent }}
  mapping={{ 'string:date': 'myDatePicker' }}
/>
```

codesandbox 的 demo：[自定义组件覆盖默认](https://codesandbox.io/s/zidingyizujianfugaimoren-z0i9r)
