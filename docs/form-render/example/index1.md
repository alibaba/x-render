---
order: 1
group:
  order: 6
  title: 示例
toc: false
---

# 表单方法（form）

FormRender v1.x 使用了状态内置的模型，所以外部对表单的所有操作都依赖于 form 实例提供的方法。
本篇会 cover 以下这些常用 api：

```
form.submit
form.setValues
form.setValueByPath
form.setSchemaByPath
```

以及以下的生命周期

```
beforeFinish
onFinish
```

我们写一个最常用的场景：加载一个已经填写完成的表单，从服务端异步获取数据（这里使用 mock）；修改表单并提交新数据给服务端

### 例 1: 表单与服务端的基本交互

**异步加载表单 Schema, 服务端数据填充表单初始值, 提交校验通过后提交数据给服务端**

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from '../utils/index';

const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  useEffect(() => {
    // 异步加载表单
    delay(1000).then(_ => {
      setSchema({
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
      });
    });
  }, []);

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
```

