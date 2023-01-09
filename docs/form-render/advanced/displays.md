---
order: 7
group:
  order: 3
  title: 高级用法
toc: content
---

# 列表的展示

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。

1. 默认展示使用 widget: 'cardList'，卡片类型，用于展示数量不太多但结构复杂的 list


## SimpleList
- 用于展示每行只有 1-3 个简单控件的情况，紧凑排列

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list_ikPi2q: {
      title: '数组',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string'
          },
          input2: {
            title: '输入框 B',
            type: 'string'
          },
          input3: {
            title: '输入框 C',
            type: 'string'
          }
        }
      }
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
   <FormRender schema={schema} form={form} />
  );
};
```

### 1. Collpase

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list_ikPi2q: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        theme: 'collapse',
        props: {
          title: '折叠面板'
        },
        properties: {
          input_3XWgl7: {
            title: '输入框',
            type: 'string'
          }
        }
      }
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
    <div style={{ maxWidth: '600px' }}>
      <FormRender 
        schema={schema} 
        form={form}
      />
   </div>
  )
};
```

### 2. Card

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list_ikPi2q: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        theme: 'card',
        props: {
          title: 'Card 卡片',
        },
        properties: {
          input_3XWgl7: {
            title: '输入框',
            type: 'string'
          }
        }
      }
    }
  },
  labelCol: {
    span: 2
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form}
    />
  )
};
```

### 2. LineTitle

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list_ikPi2q: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        theme: 'lineTitle',
        props: {
          title: '标题线',
        },
        properties: {
          input_3XWgl7: {
            title: '输入框',
            type: 'string'
          }
        }
      }
    }
  },
  labelCol: {
    span: 2
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form}
    />
  )
};
```

### 4. LineTitle

