---
order: 2
group:
  order: 6
  title: 最佳展示
toc: content
---

# 嵌套展示

对于嵌套类型的表单，我们内置了四种主题，分别为 collapse | card | tile | flex, 默认为 collapse 主题

## 一、横版
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
      column: 2,
      properties: {
        input1: {
          title: '输入框里达风景',
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

### 内联表单 subInline
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


## 二、竖版
### 折叠 collapse
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    obj: {
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
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
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

### 卡片 card
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
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

### 标题线 lineTitle
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
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

### 内联表单 subInline
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
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



