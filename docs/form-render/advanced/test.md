```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      // widget: 'cardList',
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
        }
      }
    }
  }
};
const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```