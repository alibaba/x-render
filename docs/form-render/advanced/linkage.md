---
order: 8
group:
  order: 3
  title: 高级用法
toc: content
---

# 表单联动

## 一、简单联动
### 1.1 函数表达式

表单联动是开发中常见的交互，为此我们创造了这种简洁的配置方式来支持联动。通过函数表达式来控制表单项的隐藏、是否可编辑等联动交互。

表达式特征：
- 函数表达式为字符串，并以双花括号`"{{...}}"`为语法特征。除 default、rules 以外，schema 里的字段都支持函数表达式。例如

```json
{
  "disabled": "{{ formData.x.y === 1 }}",
}
```

表达式关键字：
- formData: 整个表单的值，根据 path 路径获取对应表单项的值，例如：formData.x.y 
- rootValue: 表单上一层级的值，只在 List 场景使用

总结：

### 1.2 formData 示例
当输入框 A 的值等于 'xxx' 时，输入框 B 不可编辑
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '输入框 A',
      type: 'string',
    },
    input2: {
      title: '输入框 B',
      type: 'string',
      disabled: "{{ formData.input1 === 'xxx' }}"
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form} 
      builtOperation={true}
    />
  )
};
```

### 1.3 rootValue 示例
当输入框 A 的值等于 'xxx' 时，输入框 B 不可编辑
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '会员活动',
      type: 'array',
      items: {
        type: 'object',
        theme: 'lineTitle',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
            disabled: "{{ rootValue.input1 === 'xxx' }}"
          }
        },
      },
      props: {
        hasBackground: true,
      }
    }
  },
  column: 2,
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form} 
      builtOperation={true}
      initialValues={{ list: [{ }]}}
    />
  )
};
```
## 二、复杂联动

### 2.1 watch 监听
watch: 用于监听表单数据改变从而唤起回调，它是一个对象集合，根据 path 路径注册相应的表单项监听事件
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
    }
  }
};
```

### 2.2 修改 value 

form.setValueByPath：指定路径对值进行修改

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '输入框 A',
      type: 'string',
      placeholder: '给输入框 B 赋值',
    },
    input2: {
      title: '输入框 B',
      type: 'string',
      disabled: true
    },
  },
};

export default () => {
  const form = useForm();

  const watch = {
    // # 为全局
    '#': val => {
      console.log('表单的实时数据为：', val);
    },
    input1: val => {
      form.setValueByPath('input2', val);
    },
  };

  const onValuesChange = (changedValues, allValues) => {
    form.setValueByPath('input2', changedValues.input1);
  }

  return <FormRender form={form} schema={schema} watch={watch} onValuesChange={onValuesChange} />;
};
```

### 2.3 修改 schema

form.setSchemaByPath：指定路径对 schema 进行修改 (不允许通过此 API 修改 value、defalut)

```jsx
import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '输入框',
      type: 'number',
      placeholder: '当值大于1时，会改变下拉框的选项',
    },
    select: {
      title: '下拉框',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widget: 'radio'
    }
  }
};

export default () => {
  const form = useForm();

  const watch = {
    input1: val => {
      if (val > 1) {
        form.setSchemaByPath('select', ({ enumNames }) => {
          return {
            enumNames: enumNames.map(item => item + 'a'),
          };
        });
        return ;
      }

      form.setSchemaByPath('select', { enumNames: ['早', '中', '晚'] });
    }
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      watch={watch}
    />
  );
};
```





