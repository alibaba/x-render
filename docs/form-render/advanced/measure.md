---
order: 9
group:
  order: 3
  title: 高级用法
toc: content
---

# 表单健康度 & 提效

业界有句话叫 "You can't improve what you can't measure"。即是说，如果无法度量一件事，那改善也无从谈起。 FormRender 作为表单提效的方案，提效的同时也需要给出合理的度量数据，帮助使用者更好地认知和发现问题。

目前 FormRender 提供了两个触发时机以及一系列相关数据作为对外开放接口，推荐用户用于接入适合自己项目的埋点 & 数据监控方案。

## 使用

提供了 `logOnMount` 和 `logOnSubmit` 两个钩子。在使用 `useForm` 时注入：

```js
const form = useForm({
  logOnMount: info => {
    console.log('onMount', info);
  },
  logOnSubmit: info => {
    console.log('onSubmit', info);
  },
});
```

最简使用样例如下，效果见 console

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';

const Demo = () => {
  const form = useForm({
    logOnMount: info => {
      console.log('onMount', info);
    },
    logOnSubmit: info => {
      console.log('onSubmit', info);
    },
  });

  const schema = {
    type: 'object',
    properties: {
      input1: {
        title: '输入框',
        required: true,
        type: 'string',
      },
      select1: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['左', '中', '右'],
        widget: 'radio',
      },
    },
  };

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      message.success('提交成功！');
    }
  };

  return (
    <div>
      <FormRender
        id="my-demo-form"
        form={form}
        schema={schema}
        onFinish={onFinish}
      />
      <Button type="primary" onClick={form.submit}>
        提交（见console）
      </Button>
    </div>
  );
};

export default Demo;
```

### logOnMount

会在表单首次加载时触发，一般也就是页面首次加载时。样例的入参值如下

| 参数          | 描述                                |
| ------------- | ----------------------------------- |
| **id**        | 表单 id，只当用户注明 id 时才会 log |
| **formData**  | 表单值                              |
| **schema**    | 表单协议                            |
| **url**       | 表单加载的页面地址                  |
| **formMount** | 表单加载的时间点                    |

```js
{
  id: "my-demo-form",
  schema: "{type: 'object',properties: {input1: {title: '输入框',required: true,type: 'string'},select1:{title: '单选',... }",
  url: 'https://x-render.gitee.io/form-render/measure',
  formData: '{}',
  formMount: '2021-07-02 16:03:42',
};
```

### logOnSubmit

会在表单每次提交时触发。样例的入参值如下

| 参数                | 描述                         |
| ------------------- | ---------------------------- |
| **duration**        | 表单填写时长                 |
| **ms**              | duration 的时间戳形式        |
| **numberOfSubmits** | 从首次加载开始提交了几次     |
| **failedAttempts**  | 从首次加载开始提交失败了几次 |
| **errors**          | 提交失败的校验信息           |

```js
{
  id: "my-demo-form", // 如果注明表单id，会在此处展示
  formMount: '2021-07-02 16:27:28', // 表单首次加载的时间点
  ms: 35598, // duration的时间戳形式
  duration: '00:00:35', // 从表单加载/上次提交完成开始计时，到本次提交使用的时间
  numberOfSubmits: 1, // 提交的次数（失败与否）
  failedAttempts: 0, // 提交失败的次数（即有校验未通过）
  url: 'https://x-render.gitee.io/form-render/measure', // 表单对应页面的url
  formData: "{input1: '3123',select1: 'c'}",
  schema: "{ ... }", // 表单协议
  errors: "[]", // 校验未通过时，展示报错校验信息
};
```
