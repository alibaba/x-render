---
order: 3
group:
  order: 2
  title: 配置项
toc: menu
---

# Props

### schema

- type: `object`

表单的展示、数据、如何联动等等，都在这里配。基本结构遵循 [JSON schema](https://json-schema.org/understanding-json-schema/) 标准。详见 [schema 配置](/form-render/config/schema)

### uiSchema

- type: `object`

详见 [uiSchema 配置](/form-render/config/ui-schema)（**一般建议合并到 `schema`**）

### formData

- type: `object`

表单现在的值，一般存在使用者的组件的 state 中

### onChange

- type: `function`

表单初始化，以及用户操作表单时都会调用，时时同步数据到 formData，一般就如下写就行了（在 class 组件中）。不建议在里面加复杂逻辑

```js
const onChange = formData => {
  this.setState({ formData });
};
```

### onValidate

- type: `function`

用法类似 `onChange`, 时时将校验信息的数组存储到 state 中，可以在 submit 的时候拿出来用

```js
const onValidate = valid => {
  this.setState({ valid });
};
```

### displayType

- one of: `'row'` / `'column'`
- default: `'column'`

label 是否与表单元素同行（row 为同行），默认是 column（label 单独一行）

### showDescIcon

- type: `boolean`
- default: `false`

描述用气泡展示。当 `displayType` 为 `'row'` 的时候，建议将 `showDescIcon` 设为 `true`, 效果见`readOnly`下面那个 demo

### readOnly

- type: `boolean`
- default: `false`

只读模式。效果如下

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const setting = {
  schema: {
    type: 'object',
    properties: {
      string: {
        title: '字符串',
        description: '请填写您的完整姓名',
        type: 'string',
      },
      select: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['选项1', '选项2', '选项3'],
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
};

const Demo = () => {
  const [formData, setFormData] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  return (
    <div style={{ width: 400 }}>
      <FormRender
        {...setting}
        readOnly={readOnly}
        formData={formData}
        onChange={setFormData}
      />
      <button onClick={() => setReadOnly(o => !o)}>
        {readOnly ? '进入编辑' : '进入只读'}
      </button>
    </div>
  );
};

export default Demo;
```

### labelWidth

- type: `string` / `number`
- default: `120`

表单元素的 label 的宽度，可以在 schema 中单独调整每个，也可以在 props 中全局给个值，可接受的值形式参照 `style={{ width: xxx }}` 中可以接受的形式。
例如`80`，`'3rem'`，`'200px'` 和 `'30%'` 都是有效的

### column

- type: `number`
- default: 1

如果希望统一的一行展示 n 个元素，可使用此 props 一键设置：例如你想整体表单三等分，就用 `column={3}`。一般还是建议在 schema 级别使用`ui:width`属性，更自由。

### widgets

- type: `React component`

详见 [自定义组件](/guide/advanced/widget)

## 不常用 Props

### mapping

- type: `object`

schema 到组件的映射规则。比如 `{ type: 'string' }` 默认使用 `<Input />` 组件, 是因为在 `mapping` 里有一条：

```js
{
  ...
  string: 'input',
}
```

完整的 mapping，以及对 mapping 使用方法的理解，建议读一下 [mapping 的使用：如何让自定义组件作为默认？](/docs/guide/advanced/widget.md)

### useLogger

- type: `boolean`
- default: `false`

`useLogger={true}` 时，每当用户填写表单时，在 console 里的展示类似如下：

<img src="https://img.alicdn.com/tfs/TB11rt_AbY1gK0jSZTEXXXDQVXa-1336-468.jpg" width="600" />

自下向上一层层展示用户触发的 formData 变化，便于开发者快速定位问题。

### showValidate

- type: `boolean`
- default: `true`

是否展示校验信息，没有特别需求一般都展示

### onMount

- type: `function`

在首次渲染 formData 首次计算之后执行。从原理上来说，
表单首次加载会调用一次 `onChange`，`onMount` 会在 `onChange` 执行之后立刻触发，此时 formData 已经更新，在不少场景下需要拿到这个初始化的 formData

### configProvider

- type: `object`

如果使用 antd 组件，`configProvider`用于调整国际化等全局参数，具体配置见 [antd 文档](https://ant.design/components/config-provider/)
