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

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      // widget: 'cardList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            default: 'a',
          },
          obj: {
            title: '对象',
            type: 'object',
            properties: {
              input1: {
                title: '简单输入框',
                type: 'string',
                required: true,
                default: '卡片列表',
              },
              select1: {
                title: '单选',
                type: 'string',
                enum: ['a', 'b', 'c'],
                enumNames: ['早', '中', '晚'],
              },
            },
          },
        },
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

<br>
<br>

2. widget: 'simpleList' 用于展示每行只有 1-3 个简单元素的情况

```jsx
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'simpleList',
      'add-widget': 'addBtn',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
    },
  },
};

const AddBtn = props => {
  return (
    <Button {...props} style={{ width: '50%' }} icon={<PlusOutlined />}>
      新增一条
    </Button>
  );
};

const Demo = () => {
  return <Form widgets={{ addBtn: AddBtn }} schema={schema} />;
};

export default Demo;
```

<br>
<br>

3. widget: 'tableList' 用于展示每行只有 3 - n 个简单元素的情况，特别是数据量很大需要分页的

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
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

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

<br>
<br>

4. widget: 'drawerList' 用于展示存在列表套列表，列表套对象等复杂元素的情况

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
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
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
          listName2: {
            title: '对象数组',
            description: '对象数组嵌套功能',
            type: 'array',
            widget: 'simpleList',
            props: {
              hideMove: true,
            },
            items: {
              type: 'object',
              properties: {
                input1: {
                  title: '简单输入框',
                  type: 'string',
                  required: true,
                },
                select1: {
                  title: '单选',
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumNames: ['早', '中', '晚'],
                },
              },
            },
          },
        },
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

<br>
<br>

5. widget: 'tabList' 用于展示可新增/关闭页签的 Tabs 标签页

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    tabsName1: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'tabList',
      props: {
        type: 'editable-card',
        tabName: '项目', // 选项卡显示文字，对应antd中Tabs的tab属性。 这里也可以是数组
        draggable: true, //  是否可拖拽
      },
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
          listName1: {
            title: '对象数组',
            type: 'array',
            widget: 'list1',
            props: {
              hideMove: true,
            },
            items: {
              type: 'object',
              properties: {
                input1: {
                  title: '简单输入框',
                  type: 'string',
                  required: true,
                },
                select1: {
                  title: '单选',
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumNames: ['早', '中', '晚'],
                },
              },
            },
          },
        },
      },
    },
  },
};

const Demo = () => <Form schema={schema} />;
export default Demo;
```

<!-- <br>

| tabList 参数 | 描述                                               | 类型                 | 默认值 |
| ------------ | -------------------------------------------------- | -------------------- | ------ |
| tabName      | 选项卡头显示文字                                   | `string \| string[]` | '项目' |
| type         | 页签的基本样式，可选 line、card editable-card 类型 | `string`             | 'line' |
| draggable    | 是否可拖拽                                         | `boolean`            | false  | -->

<br>
<br>

6. widget: 'virtualList' 在展示上与 'tableList' 基本相同，但以虚拟滚动替代了传统的分页

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'virtualList',
      itemProps: {
        buttons: [
          {
            callback: 'hello',
            text: '复制',
          },
        ],
      },
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

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

<br>
<br>

7. 使用 index，用于展示列表每行的序号

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '礼物配置',
      description: '可以有多套配置方案',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '{{`配置方案${rootValue.index + 1}`}}',
            type: 'string',
            required: true,
          },
        },
      },
    },
  },
};

const Demo = () => {
  return <Form schema={schema} />;
};

export default Demo;
```

8. 自定义 onAdd(添加)、onRemove(删除)

```jsx
import React from 'react';
import Form from '../demo/display';

const schema = {
  type: 'object',
  properties: {
    listName2: {
      title: '礼物配置',
      description: '可以有多套配置方案',
      type: 'array',
      widget: 'simpleList',
      props: {
        onAdd: 'addFunc',
        onRemove: 'removeFunc'
      },
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '{{`配置方案${rootValue.index + 1}`}}',
            type: 'string',
            required: true,
          },
        },
      },
    },
  },
};

const Demo = () => {
  const methods = {
    addFunc: (cb, { schema }) => {
      alert('自定义新增');
      // 处理完成，执行内置逻辑
      cb();
    },
    removeFunc: (cb, { schema }) => {
      alert('自定义删除');
      // 处理完成，执行内置逻辑
      cb();
    }
  };

  return <Form schema={schema} methods={methods}/>;
};

export default Demo;
```
