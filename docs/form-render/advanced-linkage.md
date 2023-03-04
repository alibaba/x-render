---
order: 1
toc: content
group: 
  title: 高级用法
  order: 1
---

# 表单联动
- `{{ }}`（函数表达式） 简单联动
- `watch` 复杂联动
- `dependencies` 当依赖的数据发生变化时，触发更新

## 简单联动
### {{ }} 函数表达式

表单联动是开发中常见的交互，为此我们创造了一种简洁的配置方式来支持联动。通过函数表达式来控制表单项的隐藏、是否可编辑等交互。

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

### formData 示例
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    switch1: {
      title: '隐藏输入框',
      type: 'boolean',
      widget: 'switch'
    },
    input1: {
      title: '输入框',
      type: 'string',
      required: true,
      hidden: '{{ formData.switch1 === true }}'
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form}
      labelWidth={200}
      maxWidth={400}
    />
  )
};
```

### rootValue 示例
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '会员活动',
      type: 'array',
      display: 'inline',
      default: [{}],
      items: {
        type: 'object',
        properties: {
          switch1: {
            title: '隐藏输入框',
            type: 'boolean',
            widget: 'switch'
          },
          input1: {
            title: '输入框',
            type: 'string',
            required: true,
            hidden: '{{ rootValue.switch1 === true }}',
          }
        }
      }
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form}
      labelWidth={100}
      maxWidth={400}
    />
  )
};
```

## 复杂联动

### watch 监听
watch: 用于监听表单数据改变，根据 path 路径注册表单项监听事件
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

### 修改表单项 value 

form.setValueByPath：指定路径对值进行修改。[path 路径详见](/form-render/advanced/path)。

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
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

  return (
    <FormRender 
      form={form} 
      schema={schema} 
      watch={watch} 
      onValuesChange={onValuesChange} 
      labelWidth={200}
      maxWidth={400}
    />
  );
};
```

### 修改表单项 schema

form.setSchemaByPath：指定路径对 schema 进行修改 (不允许通过此 API 修改 value、defalut)。[path 路径详见](/form-render/advanced/path)。

```jsx
import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
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
      labelWidth={200}
      maxWidth={400}
    />
  );
};
```

## 表单项关联
dependencies：用于完成组件内部复杂的联动逻辑，关联的字段更新时，该组件将自动触发更新与校验。
- 类型：path[]，设置依赖字段，支持多个依赖字段
- 获取依赖值：组件内通过 props.dependValues 获取依赖值集合

### 触发更新
依赖值发生变化，自定义组件触发更新
```jsx
import React from 'react';
import { Input, } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;

const CustomTextArea = props => {
  const { dependValues, ...otherProps } = props;

  console.log(dependValues, 'dependValues');

  return <TextArea rows={dependValues?.[0] || 2} {...otherProps} />;
};

export default () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',
    displayType: 'row',
    properties: {
      input1: {
        title: '输入框高度',
        type: 'number'
      },
      select1: {
        title: '输入框',
        type: 'string',
        dependencies: ['input1'],
        widget: 'CustomTextArea'
      }
    }
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      widgets={{ CustomTextArea }}
      labelWidth={200}
      maxWidth={400}
    />
  );
}
```

### 触发校验
依赖值发生变化，自定义校验触发校验

```jsx
import React from 'react';
import { Input, } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;

const CustomTextArea = props => {
  const { dependValues } = props;

  console.log(dependValues, 'dependValues');

  return <TextArea rows={dependValues?.[0] || 2} />;
};

export default () => {
  const form = useForm();

  const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '密码',
      type: 'string',
      required: true,
    },
    input2: {
      title: '确认密码',
      type: 'string',
      dependencies: ['input1'],
      required: true,
      rules: [
        { 
          validator: (_, value, { form }) => {
            if (!value || form.getFieldValue('input1') === value) {
              return true;
            }
            return false;
          }, 
           message: '你输入的两个密码不匹配' 
        }
      ]
    }
  }
};

  return (
    <FormRender
      form={form}
      schema={schema}
      widgets={{ CustomTextArea }}
      labelWidth={200}
      maxWidth={400}
    />
  );
}
```

### 双向绑定
- addons：简单理解就是 form 实例
- dependValues：依赖值集合


```jsx
import { Button, Checkbox } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const CustomCheckbox = ({ addons, dependValues }) => {
  const { setValueByPath } = addons;
  console.log(dependValues);

  const checked = dependValues?.[0]?.length === 4;

  const onChange = e => {
    const val = e.target.checked;
    console.log(val);

    if (val === false) {
      setValueByPath('boxes', []);
    } else if (val === true) {
      setValueByPath('boxes', [1, 2, 3, 4]);
    }
  };

  return <Checkbox checked={checked} onChange={onChange} />;
};

export default () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',
    properties: {
      select1: {
        title: '是否全选',
        type: 'boolean',
        dependencies: ['boxes'],
        widget: 'CustomCheckbox',
      },
      boxes: {
        title: '可用操作',
        description: '多选',
        type: 'array',
        items: {
          type: 'number',
        },
        enum: [1, 2, 3, 4],
        enumNames: ['增', '删', '改', '查'],
        widget: 'checkboxes'
      }
    }
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      widgets={{ CustomCheckbox }}
      labelWidth={200}
      maxWidth={400}
    />
  );
};
```





