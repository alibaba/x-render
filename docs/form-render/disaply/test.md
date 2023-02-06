# 布局测试

### 3. DrawerList

用于展示存在列表套列表，列表套对象等复杂元素的情况

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'column',
  properties: {
    list: {
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
            format: 'url',
            required: true,
          },
          input2: {
            title: '简单输入框2',
            widget: 'upload',
          },
          input3: {
            title: '简单输入框3',
            widget: 'imageInput',
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

export default () => {
  const form = useForm();
  return (
    <FormRender
      schema={schema}
      form={form}
      configProvider={{ locale: 'enUS' }}
    />
  );
};
```
