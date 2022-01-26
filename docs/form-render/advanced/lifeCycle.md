---
order: 6
group:
  order: 3
  title: 高级用法
toc: false
---

# 生命周期 (加载 - 提交)

对于表单最重要的两个操作时机是“加载”和“提交”

## onMount （加载）

1. 由于 React 组件的 `componentDidMount`(或者 useEffect) 很多时候并不能准确监听到“表单加载完成”这个时间点，所以 FormRender 提供了 props `onMount`，在表单首次加载时执行。
   表单首次加载的定义是：当非空的 schema 首次传入 FormRender 完成表单渲染之后。其中 undefined、null、{} 都视为“空”的 schema。
2. `onMount` 常用于加载初始数据，或是根据服务端接口获取数据进一步补充 schema（例如下拉选框的选项）
3. 如果 schema 来自服务端接口，注意不要使用`onMount`来加载 schema，而使用`componentDidMount`，因为`onMount`的触发机制是判断非空 schema 已经传入 FormRender

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    select1: {
      title: '选择框',
      description: '加载中...',
      type: 'string',
      enum: [],
      widget: 'radio',
    },
  },
};

const Demo = () => {
  const form = useForm();

  const onMount = () => {
    form.setValues({ input1: 'hello world' });

    delay(3000).then(_ => {
      form.setSchemaByPath('select1', {
        description: '',
        enum: ['a', 'b', 'c'],
        enumNames: ['早', '中', '晚'],
      });
    });
  };

  return <FormRender form={form} schema={schema} onMount={onMount} />;
};

export default Demo;
```

## beforeFinish / onFinish （提交）

表单提交的流程：

1. 用户调用 `form.submit` 提交开始
2. 本地校验开始，如果未通过，展示校验错误
3. 本地校验结束，`beforeFinish` 开始执行，一般用于回填远端校验，如果未通过展示校验错误
4. 校验结束，`onFinish` 开始执行，表单数据和校验信息以入参形式回传给用户

beforeFinish 和 onFinish 的使用详见 [表单方法](/form-render/advanced/form-methods)
