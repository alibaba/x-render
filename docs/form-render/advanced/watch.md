---
order: 5
group:
  order: 3
  title: 高级用法
toc: content
---

# 表单监听（watch）

有时我们需要根据特定表单数据的变动而时时触发一个 callback，FormRender 开放了 `watch` 变量，用于数据的监听的唤起回调。语法类似于 vue 的 watch。

注意 form-render 并未限制在 watch 的 callback 里能写的内容，请慎重使用。例如 path 是'#' 则默认每次都会执行，要是在 callback 里写了任何对 formData、schema 的修改，就可能会陷入反复触发。所以请确保 watch 的逻辑符合真实联动使用逻辑。

## 值的联动

注意使用 form.setValueByPath 指定路径对值进行修改

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      placeholder: '尝试在此输入',
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
    },
  },
};

const Demo = () => {
  const form = useForm();

  const watch = {
    // # 为全局
    '#': val => {
      console.log('表单的时时数据为：', val);
    },
    input1: val => {
      form.setValueByPath('input2', val);
    },
  };

  return <FormRender form={form} schema={schema} watch={watch} />;
};

export default Demo;
```

## schema 的联动

form.setSchemaByPath 指定路径对 schema 进行修改

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      placeholder: '尝试在此输入',
    },
    input2: {
      title: '简单输入框2',
      type: 'string',
    },
    obj1: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        select: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          widget: 'radio',
        },
      },
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
    input1: val => {
      if (val && val.length > 2) {
        form.setSchemaByPath('obj1.select', ({ enumNames }) => {
          return {
            enumNames: enumNames.map(item => item + 'a'),
          };
        });
      } else {
        form.setSchemaByPath('obj1.select', { enumNames: ['早', '中', '晚'] });
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
      <Button
        type=""
        style={{ marginRight: 8 }}
        onClick={() =>
          form.setSchemaByPath('input2', {
            title: '编辑框',
            format: 'textarea',
          })
        }
      >
        将 input 改为 textarea
      </Button>
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
