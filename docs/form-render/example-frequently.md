---
order: 0
toc: content
group: 
  title: 最佳示例
  order: 2
---

# 常用交互

## 一、表单提交
```jsx
import React from 'react';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string'
    },
    select1: {
      title: '单选',
      type: 'string',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onFinish = (data) => {
    message.info(JSON.stringify(data));
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} maxWidth={400} />
      <Button type='primary' onClick={form.submit}>
        提交
      </Button>
    </div>
  );
}
```

## 二、表单数据异步加载

通过 `form.setValues` 方法进行加载
```jsx
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './utils';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string'
    },
    select1: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
    }
  }
}

export default () => {
  const form = useForm();

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  return (
    <div>
      <FormRender form={form} schema={schema} maxWidth={400} />
      <Button onClick={getRemoteData}>加载服务端数据</Button>
    </div>
  );
}
```

## 三、下拉选项异步加载
通过服务端获取数据后展示下拉选项的选项值

**单个加载**
通过 `form.setSchemaByPath` 方法进行加载

```jsx
import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    select1: {
      title: '单选',
      type: 'string',
      widget: 'select',
    }
  }
};

export default () => {
  const form = useForm();

  const onMount = () => {
    form.setSchemaByPath('select1', {
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
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
    />
  );
}
```

**多个加载**
通过 `form.setSchema` 方法进行加载

```jsx
import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj1: {
      type: 'object',
      title: '对象',
      description: '这是一个对象类型',
      properties: {
        select1: {
          title: '单选',
          type: 'string',
          widget: 'select',
        },
        select2: {
          title: '单选',
          type: 'string',
          widget: 'select',
        }
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onMount = () => {
    form.setSchema({
      'obj1.select1': {
        props: {
          options: [
            {label: '东', value: 'east'},
            {label: '西', value: 'west'},
            {label: '南', value: 'south'},
            {label: '北', value: 'north'}
          ]
        }
      },
      'obj1.select2': {
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
    />
  );
}
```

## 四、表单协议异步加载
通过 `form.setSchema(schema, true)` 方法进行加载

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './utils';

const Demo = () => {
  const form = useForm();

  const getRemoteSchema = () => {
    fakeApi('xxx/getForm').then(_ => {
      const schema = {
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
            props: {
              options: [
                { label: '早', value: 'a' },
                { label: '中', value: 'b' },
                { label: '晚', value: 'c' }
              ]
            }
          }
        }
      };
      form.setSchema(schema, true);
    });
  };

  
  
  return (
    <div>
      <FormRender form={form} />
      <Button onClick={getRemoteSchema}>加载表单schema</Button>
    </div>
  );
};

export default Demo;
```



## 五、表单服务端校验
通过 `beforeFinish` 从外部回填 error 信息到表单，注意 `beforeFinish` 需返回要回填的 error

```jsx
import React from 'react';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi } from './utils';

const schema = {
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
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onFinish = (data) => {
    message.info(JSON.stringify(data));
  };

  // 服务端校验在这里做
  const beforeFinish = ({ data, schema }) => {
    return fakeApi('xxx/validation').then(_ => {
      if (data.select1) {
        return [{ name: 'select1', erros: []}];
      }
      return [{ name: 'select1', error: ['外部校验错误, 请进行选择'] }];
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

## 六、表单数据字段转换
服务端数据与展示经常会不符，通过配置 `bind` 字段进行转换

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
