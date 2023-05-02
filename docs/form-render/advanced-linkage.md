---
order: 1
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 表单联动

表单联动是开发中常见的交互，FormRender 提供以下几种方式来满足不同的交互场景

- `{{ }}` 函数表达式，实现简单联动
- `watch` watch 监听，实现复杂联动
- `dependencies` 依赖字段设置，当依赖项数据发生变化时，触发更新

## {{ }} 函数表达式

函数表达式为字符串格式，并以双花括号`"{{...}}"`为语法特征，用一种简洁的配置方式来支持联动。例如：控制表单项禁用、隐藏等交互。

```json
{
  "disabled": "{{ formData.switch1 === true }}",
  "hidden": "{{ rootValue.input1 }}"
}
```

- formData: 整个表单的值
- rootValue: 用于 List 场景使用，表示 List.Item 的值

#### 示例
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    switch1: {
      title: '禁用输入框',
      type: 'boolean',
      widget: 'switch'
    },
    input1: {
      title: '输入框',
      type: 'string',
      disabled: '{{ formData.switch1 === true }}'
    },
    list: {
      title: 'List 场景',
      type: 'array',
      widget: 'CardList',
      defaultValue: [{}],
      items: {
        type: 'object',
        widget: 'card',
        title: 'List.Item',
        properties: {
          switch1: {
            title: '隐藏输入框 2 ',
            type: 'boolean',
            widget: 'switch'
          },
          input1: {
            title: '输入框 1',
            type: 'string',
            description: '给输入框 赋值'
          },
          input2: {
            title: '输入框 2',
            type: 'string',
            defaultValue: '{{ rootValue.input1 }}',
            hidden: '{{ rootValue.switch1 }}'
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
      maxWidth={400}
    />
  );
}
```

## watch 监听
`watch` 其实就是 `onValuesChange`（不提供对外使用）的增强版，用于监听表单数据改变，可以做到单字段细粒度的监听。

语法特征：`[path]: () => {}`，path 按照表单的数据结构路径书写就可以了，List 组件的比较特殊，例如对应的表单字段是 cityList 需要写成 `cityList[]`。

```js
const watch = {
  '#': (allValues, changedValues) => { // '#': () => {} 等同于 onValuesChange
    console.log('表单 allValues：', allValues);
    console.log('表单 changedValues：', changedValues);
  },
  'input1': value => {
    console.log('input1：', value);
  },
  'obj.input2': (value) => {
    console.log('input2：', value);
  },
  'list[].input4': (value, indexList) => {
    console.log('list[].input4：', value, '，indexList：', indexList);
  },
  
};
```
#### 示例
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  maxWidth: 400,
  properties: {
    input1: {
      title: '输入框 1',
      type: 'string',
    },
    obj: {
      type: 'object',
      widget: 'card',
      title: '一级嵌套',
      properties: {
        input2: {
          title: '输入框 2',
          type: 'string'
        }
      }
    },
    list: {
      title: 'List 嵌套',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: 'List.Item',
        properties: {
          input4: {
            title: '输入框 4',
            type: 'string',
          },
          obj: {
            type: 'object',
            widget: 'card',
            title: '一级嵌套',
            properties: {
              input5: {
                title: '输入框 5',
                type: 'string',
              },
              list: {
                type: 'array',
                widget: 'cardList',
                items: {
                  type: 'object',
                  title: '二级 List.Item',
                  properties: {
                    input6: {
                      title: '输入框 6',
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default () => {
  const form = useForm();
  const watch = {
    '#': (allValues, changedValues) => { // '#': () => {} 等同于 onValuesChange
      console.log('表单 allValues：', allValues);
      console.log('表单 changedValues：', changedValues);

    },
    'input1': (value) => {
      console.log('input1：', value);
    },
    'obj.input2': (value) => {
      console.log('input2：', value);
    },
    'obj.obj.input3': (value) => {
      console.log('input3：', value);
    },
    'list': (value) => {
     console.log('list：', value);
    },
    'list[].input4': (value, indexList) => {
      console.log('list[].input4：', value, '，indexList：', indexList);
    },
    'list[].obj.input5': (value, indexList) => {
      console.log('list[].obj.input5：', value, '，indexList：', indexList);
    },
    'list[].obj.list': (value, indexList) => {
      console.log('list[].obj.list：', value, '，indexList：', indexList);
    },
    'list[].obj.list[]': (value, indexList) => {
      console.log('list[].obj.list：', value, '，indexList：', indexList);
    },
    'list[].obj.list[].input6': (value, indexList) => {
      console.log('list[].obj.list[].input6：', value, '，indexList：', indexList);
    }
  }

  return <FormRender schema={schema} form={form} watch={watch}/>;
};

```




#### 修改表单项的值 (value) 

form.setValueByPath：指定路径对值进行修改。[path 路径详见](/form-render/advanced-path)。

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
    input1: val => {
      form.setValueByPath('input2', val);
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

#### 修改表单项的协议（schema）

form.setSchemaByPath：指定路径对 schema 进行修改 (不允许通过此 API 修改 value、defalut)。[path 路径详见](/form-render/advanced-path)。

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

## dependencies 依赖字段
当依赖项的值发生改变时，组件自身会触发`更新`和`校验`，可以通过组件 props.addons.dependValues 拿到依赖项的值


- dependencies：[`string`] 设置依赖字段，支持设置多个
- 用 `{{ }}` 函数表达式同样能使组件触发更新，但是无法实现触发校验的效果，所以 dependencies 的核心场景是 `被动触发校验`
- 同 `{{ }}` 函数表达式另一不同的地方就是值传递给组件的方式不同，设置 dependencies，依赖项的值会统一收集到 props.addons.dependValues 里面。


#### 示例 1：触发更新
依赖值发生变化，自定义组件触发更新

```json
{ 
  "dependencies": ["input1"], // 方式一

  "props": { // 方式二
    "rows": "{{ formData.input1 }}"
  }
}
```
```jsx
import React from 'react';
import { Input, } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;

const CustomTextArea = props => {
  console.log(props.addons.dependValues, 'dependValues');

  return <TextArea rows={props.addons.dependValues?.[0] || 2} {...props} />;
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
        widget: 'CustomTextArea',
        dependencies: ['input1'],
        props: {
          rows: '{{ formData.input1 }}'
        }
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

#### 示例 2：触发校验
当`密码输入框`的值和`确认密码输入框`的值一致时，再次修改密码会重新触发 `确认密码输入框` 的校验
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
            if (!value || form.getValueByPath('input1') === value) {
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

#### Form List 中的依赖

- `[index]` 表示特定位置的 List Item，比如 `list[1].foo`。
- 只传 `[]` 则表示相同位置的其他 List Item，比如 `list[].foo`。


<code src="./demo/linkage/list.tsx"></code>


