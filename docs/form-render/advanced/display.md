---
order: 4
toc: content
---

# 展示的最佳实践

## `displayType`

- 类型：'row' | 'column' | 'inline'
- 默认值： 'column'
- 说明：用于控制标签的位置。没有特殊情况，一般建议使用默认的 display: column。注意 `displayType` 既是 props，又是 schema 的字段，可以

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = displayType => ({
  type: 'object',
  displayType: displayType,
  properties: {
    range1: {
      title: '日期',
      type: 'range',
      format: 'date',
    },
    objectName: {
      title: '对象',
      bind: 'obj',
      description: '这是一个对象类型',
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
    },
  },
});

export default () => (
  <div>
    <h2>display: row</h2>
    <Form schema={schema('row')} />
    <h2>display: column</h2>
    <Form schema={schema('column')} />
  </div>
);
```

非常特别的情况，会用到 display: inline

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'inline',
  properties: {
    range1: {
      title: '日期',
      type: 'range',
      format: 'date',
    },
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

export default () => <Form schema={schema} />;
```

### ReadOnly

新增了只读模式，在 \<Form /\> 组件上用 props 声明

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    aa: {
      title: '对象',
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          default: 'hello world',
          required: true,
        },
        check: {
          title: 'box',
          type: 'boolean',
          default: true,
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          default: 'a',
        },
      },
    },
  },
};

export default () => <Form readOnly schema={schema} />;
```

### labelWidth

标签的宽度，可以在顶层用 props 声明，或者在每个 schema 中单独声明

### width

元素的宽度，在每个 schema 中单独声明。没有特别情况，建议一行一个元素（即默认的 100%），符合用户填写表单的习惯

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    aa: {
      title: '对象',
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          default: 'hello world',
          required: true,
          width: '50%',
        },
        check: {
          title: 'box',
          type: 'boolean',
          default: true,
          width: '50%',
          labelWidth: 6,
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          default: 'a',
        },
      },
    },
  },
};

export default () => <Form labelWidth="200" schema={schema} />;
```
