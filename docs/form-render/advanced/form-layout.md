---
order: 8
group:
  order: 3
  title: 高级用法
toc: content
---

# 表单布局

### 多列布局

- column: 一行多列，默认值 1 （通过 props 或者 schema.column 配置）

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  column: 3,
  properties: {
    input1: {
      title: '姓名',
      type: 'string'
    },
    input2: {
      title: '电话',
      type: 'string'
    },
    input3: {
      title: '邮箱',
      type: 'string',
      format: 'email'
    },
    input4: {
      title: '地址',
      type: 'string'
    },
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form}
      // column={3}
      builtOperation={true}
    />
  )
};
```


