---
title: 组件样例
order: 2
nav:
  order: 5
  title: FR 1.0
# sidemenu: false
# gapless: true
---

form-render 1.x 是下一代的 `React.js` 表单解决方案。项目从内核级别进行了重写，为了能切实承接日益复杂的表单场景需求。我们的目标是以强大的扩展能力对表单场景 100%的覆盖支持，同时保持开发者能快速上手，并以表单编辑器、插件、自定义组件等一系列周边产品带来极致的开发体验。在开发 1.0 的道路上，我们做了一系列的取舍，详见[0.x - 1.0 迁移文档](/FR1.0/migrate)

## 新功能

- 大小从原本的 70k -> 11k
- 校验：antd 表单校验语法全支持
- UI 和数据不再需要一致，展示更自用，从

## 第一个表单

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    range1: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
    },
    input1: {
      bind: 'a.b.c',
      title: '简单输入框',
      description: '输入‘123’，避免外部校验错误',
      type: 'string',
      required: true,
    },
  },
};

const Demo = () => {
  const form = useForm();

  const beforeFinish = ({ formData, errorFields }) => {
    if ((formData.objectName && formData.objectName.input1 === '123') || true)
      return;
    return delay(1000).then(() => {
      form.setErrorFields({
        name: 'objectName.select1',
        error: ['外部校验错误'],
      });
    });
  };

  const onFinish = ({ formData, errorFields }) => {
    console.group('onFinish');
    console.log(formData, 'formData', errorFields, 'errors');
    console.groupEnd();
    if (errorFields.length > 0) return;
    // alert('formData:' + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log(form.getValues());
        }}
      >
        取值
      </button>
      <button
        onClick={() => {
          form.setValues({
            a: { b: { c: '23434' } },
            startDate: '2021-03-10',
            endDate: '2021-04-08',
            obj: { input2: 'heelo' },
          });
        }}
      >
        赋值
      </button>
      <button onClick={form.submit}>提交</button>
      <FormRender
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
        debug={true}
      />
    </div>
  );
};

export default Demo;
```
