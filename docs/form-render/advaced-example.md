---
order: 3
toc: content
mobile: false
group: 
  title: 高级用法
  order: 2
---

# 常用交互

## 表单数据提交
通过 `onFinish` 方法监听表单提交，外部可通过调用 `form.submit` 触发 `onFinish`。

```jsx
import React from 'react';
import { message } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/simple';

export default () => {
  const form = useForm();

  const onFinish = (data) => {
    message.info(JSON.stringify(data));
  };

  return (
    <FormRender form={form} schema={schema} onFinish={onFinish} footer={true} maxWidth={360} />
  );
}
```

## 表单数据初始化

表单的初始化数据一般是通过接口异步查询获取的，当获取到数据时可以通过 `form.setValues` 方法进行表单数据初始化。
```jsx
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './utils';
import schema from './schema/simple';

export default () => {
  const form = useForm();

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input: '表单数据获取成功', select: 'c' });
    });
  };

  return (
    <div>
      <FormRender form={form} schema={schema} maxWidth={360} />
      <Button type='primary' onClick={getRemoteData}>加载服务端数据</Button>
    </div>
  );
}
```

## 下拉选项异步加载
下拉选项的数据有时候来源于服务端下发，这时我们需要异步修改 Schema。

- 单个加载：通过 `form.setSchemaByPath` 方法进行加载

```jsx
import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  properties: {
    select: {
      title: '下拉框',
      type: 'string',
      widget: 'select',
    }
  }
};
export default () => {
  const form = useForm();

  const onMount = () => {
    // 根据服务端下发内容，重置下拉选项
    form.setSchemaByPath('select', {
      props: {
        options: [
          {label: '东', value: 'east'},
          {label: '西', value: 'west'},
          {label: '南', value: 'south'},
          {label: '北', value: 'north'}
        ]
      }
    });
  };
  
  return (
    <FormRender form={form} schema={schema} onMount={onMount} maxWidth={360}
    />
  );
}
```

- 多个加载：通过 `form.setSchema` 方法进行加载

```jsx
import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    select1: {
      title: '下拉框一',
      type: 'string',
      widget: 'select',
    },
    select2: {
      title: '下拉框二',
      type: 'string',
      widget: 'select',
    }
  }
};

export default () => {
  const form = useForm();

  const onMount = () => {
    form.setSchema({
      select1: {
        props: {
          options: [
            {label: '东', value: 'east'},
            {label: '西', value: 'west'},
            {label: '南', value: 'south'},
            {label: '北', value: 'north'}
          ]
        }
      },
      select2: {
        props: {
          options: [
            { label: '早', value: 'a' },
            { label: '中', value: 'b' },
            { label: '晚', value: 'c' }
          ]
        }
      }
    });
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
      maxWidth={360}
    />
  );
}
```

## 表单协议重置
通过 `form.setSchema(schema, true)` 方法进行加载

```jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './utils';
import schema from './schema/simple';
import basic from './schema/basic';

const Demo = () => {
  const form = useForm();

  const getRemoteSchema = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setSchema(basic, true);
    });
  };

  return (
    <div>
      <FormRender form={form} schema={schema} />
      <Button type='primary' onClick={getRemoteSchema}>重置表单 Schema </Button>
    </div>
  );
};

export default Demo;
```

## 表单服务端校验
通过 `beforeFinish` 从外部回填 error 信息到表单，注意 `beforeFinish` 需返回要回填的 error

```jsx
import React from 'react';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/simple';
import { fakeApi } from './utils';

export default () => {
  const form = useForm();

  const onFinish = (data) => {
    message.info(JSON.stringify(data));
  };

  // 服务端校验在这里做
  const beforeFinish = ({ data, schema }) => {
    return fakeApi('xxx/validation').then(_ => {
      if (data.select1) {
        return [{ name: 'select', errors: [] }];
      }
      return [{ name: 'select', errors: ['外部校验错误, 请进行选择'] }];
    });
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish}
        maxWidth={400} 
      />
      <Button type='primary' onClick={form.submit}>
        提交
      </Button>
    </div>
  );
}
```

## 表单数据字段转换
服务端数据与展示经常会不符，通过配置 `bind` 字段进行转换（List嵌套下暂时不支持）

- 例如：日期范围组件接收的是一个数组，而服务端的数据是 startDate，endDate 两个字段。

```jsx
import React from 'react';
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi } from './utils';

const schema = {
  type: 'object',
  properties: {
    dateRange: {
      bind: ['startDate', 'endDate'],
      title: '日期范围',
      type: 'range',
      format: 'date',
    },
  },
};

export default () => {
  const form = useForm();

  const onFinish = (data) => {
    message.info(JSON.stringify(data));
  };

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ startDate: '2023-01-01', endDate: '2023-12-31' });
    });
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} maxWidth={400} />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type='primary' onClick={form.submit}>
          提交
        </Button>
      </Space>
    </div>
  );
}
```
