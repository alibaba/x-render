---
order: 8
group:
  order: 3
  title: 高级用法
toc: content
---

# 表单校验

### 内置校验

- required：必填
- max：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度
- min：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '必填',
      type: 'string',
      required: true,
    },
    input2: {
      title: '数字最大值',
      type: 'number',
      max: 2,
      required: true
    },
    input3: {
      title: '数字最小值',
      type: 'number',
      min: 10,
      required: true,
    },
    input4: {
      title: '字符最大长度',
      type: 'string',
      max: 2,
      required: true,
    },
    input5: {
      title: '字符最小长度',
      type: 'string',
      min: 10,
      required: true,
    },
    input6: {
      title: 'url 校验',
      type: 'string',
      required: true,
      format: 'url',
    },
    input7: {
      title: 'email 校验',
      type: 'string',
      required: true,
      format: 'email',
    },
    input7: {
      title: '图片格式校验',
      type: 'string',
      required: true,
      format: 'image',
    }
  },
  column: 1
};

const schema1 = {
  type: 'object',
  properties: {
    
    input4: {
      title: '字符最大长度',
      type: 'string',
      max: 2,
      required: true,
    },
    input5: {
      title: '字符最小长度',
      type: 'string',
      min: 10,
      required: true,
    },
    input6: {
      title: 'url 校验',
      type: 'string',
      required: true,
      format: 'url',
    },
    input7: {
      title: 'email 校验',
      type: 'string',
      required: true,
      format: 'email',
    },
    input7: {
      title: '图片格式校验',
      type: 'string',
      required: true,
      format: 'image',
    }
  },
  column: 3
};


export default () => {
  const form = useForm();
  const form1 = useForm();
  return (
    <div>
      <FormRender schema={schema} form={form} builtOperation={true} />
      <FormRender schema={schema1} form={form1} builtOperation={true} />

    </div>
  )
};
```


<!-- ### Rules 校验
- 全面拥抱 Antd Form Rules 相关配置
- 自定义校验 validator：做了一点小小的改变，validator 直接返回布尔值。（不再需要接收 Promise 作为返回值）


```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '正则表达式',
      type: 'string',
      required: true,
      rules: [
        { pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }
      ]
    }
  },
  column: 1
};

export default () => {
  const form3 = useForm();
  return (
    <div>
      <FormRender schema={schema} form={form3} builtOperation={true} />
    </div>
  )
};
``` -->