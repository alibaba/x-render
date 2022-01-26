---
order: 3
group:
  order: 3
  title: 高级用法
toc: content
---

# 覆盖默认组件（mapping）

有些情况你对 FR 的默认组件的展示不满意，或者甚至想换一套全新的 UI 组件（非 antd），这时候使用自定义组件一次次地去声明 widget: 'myCustomWidget' 就显得极为繁琐。FR 提供了 mapping 这个 props，用于对 FR 内置的默认组件进行覆盖。先上个例子

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const CustomComA = props => {
  const { schema } = props;
  if (schema.$id === '#') {
    return <div>{props.children}</div>;
  }
  return (
    <div>
      my custom object:
      {props.children}
    </div>
  );
};

const schema = {
  type: 'object',
  properties: {
    object2: {
      title: '对象',
      type: 'object',
      properties: {
        input1: {
          title: '输入框',
          type: 'string',
        },
      },
    },
  },
  labelWidth: 120,
  displayType: 'row',
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
  };
  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        onFinish={onFinish}
        mapping={{ object: 'CustomComA' }}
        widgets={{ CustomComA }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
