---
order: 0
toc: content
mobile: false
group: 
  title: 最佳示例
  order: 2
---

# 内置组件

## 基础组件

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
import schema from './schema/baseControl';


export default () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData：', formData);
  };

  return <FormRender form={form} schema={schema} footer={true} onFinish={onFinish} />;
};
```

## 嵌套组件

### 折叠 collapse

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      description: '这是一个对象类型',
      widget: 'collapse',
      column: 3,
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### 卡片 card

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      widget: 'card',
      title: '卡片主题',
      description: '这是一个对象类型',
      column: 3,
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### 标题线 lineTitle

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      widget: 'lineTitle',
      description: '这是一个对象类型',
      column: 3,
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### 内联 subInline

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      widget: 'subInline',
      description: '这是一个对象类型',
      column: 3,
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

## 列表组件

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。
默认使用 widget: 'cardList'，卡片类型

### SimpleList

用于展示每行只有 1-3 个简单组件的情况，紧凑排列

#### simpleList：标签换行

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### simpleList：标签换行-带背景

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      props: {
        hasBackground: true,
      },
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### simpleList：标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      display: 'inline',
      labelWidth: 100,
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### simpleList：标签内联-带背景

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      display: 'inline',
      labelWidth: 100,
      props: {
        hasBackground: true,
      },
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### CardList

用于展示结构复杂，但数量不太多的 list

#### cardList：折叠-标签换行

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      // title: '对象数组',
      // description: '对象数组嵌套功能',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### cardList：卡片-标签换行

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
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'card',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### cardList：标题线-标签换行

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
      widget: 'cardList',
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'lineTitle',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### cardList：折叠-标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      widget: 'cardList',
      labelWidth: 100,
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### cardList：卡片-标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      widget: 'cardList',
      labelWidth: 100,
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'card',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

#### cardList：标题线-标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      widget: 'cardList',
      labelWidth: 100,
      items: {
        type: 'object',
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        widget: 'lineTitle',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
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
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
};
```

### DrawerList

用于展示存在列表套列表，列表套对象等复杂元素的情况

#### drawerList：标签换行

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
      widget: 'drawerList',
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

#### drawerList：标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      widget: 'drawerList',
      display: 'inline',
      labelWidth: 100,
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

### TableList

用于展示每行只有 3 - n 个简单元素的情况，特别是数据量很大需要分页的

#### tableList：标签换行

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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

#### tableList：标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      widget: 'tableList',
      display: 'inline',
      labelWidth: 100,
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

### VirtualList

用于展示每行只有 3 - n 个简单元素的情况，数据量大时使用滚动加载

#### virtualList：标签换行

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
      widget: 'virtualList',
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

#### virtualList：标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      widget: 'virtualList',
      display: 'inline',
      labelWidth: 100,
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

### TabList

用于多标签页展示表单的情况

#### tabList：标签换行

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
      widget: 'tabList',
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```

#### tabList：标签内联

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      tooltip: '对象数组嵌套功能',
      type: 'array',
      widget: 'tabList',
      display: 'inline',
      labelWidth: 100,
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
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();
  return <FormRender schema={schema} form={form} />;
};
```
