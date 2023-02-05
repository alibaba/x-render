---
order: 0
group: 
  title: 高级用法
  order: 1
---

# 表单布局
- 通过 displayType 实现表单排列布局
- 通过 column 实现表单多列布局
- 通过 labelCol、wrapperCol 实现表单项内部布局

## 标签排列
```jsx
import React from 'react';
import { Button, Space } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  column: 3,
  displayType: 'row',
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

  const handClick = (type) => () => {
    schema.displayType = type;
    form.setSchema(schema, true);
  };

  return (
    <div>
      <Space style={{ marginBottom: '20px' }}>
        <span>displayType：</span>
        <Button onClick={handClick('row')}>row</Button>
        <Button onClick={handClick('column')}>column</Button>
        <Button onClick={handClick('inline')}>inline</Button>
      </Space>
      <FormRender schema={schema} form={form} />
    </div>
  );
}
```

## 多列布局

- column: 一行多列，默认值 1 （通过 props 或者 schema.column 配置）

```jsx
import React from 'react';
import FormRender from './demo/FormRender';

const schema = {
  type: 'object',
  column: 3,
  displayType: 'row',
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
  return (
    <FormRender 
      schema={schema} 
      // column={3}
      builtOperation={true}
    />
  );
}
```


<!-- ## 表单项布局

- labelCol: label 标签布局，同 Col 组件，设置 span 值，如 { span: 6 }
- wrapperCol: 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
- 默认值：
```js
// 一行一列
const labelCol = { span: 4 };
const wrapperCol = { span: 8 };

// 一行两列
const labelCol = { span: 6 };
const wrapperCol = { span: 14 };

// 三列及以上
const labelCol = { span: 7 };
const wrapperCol = { span: 15 };
```

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
   displayType: 'row',
  column: 1,
  labelCol: {
    span: 9
  },
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
  return (
    <FormRender 
      schema={schema} 
      builtOperation={true}
      // labelCol={{ span: 9 }}
    />
  )
};
``` -->