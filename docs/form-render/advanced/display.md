---
order: 8
group:
  order: 3
  title: 高级用法
toc: content
---

# 展示的最佳实践

### `displayType`

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
      description: '<a>123</a>',
    },
    objectName: {
      title: '对象',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      collapsed: false,
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

### readOnly

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

### 列表的展示

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。详见[列表展示](/advanced/listDisplay.md)

1. 默认展示使用 widget: 'cardList'，卡片类型，用于展示数量不太多但结构复杂的 list

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      // widget: 'cardList',
      items: {
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
          obj: {
            title: '对象',
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
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

2. widget: 'simpleList' 用于展示每行只有 1-3 个简单元素的情况

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'simpleList',
      items: {
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
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

3. widget: 'tableList' 用于展示每行只有 3 - n 个简单元素的情况，特别是数据量很大需要分页的

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'tableList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          input2: {
            title: '简单输入框2',
            type: 'string',
          },
          input3: {
            title: '简单输入框3',
            type: 'string',
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'select',
          },
        },
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

4. widget: 'drawerList' 用于展示存在列表套列表，列表套对象等复杂元素的情况

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'drawerList',
      items: {
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
          listName2: {
            title: '对象数组',
            description: '对象数组嵌套功能',
            type: 'array',
            widget: 'simpleList',
            props: {
              hideMove: true,
            },
            items: {
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
        },
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

### 主题设置

对于嵌套类型的表单，我们内置了三种主题，分别为 `collapse | card | tile `, 默认为 `collapse` 主题

1. 默认样式：`theme: 'collapse'` ，支持`无边框模式: 'collapse:pure'`、`幽灵模式:'collapse:ghost'`

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    objectName: {
      title: '默认样式',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      collapsed: true,
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
    objectName2: {
      title: '无边框样式',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      collapsed: true,
      theme: 'collapse:pure',
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
    objectName3: {
      title: '幽灵模式',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      collapsed: true,
      theme: 'collapse:ghost',
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
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

2. 卡片模式： `theme: 'card'`

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    objectName: {
      title: '卡片主题',
      description: '这是一个对象类型',
      type: 'object',
      theme: 'card',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
          width: '30%',
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          width: '30%',
        },
        date: {
          title: '时间选择',
          type: 'string',
          format: 'date',
          width: '30%',
        },
      },
    },
    objectName2: {
      title: '卡片主题',
      description: '这是一个对象类型',
      type: 'object',
      theme: 'card',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
          width: '30%',
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          width: '30%',
        },
        date: {
          title: '时间选择',
          type: 'string',
          format: 'date',
          width: '30%',
        },
      },
    },
  },
};

const Demo = () => {
  return (
    <div>
      <Form schema={schema} />
    </div>
  );
};

export default Demo;
```

3. 平铺模式：`theme: 'tile'`

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    objectName: {
      title: '平铺主题',
      description: '这是一个对象类型',
      type: 'object',
      theme: 'tile',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
          width: '30%',
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          width: '30%',
        },
        date: {
          title: '时间选择',
          type: 'string',
          format: 'date',
          width: '30%',
        },
      },
    },
    objectName2: {
      title: '平铺主题',
      description: '这是一个对象类型',
      type: 'object',
      theme: 'tile',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
          width: '30%',
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          width: '30%',
        },
        date: {
          title: '时间选择',
          type: 'string',
          format: 'date',
          width: '30%',
        },
      },
    },
  },
};

const Demo = () => {
  return (
    <div>
      <Form schema={schema} />
    </div>
  );
};

export default Demo;
```
