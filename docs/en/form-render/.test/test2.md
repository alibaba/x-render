```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

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

// const schema = {
//   displayType: 'column',
//   type: 'object',
//   properties: {
//     input1: {
//       title: '简单输入框',
//       type: 'string',
//       required: true,
//     },
//     select1: {
//       title: '单选',
//       type: 'string',
//       enum: ['a', 'b', 'c'],
//       enumNames: ['早', '中', '晚'],
//     },
//   },
// };

const Demo = () => {
  const form = useForm();
  return <FormRender readOnly form={form} schema={schema} />;
};

export default Demo;
```
