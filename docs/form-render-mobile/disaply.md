---
order: 1
toc: content
title: 最佳示例
---

## 基础控件
<code src="./demo/basic.tsx"></code>

## 嵌套控件

对于嵌套类型的表单，我们内置了四种主题，分别为 collapse | card | tile | flex, 默认为 collapse 主题

### 折叠 collapse

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      description: '这是一个对象类型',
      widget: 'collapse',
      items: [
        {
          title: '基础信息',
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
            },
            input2: {
              title: '输入框 B',
              type: 'string',
            },
            input3: {
              title: '输入框 C',
              type: 'string',
            },
            input4: {
              title: '输入框 D',
              type: 'string',
            }
          }
        },
        {
          title: '其他信息',
          properties: {
            input1: {
              title: '输入框 A',
              type: 'string',
            },
            input2: {
              title: '输入框 B',
              type: 'string',
            },
            input3: {
              title: '输入框 C',
              type: 'string',
            },
            input4: {
              title: '输入框 D',
              type: 'string',
            }
          }
        }
      ]
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### 卡片 card

<code src="./demo/card.tsx"></code>

## 列表控件

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'card',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 B',
            type: 'string',
          },
          input4: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

