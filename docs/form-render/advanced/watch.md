---
order: 5
---

# 表单监听 & 回调

有时我们需要根据特定表单数据的变动而时时触发一个 callback，FormRender 开放了 `watch` 变量，用于数据的监听的唤起回调。语法类似于 vue 的 watch。这个功能的会在接下来的版本进一步扩展。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
    },
  },
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errorFields) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  const watch = {
    // # 为全局
    '#': val => {
      console.log('表单的时时数据为：', val);
    },
    input1: val => {
      if (val !== undefined) {
        form.onItemChange('input2', val);
      }
    },
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        onFinish={onFinish}
        watch={watch}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

### 语法说明

`watch` 是一个对象，key 值为数据对应的“路径”，value 为 callback 函数，或者在复杂情况是个对象

```js
const watch = {
  // # 为全局
  '#': val => {
    console.log('表单的时时数据为：', val);
  },
  input1: val => {
    if (val !== undefined) {
      form.onItemChange('input2', val);
    }
  },
  'object1.select2': {
    handler: val => {
      if (val === 'option1') {
        form.onItemChange('object1.input2', 'hello');
      }
    },
    immediate: true,
  },
};
```

### Option: immediate

- 类型: boolean
- 默认: false

`immediate: true` 会在首次加载时就执行一次 watch 的 handler

```js
const watch = {
  // # 为全局
  input1: {
    handler: val => {
      if (val !== undefined) {
        form.onItemChange('input2', val);
      }
    },
    immediate: true,
  },
};
```
