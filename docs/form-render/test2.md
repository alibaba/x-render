```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
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
    selet1: {
      title: '单选',
      type: 'string',
      hidden: '{{formData.check === true}}',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      default: 'a',
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
      <FormRender readOnly form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
