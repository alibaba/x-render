---
order: 7
toc: content
---

# 列表的展示

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。

1. 默认展示使用 widget: 'list0'，卡片类型，用于展示数量不太多但结构复杂的 list

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
      // widget: 'list0',
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

2. widget: 'list1' 用于展示每行只有 1-3 个简单元素的情况

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
      widget: 'list1',
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

3. widget: 'list2' 用于展示每行只有 3 - n 个简单元素的情况，特别是数据量很大需要分页的

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
      widget: 'list2',
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

4. widget: 'list3' 用于展示存在列表套列表，列表套对象等复杂元素的情况

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
      widget: 'list3',
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
            widget: 'list1',
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

5. widget: 'list4' 在展示上与 'list2' 基本相同，但以虚拟滚动替代了传统的分页

```jsx
import React from 'react';
import Form from '../demo/display';

window.hello = ({ value }) => {
  console.log(value);
};

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'list4',
      itemProps: {
        buttons: [
          {
            callback: 'hello',
            text: '复制',
          },
        ],
      },
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
