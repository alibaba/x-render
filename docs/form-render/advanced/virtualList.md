---
order: 7
toc: content
---


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
      widget: 'list4',
      props: {
        height: 66
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
