---
order: 3
nav:
  order: 2
  title: 配置项
toc: menu
---

# Props

## schema

- type: `object`

表单的展示、数据、如何联动等等，都在这里配。基本结构遵循 [JSON schema](https://json-schema.org/understanding-json-schema/) 标准。详见 [schema 配置](/config/schema)

## uiSchema

- type: `object`

详见 [uiSchema 配置](/config/ui-schema)（**一般建议合并到 `schema`**）

## formData

- type: `object`

表单现在的值，一般存在使用者的组件的 state 中

## onChange

- type: `function`

表单初始化，以及用户操作表单时都会调用，时时同步数据到 formData，一般就如下写就行了（在 class 组件中）。不建议在里面加复杂逻辑

```js
const onChange = formData => {
  this.setState({ formData });
};
```

## onValidate

- type: `function`

用法类似 `onChange`, 时时将校验信息的数组存储到 state 中，可以在 submit 的时候拿出来用

```js
const onValidate = valid => {
  this.setState({ valid });
};
```

## displayType

- one of: `'row'` / `'column'`
- default: `'column'`

label 是否与表单元素同行（row 为同行），默认是 column（label 单独一行）

## showDescIcon

- type: `boolean`
- default: `false`

描述用气泡展示。当 `displayType` 为 `'row'` 的时候，建议将 `showDescIcon` 设为 `true`, 效果见`readOnly`下面那个 demo

## readOnly

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

## labelWidth

- type: `string` / `number`
- default: `120`

表单元素的 label 的宽度，可以在 schema 中单独调整每个，也可以在 props 中全局给个值，可接受的值形式参照 `style={{ width: xxx }}` 中可以接受的形式。
例如`80`，`'3rem'`，`'200px'` 和 `'30%'` 都是有效的

## column

- type: `number`
- default: 1

如果希望统一的一行展示 n 个元素，可使用此 props 一键设置：例如你想整体表单三等分，就用 `column={3}`。一般还是建议在 schema 级别使用`ui:width`属性，更自由。

## widgets

- type: `React component`

详见 [自定义组件](/guide/advanced/widget)
