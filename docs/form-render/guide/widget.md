---
order: 5
group:
  order: 1
toc: content
---

# 自定义组件

当 form-render 提供的组件无法 100%满足用户需求时，可以考虑自己写一个。自定义组件功能使 form-render 拥有很好扩展性，可能的应用场景如下：

- 我需要写一个异步加载的搜索输入框（普适性不高/难以用 schema 描述的组件）
- 我们团队使用 xxx ui，与 antd 不搭，希望能适配一套 xxx ui 组件的 form-render（欢迎 Pull Request）
- 我需要在表单内部写一个 excel 上传按钮（完全定制化的需求）

注：如果是新增一个常用组件，建议给 FormRender 维护的同学来提 Pull Request，这样可以更好扩展其生态

form-render 的社区以及提供了部分 [常用自定义组件](/widgets)

## 使用

简单的说，在 Form 组件层使用 widgets 字段注册自定义组件，并在 schema 内使用 widget 字段指明使用的组件 key 值即可：

```js
const schema = {
  type: 'object',
  properties: {
    string: {
      title: '网址输入自定义组件',
      type: 'string',
      widget: 'site',
    },
    ...
  },
};

<Form
  schema={schema}
  widgets={{ site: SiteInput }}
  ...
/>;
```

实际代码如下：

```jsx
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import Form, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '网址输入自定义组件',
      type: 'string',
      widget: 'site',
    },
    select: {
      title: '单选',
      type: 'number',
      enum: [1, 2, 3],
      enumNames: ['选项1', '选项2', '选项3'],
    },
  },
};

const SiteInput = props => {
  return <Input addonBefore="http://" addonAfter=".com" {...props} />;
};

const Demo = () => {
  const form = useForm();
  const handleSubmit = () => {};
  return (
    <div>
      <Form
        form={form}
        schema={schema}
        widgets={{ site: SiteInput }}
        onFinish={({ formData }) => alert(JSON.stringify(formData, null, 2))}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

可以看到自定义组件的写法十分直观，事实上很多 antd 的组件都是可以直接拿来作为自定义组件使用（内置组件中就有 Input, InputNumber, Checkbox 和 Switch）

## createWidget

自定义组件接收以下 Props：

- **disabled**：是否禁止输入
- **readOnly**：是否只读
- **value**：组件现在的值
- **onChange**：函数，接收 value 为入参，用于将自定义组件的返回值同步给 Form
- **schema**：组件对应的子 schema
- **addons.onItemChange**: 注意挂在 addons 下面。用于在本组件内修改其他组件的值 onItemChange(value, path)

为此，事实上还有一种更简单的自定义组件书写方式，`form-render` 内置了 `createWidget` 方法：

```js
import { Checkbox } from 'antd';
import { createWidget } from 'form-render';

const MyCheckBox = createWidget(({ value }) => {
  return {
    checked: value,
  };
})(Checkbox);
```

`createWidget` 是一个高阶组件，它接收组件 props，允许用户对齐做修改并返回真正需要的 props

## 最佳实践

同一个项目下不同的 form 里，使用到的自定义组件可能大致相同，但也有可能互相不同，笔者建议是中心化一个 Form 组件，并一次性将所有需要的自定义组件注入其中。在项目的各处引入对应组件：

```js
// FR.js
import Form from 'form-render';
import Cascade from './Cascade';
import Percentage from './Percentage';
import MyCheckBox from './MyCheckBox';
import ExcelUploader from './ExcelUploader';

const FormRender = props => {
  return (
    <Form
      widgets={{
        percentage: Percentage,
        cascade: Cascade,
        myCheck: MyCheckBox,
        excelUpload: ExcelUploader,
      }}
      {...props}
    />
  );
};
```

然后在每个 form 页面统一引入使用

```js
import { useForm } from 'form-render';
import FormRender from './Component/FormRender';
const Demo1 = props => {
  const form = useForm();
  return <FormRender form={form} onFinish={() => {}} />;
};
```
