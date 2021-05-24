---
order: 2
group:
  order: 3
  title: 高级用法
toc: content
---

# 自定义组件

当 FormRender 提供的组件无法 100%满足用户需求时，可以考虑自己写一个。自定义组件功能使 FormRender 拥有很好扩展性，可能的应用场景如下：

- 我需要写一个异步加载的搜索输入框（普适性不高/难以用 schema 描述的组件）
- 我们团队使用 xxx ui，与 antd 不搭，希望能适配一套 xxx ui 组件的 FormRender（欢迎 Pull Request）
- 我需要在表单内部写一个 excel 上传按钮（完全定制化的需求）

注：如果是新增一个常用组件，建议给 FormRender 维护的同学来提 Pull Request，这样可以更好扩展其生态，FormRender 的社区以及提供了部分 [常用自定义组件](/widgets)。

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
    //...
  },
};

<Form
  schema={schema}
  widgets={{ site: SiteInput }}
  //...
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
  console.log('widget props:', props);
  return <Input addonBefore="http://" addonAfter=".com" {...props} />;
};

const Demo = () => {
  const form = useForm();
  const handleSubmit = () => {};
  return (
    <div>
      <Form
        readOnly
        form={form}
        schema={schema}
        widgets={{ site: SiteInput }}
        onFinish={formData => alert(JSON.stringify(formData, null, 2))}
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

## 自定义组件收到的 props

- **disabled**：是否禁止输入
- **readOnly**：是否只读
- **value**：组件现在的值
- **onChange**：函数，接收 value 为入参，用于将自定义组件的返回值同步给 Form
- **schema**：组件对应的子 schema
- **addons.onItemChange**: 注意挂在 addons 下面。用于在本组件内修改其他组件的值 onItemChange(value, path)
- **addons.getValue**: 用于通过路径字符串获取值 getValue(path)。例如 `getValue('a.b[2].c')`。getValue() 获取 formData
- **addons.formData**: 表单当前的数据。其实可以通过 getValue 获取，但我也传下来了。
- **addons.dataPath**: 目前数据所在的 path，例如"a.b[2].c[0].d"，string 类型。
- **addons.dataIndex**: 如果 dataPath 不包含数组，则为 [], 如果 dataPath 包含数组，例如"a.b[2].c[0].d"，则为 [2,0]。是自上到下所有经过的数组的 index 按顺序存放的一个数组类型

## antd 组件改造成自定义组件

大多数情况下，antd 的组件可以拿来即用。但有时组件的 props 并不是约定的 value/onChange, 例如 Checkbox 的情况，value 值对应的是 checked，此时只需要少量改动即可：

```js
import { Checkbox } from 'antd';
import { createWidget } from 'form-render';

const MyCheckBox = (({ value, ...rest }) => {
  return <Checkbox checked={value} {...rest} />
}
```

## 只读模式下的自定义组件

只读模式下，默认会渲染内置的 html 组件，但有时 html 组件并不能满足一个自定义组件在只读模式下需要的展示，此时可使用`readOnlyWidget`字段来指定只读模式下的展示。

```json
{
  "type": "object",
  "properties": {
    "string": {
      "title": "网址输入自定义组件",
      "type": "string",
      "widget": "site",
      "readOnlyWidget": "siteText"
    }
  }
}
```

如果你打算在一个自定义组件里通过 readOnly 参数判断条件展示，既是说，site 组件已经写了只读和非只读情况下的渲染

```js
const SiteInput = ({ readOnly, value, ...rest }) => {
  if (readOnly) return <div>{`https://${value}.com`}</div>;
  return (
    <Input addonBefore="http://" addonAfter=".com" value={value} {...rest} />
  );
};
```

此时可以指定 `readOnlyWidget` 和 `widget` 为同一个组件：

```json
{
  "type": "object",
  "properties": {
    "string": {
      "title": "网址输入自定义组件",
      "type": "string",
      "widget": "site",
      "readOnlyWidget": "site"
    }
  }
}
```

## 最佳实践

同一个项目下不同的 form 里，使用到的自定义组件可能大致相同，但也有可能互相不同，笔者建议是中心化一个 Form 组件，并一次性将所有需要的自定义组件注入其中。在项目的各处引入对应组件：

```js
//  /Component/FormRender.js
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

## 内置组件

使用自定义组件前，也许已经有内置组件支持。具体见[schema 与内置组件](/form-render/schema/inner-widget)
