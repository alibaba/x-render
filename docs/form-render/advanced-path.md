---
order: 3
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# path 书写

调用 setSchemaByPath 时，需要根据 path 改动表单元素的 schema。如果元素结构很深，如何正确书写 path 呢？

## 基础型：path
设置选项：form.setSchemaByPath('radio', { enum: [1, 2, 3] });
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
      labelWidth={100}
      maxWidth={400}
    />
  );
};

export default Demo;

```

## 嵌套型：path
设置选项：form.setSchemaByPath('x.radio', { enum: [1, 2, 3] });
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
        title: 'xxx',
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
      labelWidth={100}
      maxWidth={400}
    />
  );
};

export default Demo;

```



## 列表型：path
设置选项：form.setSchemaByPath('x[].radio', { enum: [1, 2, 3] });
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
        default: [{}],
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
      labelWidth={100}
      maxWidth={400}
    />
  );
};

export default Demo;

```

## 复杂嵌套：path
设置选项：form.setSchemaByPath('x.y[].radio', { enum: [1, 2, 3] });
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
            default: [{}],
            items: {
              type: 'object',
              title: '基础信息',
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
      labelWidth={100}
      maxWidth={400}
    />
  );
};

export default Demo;

```

