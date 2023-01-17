---
order: 1
group:
  order: 7
  title: 最佳展示
toc: content
---

# 横向布局

## 一、基础控件：item
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties:{
    input1: {
      title: '输入框',
      type: 'string',
      props: {}
    },
    number1: {
      title: '数字输入框',
      type: 'number'
    },
    switch1: {
      title: '是否选择',
      type: 'boolean',
      widget: 'switch'
    },
    select1: {
      title: '下拉单选',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ],
      }
    },
    multiSelect1: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string'
      },
      widget: 'multiSelect',
      props: {
        options: [
          { label: '杭州', value: 'a' },
          { label: '武汉', value: 'b' },
          { label: '湖州', value: 'c' },
          { label: '贵阳', value: 'd' }
        ]
      }
    },
    radio1: {
      title: '点击单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ],
      }
    },
    checkboxes1: {
      title: '点击多选',
      type: 'array',
      widget: 'checkboxes',
      items: {
        type: 'string'
      },
      props: {
        options: [
          { label: '杭州', value: 'a' },
          { label: '武汉', value: 'b' },
          { label: '湖州', value: 'c' },
          { label: '贵阳', value: 'd' }
        ]
      }
    },
    textarea1: {
      title: '编辑框',
      type: 'string',
      format: 'textarea',
      props: {}
    },
    html_1: {
      title: 'HTML',
      type: 'string',
      widget: 'html',
      props: {}
    },
    date1: {
      title: '日期选择',
      type: 'string',
      format: 'date'
    },
    dateRange1: {
      title: '日期范围',
      type: 'range',
      'format': 'dateTime',
      props: {
        'placeholder': [
          '开始时间',
          '结束时间'
        ]
      }
    },
    time1: {
      title: '时间选择',
      type: 'string',
      format: 'time'
    },
    timeRange1: {
      title: '时间范围',
      type: 'range',
      format: 'time',
      props: {
        'placeholder': [
          '开始时间',
          '结束时间'
        ]
      }
    },
    checkbox1: {
      title: '是否选择',
      type: 'boolean',
      widget: 'checkbox'
    },
    slider1: {
      title: '带滑动条',
      type: 'number',
      widget: 'slider'
    },
    image1: {
      title: '图片展示',
      type: 'string',
      format: 'image'
    },
    color1: {
      title: '颜色选择',
      type: 'string',
      format: 'color'
    }
  }
}

export default () => {
  const form = useForm();
  
  return (
   <FormRender schema={schema} form={form} />
  );
};
```

## 二、嵌套控件：Obj
对于嵌套类型的表单，我们内置了四种主题，分别为 collapse | card | tile | flex, 默认为 collapse 主题

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


## 三、列表控件：List

列表的展示对于简单需求占位太多，复杂需求定制不够一直是痛点。所以我们给出了 5 种展示，充分满足从极简到复杂的所有需求。
默认使用 widget: 'cardList'，卡片类型

### SimpleList
用于展示每行只有 1-3 个简单控件的情况，紧凑排列

#### 基础
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
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

#### 基础带背景
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
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

#### 标签内联
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  displayType: 'row',
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

#### 标签内联带背景
```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema ={
  type: 'object',
  displayType: 'row',
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



### CardList
用于展示结构复杂，但数量不太多的 list

#### 折叠
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

#### 卡片
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


#### 标题线
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

#### 内联折叠
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

#### 内联卡片
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


#### 内联标题线
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
