---
order: 3
group:
  order: 5
  title: 最佳展示
toc: content
---

# 列表展示

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。
默认使用 widget: 'cardList'，卡片类型

## 一、SimpleList
用于展示每行只有 1-3 个简单控件的情况，紧凑排列

#### Demo 1.1
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
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

####  Demo 1.2
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
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

####  Demo 1.3
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      display: 'inline',
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

####  Demo 1.4
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      display: 'inline',
      props: {
        hasBackground: true,
      },
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



## 二、CardList
用于展示结构复杂，但数量不太多的 list

#### Demo 2.1
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      // widget: 'cardList',
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

#### Demo 2.2
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      // widget: 'cardList',
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


#### Demo 2.3
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      display: 'inline',
      // widget: 'cardList',
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

#### Demo 2.4
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
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

#### Demo 2.5
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
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


#### Demo 2.6
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    list: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
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




