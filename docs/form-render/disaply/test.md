---
order: 3
group:
  order: 7
  title: 最佳展示
toc: content
---

# 纵向布局

<!-- #### 内联卡片
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  builtOperation: true,
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      widget: 'drawerList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 1,
        widget: 'card',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
            required: true,
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 B',
            type: 'string',
          },
          input4: {
            title: '输入框 C',
            type: 'string',
          },
        }
      }
    }
  }
};

export default () => {
  const form = useForm();

  return  <FormRender schema={schema} form={form} />
};
``` -->







```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'tableList',
      
      items: {
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
          input3: {
            title: '简单输入框3',
            type: 'string',
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'select',
          }
        }
      }
    }
  }
};

export default () => {
  const form = useForm();
  return  <FormRender schema={schema} form={form} />
};
```

