---
order: 3
toc: content
mobile: false
title: 数据转换
group: 
  title: 高级用法
  order: 1
---

# bind

类型：string | string[] | false

有时候我们会遇到这样的问题：提交的数据，数据结构不符合服务端的要求，需要进行转换。这时候 bind 这个魔法字段就派上用场了。


注意点：`魔法虽好，切记滥用`
- `setValues`、`getValues`、`onFinish` 这三个 API，也就是`输入`、`输出` 数据的格式是转换之后的，其他情况下数据格式都是表单原始数据格式
- 最好不要跨层级转换，转换前后数据最好还是保持在同一层级，

`点击提交按钮，浏览器控制台会打印出提交的数据`
## 简单
`{ date: ['2023-04-01', '2023-04-23'] }` => `{ startDate: '2023-04-01', endDate: '2023-04-23' }`
```jsx
import React from 'react';
import { Button, Alert} from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    date: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
      description: 'bind 转换',
    },
    date1: {
      title: '日期',
      type: 'range',
      format: 'date',
      description: '未进行转换',
    }
  }
};

const Demo = () => {
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onFinish={onFinish}
      footer={true}
      maxWidth={400}
    />
  );
};

export default Demo;

```

## 进阶
- 对象嵌套情况， bind 要写绝对路径
- List 组件嵌套情况，bind 路径从 List 嵌套的子节点开始写
```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    obj: {
      title: '对象',
      type: 'object',
      description: '对象嵌套 bind 要写决定路径',
      properties: {
        range1: {
          bind: ['obj.startDate', 'obj.endDate'],
          title: '日期',
          type: 'range',
          format: 'date'
        }
      }
    },
    list: {
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: 'List-Item',
        column: 3,
        properties: {
          obj: {
            title: '对象',
            type: 'object',
            description: 'List 组件嵌套下，bind 路径从 List 嵌套的节点开始写',
            properties: {
              range1: {
                bind: ['obj.startDate', 'obj.endDate'],
                title: '日期',
                type: 'range',
                format: 'date'
              }
            }
          }
        }
      }
    }
  }
};

const Demo = () => {
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onFinish={onFinish}
      footer={true}
      maxWidth={400}
    />
  );
};

export default Demo;

```

## bind:false
某些字段数据只做纯展示，使用 bind: false 可避免字段在提交时出现。

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    input: {
      title: '输入框',
      type: 'string',
      props: {},
    },
    input1: {
      title: '输入框',
      type: 'string',
      description: '纯展示',
      readOnly: true,
      bind: false
    },
  }
};

const Demo = () => {
  const form = useForm();

  const onMount = () => {
    form.setValues({ input: '1', input1: '2' });
  };

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onFinish={onFinish}
      footer={true}
      maxWidth={400}
      onMount={onMount}
    />
  );
};

export default Demo;

```

## bind:root

`{ list: [{ size: 1 }, { size: 2}] }` => `{ list: [1, 2] }`;

解决 List 嵌套，数组元素的数据格式只能是对象的问题


```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    list: {
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        column: 3,
        properties: {
          input: {
            bind: 'root',
            title: '大小',
            type: 'number',
          }
        }
      }
    }
  }
};

const Demo = () => {
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onFinish={onFinish}
      footer={true}
      maxWidth={400}
    />
  );
};

export default Demo;

```









