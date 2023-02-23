---
order: 0
toc: content
group: 
  title: 高级用法
  order: 1
---

# 表单布局
- 通过 displayType 实现标签排列布局
- 通过 column 实现表单多列布局
- 通过 labelCol、wrapperCol 实现表单项布局
- 输入控件最长宽度 400px

## 一、标签排列：displayType
displayType：row（水平分布）、column（垂直分布）、inline(紧凑)

```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
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
    }
  }
};

export default () => {
  const form = useForm();
  const [displayType, setDisplay] = useState('row');

  const handRadioChange = (ev) => {
    const value = ev.target.value;
    schema.displayType = value;
    form.setSchema(schema, true);
    setDisplay(value);
  };

  return (
    <div>
      <FormRender 
        schema={schema}
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
      />
      <Form.Item label='标签排列'>
        <Radio.Group value={displayType} onChange={handRadioChange}>
          <Radio.Button value='row'>row</Radio.Button>
          <Radio.Button value='column'>column</Radio.Button>
          <Radio.Button value='inline'>Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
```

## 二、多列布局：column
column: 一行多列，默认值 1

```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
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
  const [column, setColumn] = useState(3);

  const handRadioChange = (ev) => {
    const value = ev.target.value;
    schema.column = value;

    form.setSchema(schema, true);
    setColumn(value);
  };

  return (
    <>
      <FormRender
        form={form}
        schema={schema} 
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
      />
      <Form.Item label='多列布局'>
        <Radio.Group value={column} onChange={handRadioChange}>
          <Radio.Button value={1}>一列</Radio.Button>
          <Radio.Button value={2}>两列</Radio.Button>
          <Radio.Button value={3}>三列</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
}
```


## 三、表单项布局
### labelCol

- labelCol: label 标签布局，同 Col 组件，设置 span 值，如 { span: 6 }
- wrapperCol: 输入控件布局，用法同 labelCol
- 默认值：
```js
// 一行一列
const labelCol = { span: 5 };
const wrapperCol = { span: 9 };

// 两列及以上
const labelCol = { span: 6 };
const wrapperCol = { span: 14 };
```

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
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
    }
  }
};

export default () => {
  const form = useForm();
  return (
    <FormRender
      form={form}
      schema={schema}
      labelCol={{ span: 9 }}
    />
  )
};
```


### lableWidth
设置 label 标签的宽度为固定值，最后会转换为：
```js
labelCol = { flex : labelWidth };
wrapperCol = { flex: 'auto' };
```

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
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
    }
  }
};

export default () => {
  const form = useForm();

  return (
    <FormRender
      form={form}
      schema={schema}
      labelWidth={100}
      maxWidth={400}
    />
  );
};
```