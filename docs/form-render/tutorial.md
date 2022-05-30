---
order: 1
title: 教程
toc: content
---

# 教程

FormRender 是一个 Schema 驱动的表单组件。只需要传入一个包含各种描述信息的 Schema，就能渲染出一个完整的表单。

我们从两个 FormRender 的必填属性：`schema` 和 `form` 开始学习 FormRender。前者用来描述表单，FormRender 根据其提供的信息渲染一个表单出来，是 FormRender 的核心。后者用来操作表单，比如提交，更改表单数据，状态等。只要熟练掌握这两个参数，就能满足大多数使用场景了。

> TIP：在学习的过程中，随时进入 [PlayGround](/playground)，巩固练习。

## Schema

通常情况下，`schema` 是一个 js 对象，一个简单的 `schema` 的结构如下。

```js
const schema = {
  type: 'object',                  // schema 顶层的 type 总是 object
  properties: {                    // properties 中存放所有的表单元素
    address: {                     // address 将成为表单提交时，此项数据的 key，相当于 antd Form 中的 name
      title: '地址',                // 此表单项的 label
      type: 'string',              // 此表单项的数据类型是 string
      placeholder: '请输入您的地址', // 输入框的 placeholder
      required: true,              // 此表单项是必填项
    },
  },
};
```

只要将这个 `schema` 和另一个必传参数，表单实例，`form` 传入 FormRender，就能得到一个简单的表单。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',             
  properties: {                    
    address: {                    
      title: '地址',               
      type: 'string',              
      placeholder: '请输入您的地址', 
      required: true,              
    },
  },
};

const Demo = () => {
  const form = useForm();
 
  return (
      <FormRender schema={schema} form={form}  />
  );
};

export default Demo;
```

我们可以按照这个格式添加更多的表单项，比如我们添加“日期”和“地区”这两个新的表单项。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',             
  properties: {                    
   address: {                    
      title: '地址',               
      type: 'string',              
      placeholder: '请输入您的地址', 
      required: true,              
    },
    // 添加日期选项
    date: {
      title: '日期',
      // range 代表当前项的数据是一个数据，且长度为2
      type: 'range',
      // format 代表当前项的格式，这里设置为 date，即日期
      format: 'date', 
      placeholder: ['请选择开始日期', '请选择结束日期'],
    },
    // 添加地区选项
    location: {
      title: '地区',
      type: 'string',
      // enum 和 enumNames 代表此项有多个选项
      enum: ['0', '1'],
      enumNames: ['国内', '国外']
    },
  },
};

const Demo = () => {
  const form = useForm();
 
  return (
      <FormRender schema={schema} form={form}  />
  );
};

export default Demo;
```

可以看到，`schema` 的结构非常简洁明了，只需要填写少量的配置信息就可以渲染出一个完整的表单。FormRender 会根据你提供的信息自动选择合适的组件去渲染。 

> 你可以在 [API](./api/schema.md#item) 中找到所有的配置项。

除了让 FormRender 自动匹配所需的组件外，你还可以通过 `widget` 字段手动指定渲染使用的组件。比如我们可以添加 `widget: 'select'` 将之前地区的单选组件变为下拉选择。FormRender 有丰富的 [内置组件](./api/inner-widget.md) 可供使用，你可以按需要选择合适的内置组件。如果内置组件不能满足需求，可以使用 [自定义组件](./advanced/widget.md)。

```js
const schema = {
  // ...
  location: {
    title: '地区',
    type: 'string',
    enum: ['0', '1'],
    enumNames: ['国内', '国外'],
    // FormRender 会强制使用 select 组件去渲染这个表单项，而不是刚才的 radio 组件
    widget: 'select',
  },
}
```

## Form

FormRender 使用 `useForm`，管理表单状态。你必须将 `useForm` 返回的 form 实例传入 FormRender。

如果想提交刚才创建的表单，我们只需要在合适的位置调用 `form.submit()` 这个方法。FormRender 会主动校验表单，触发 `onFinish` 回调，并传入表单数据。

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',             
  properties: {                    
   address: {                    
      title: '地址',               
      type: 'string',              
      placeholder: '请输入您的地址', 
      required: true,              
    },
    date: {
      title: '日期',
      type: 'range',
      format: 'date',
      placeholder: ['请选择开始日期', '请选择结束日期'],
    },
    location: {
      title: '地区',
      type: 'string',
      enum: ['0', '1'],
      enumNames: ['国内', '国外'],
      widget: 'select',
    },
  },
};

const Demo = () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData', formData);
  }
 
  return (
    <>
      <FormRender schema={schema} form={form} onFinish={onFinish} />
      <Button onClick={form.submit} type="primary">提交</Button>
    </>
  );
};

export default Demo;
```

除了提交外，另一个比较常见的需求是表单数据的回填，FormRender 提供的 `form.setValues` 可以很方便的设置表单数据。

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',             
  properties: {                    
   address: {                    
      title: '地址',               
      type: 'string',              
      placeholder: '请输入您的地址', 
      required: true,              
    },
    date: {
      title: '日期',
      type: 'range',
      format: 'date',
      placeholder: ['请选择开始日期', '请选择结束日期'],
    },
    location: {
      title: '地区',
      type: 'string',
      enum: ['0', '1'],
      enumNames: ['国内', '国外'],
      widget: 'select',
    },
  },
};

const Demo = () => {
  const form = useForm();

  React.useEffect(() => {
    form.setValues({
      address: '地址',
      date: ['2022-12-31', '2022-12-31'],
      location: '0'
    })
  }, [])

  const onFinish = (formData) => {
    console.log('formData', formData);
  }
 
  return (
    <>
      <FormRender schema={schema} form={form} onFinish={onFinish} />
      <Button onClick={form.submit} type="primary">提交</Button>
    </>
  );
};

export default Demo;
```

## 总结

到此为止，你已经了解了 FormRender 的基本使用了，建议多多去 [PlayGround](/playground) 转转，能帮助你快速熟悉 `schema` 的写法。如果想继续了解表单联动、自定义组件等进阶使用，请前往 **高级用法**。