---
order: 3
toc: content
group: 
  title: 高级用法
  order: 1
---

# path 书写教程

当你需要调用 setSchemaByPath 时，需要书写改动的表单元素对应的 path。如果元素结构很深，如何写正确的 path 呢？

## 基础型：path
form.setSchemaByPath('radio', { enum: [1, 2, 3] });
```jsx
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = () => {
  const form = useForm();

  const onMount = () => {
    setTimeout(() => {
      form.setSchemaByPath('radio', { enum: [1, 2, 3] });
    }, 1000);
  };

  const schema = {
    type: 'object',
    displayType: 'row',
    properties: {
      radio : {
        title: '选择框',
        type: 'string',
        widget: 'radio',
        enum: []
      }
    }
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
    />
  );
};

export default Demo;

```

## 嵌套型：path
form.setSchemaByPath('x.radio', { enum: [1, 2, 3] });
```jsx
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',
    properties: {
      x: {
        type: 'object',
        properties: {
          radio: {
            title: '选择框',
            type: 'string',
            widget: 'radio',
            enum: []
          }
        }
      }
    }
  };

  const onMount = () => {
    setTimeout(() => {
      form.setSchemaByPath('x.radio', { enum: [1, 2, 3] });
    }, 1000);
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
    />
  );
};

export default Demo;

```



## List 型：path
form.setSchemaByPath('x[].radio', { enum: [1, 2, 3] });
```jsx
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',
    properties: {
      x: {
        title: '对象数组',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            radio : {
              title: '选择框',
              type: 'string',
              widget: 'radio',
              enum: []
            }
          }
        }
      }
    }
  };

  const onMount = () => {
    setTimeout(() => {
      form.setSchemaByPath('x[].radio', { enum: [1, 2, 3] });
    }, 1000);
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
    />
  );
};

export default Demo;

```

## 复杂嵌套：path
 form.setSchemaByPath('x.y[].radio', { enum: [1, 2, 3] });
```jsx
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    displayType: 'row',
    properties: {
      select1: {
        title: '输入框 A',
        type: 'string',
      },
      select2: {
        title: '输入框 B',
        type: 'string',
      },
      x: {
        type: 'object',
        title: '复杂型',
        widget: 'lineTitle',
        properties: {
          y: {
            title: '对象数组',
            type: 'array',
            display: 'inline',
            items: {
              type: 'object',
              properties: {
                radio : {
                  title: '选择框',
                  type: 'string',
                  widget: 'radio',
                  enum: []
                }
              }
            }
          }
        }
      }
    }
  };

  const onMount = () => {
    setTimeout(() => {
      form.setSchemaByPath('x.y[].radio', { enum: [1, 2, 3] });
    }, 1000);
  };

  return (
    <FormRender
      form={form}
      schema={schema}
      onMount={onMount}
    />
  );
};

export default Demo;

```

