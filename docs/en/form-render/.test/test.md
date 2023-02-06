```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
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
  const onFinish = (formData, errorFields) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender debug form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
