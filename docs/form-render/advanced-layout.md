---
order: 0
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 表单布局
- `displayType` 标签排列方式
- `column` 表单一行能展示的表单项个数
- `labelWidth` 标签固定宽度
- `cellSpan` 表单项跨列
- `span` 自定义宽度
- `maxWidth` 输入控件最长宽度  
- `labelCol`、`FieldCol` 表单项内部布局
- `footer` 内置按钮
## displayType

- displayType（标签排列方式）：`row`（水平）| `column`（垂直）| `inline`(紧凑)
- 默认值：`column`

```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/basic';

export default () => {
  const form = useForm();
  const [displayType, setDisplay] = useState('row');

  const handRadioChange = (ev) => {
    const value = ev.target.value;
    schema.displayType = value;
    form.setSchema(schema, true);
    setDisplay(value);
  };

  return (
    <div>
      <Form.Item label='displayType' style={{ marginBottom: '50px' }}>
        <Radio.Group value={displayType} onChange={handRadioChange}>
          <Radio.Button value='row'>row</Radio.Button>
          <Radio.Button value='column'>column</Radio.Button>
          <Radio.Button value='inline'>Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <FormRender
        schema={schema}
        form={form}
        labelCol={6}
        fieldCol={17}
      />
    </div>
  );
}
```

## column
一行可以展示多少个表单项，默认值: 1

```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/basic';

export default () => {
  const form = useForm();
  const [column, setColumn] = useState(3);

  const handRadioChange = (ev) => {
    const value = ev.target.value;
    schema.column = value;

    form.setSchema(schema, true);
    setColumn(value);
  };

  return (
    <>
      <Form.Item label='column' style={{ marginBottom: '50px' }}>
        <Radio.Group value={column} onChange={handRadioChange}>
          <Radio.Button value={1}>一列</Radio.Button>
          <Radio.Button value={2}>两列</Radio.Button>
          <Radio.Button value={3}>三列</Radio.Button>
          <Radio.Button value={4}>四列</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <FormRender
        form={form}
        schema={schema} 
        labelCol={6}
        fieldCol={17}
      />
    </>
  );
}
```

## lableWidth
设置标签固定宽度

```jsx
import React, { useState } from 'react';
import { InputNumber } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/basic';

export default () => {
  const form = useForm();
  const [labelWidth, setLabelWidth] = useState(60);

  return (
    <>
      <div style={{ marginBottom: '50px' }}>
        labelWidth：
        <InputNumber onChange={setLabelWidth} value={labelWidth} />
      </div>
      <FormRender
        form={form}
        schema={schema}
        labelWidth={labelWidth}
        column={3}
      />
    </>
  );
};
```

## cellSpan
设置表单项跨列展示，目前需配合 `lableWidth` 来使用，否则无法与其他表单项在样式上对齐，通过配置单个表单项的 `labelCol`、`fieldCol` 勉强能改善

```jsx
import React, { useState } from 'react';
import { InputNumber } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/cellSpan';

export default () => {
  const form = useForm();
  const [labelWidth, setLabelWidth] = useState(60);

  return (
    <FormRender
      form={form}
      schema={schema}
      labelWidth={60}
      column={3}
    />
  );
};
```

## span
设置表单项列宽度，表单布局会被切割成 24 等份，可以通过设置 span 来自定义表单项所占的宽度

```jsx
import React, { useState } from 'react';
import { InputNumber } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/span';

export default () => {
  const form = useForm();
  const [labelWidth, setLabelWidth] = useState(60);

  return (
    <FormRender
      form={form}
      schema={schema}
      labelWidth={80}
      maxWidth={300}
    />
  );
};
```

## maxWidth
表单项控件的最大宽度

```jsx
import React, { useState } from 'react';
import { InputNumber } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/basic';

export default () => {
  const form = useForm();
  const [maxWidth, setMaxWidth] = useState(320);
  
  return (
    <>
      <div style={{ marginBottom: '50px' }}>
        maxWidth：
        <InputNumber onChange={setMaxWidth} value={maxWidth} />
      </div>
      <FormRender
        form={form}
        schema={{
          ...schema,
          column: 1
        }}
        maxWidth={maxWidth}
        labelWidth={60}
      />
    </>
  );
};
```

## labelCol & fieldCol
- `labelCol`（标签占位格数），`fieldCol`（控件占位格数）

- 默认配置：
```js
// 当表单一行 一列 展示时
labelCol: 5
fieldCol: 9

// 当表单一行 两列 展示时
labelCol: 6
fieldCol: 14

// 当表单一行 两列以上 展示时
labelCol: 7
fieldCol: 16
```
实际业务中标签可能会比较长，默认配置无法满足布局，可以通过配置 `labelCol`、`fieldCol` 进行调整，两者加起来不超过 `24` 格数即可。

`labelCol`、`fieldCol` 也可以是复杂对象，具体配置规则参照 Antd Col 组件


```jsx
import React, { useState } from 'react';
import { InputNumber, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/basic';

export default () => {
  const form = useForm();
  const [labelCol, setLabelCol] = useState(6);
  const [fieldCol, setFieldcol] = useState(17);

  return (
    <>
      <Space style={{ marginBottom: '50px' }}>
        <span>
          labelCol：
          <InputNumber onChange={setLabelCol} value={labelCol} />
        </span>
        <span>
          fieldCol：
          <InputNumber onChange={setFieldcol} value={fieldCol} />
        </span>
      </Space>
      <FormRender
        form={form}
        schema={schema}
        labelCol={labelCol}
        fieldCol={fieldCol}
      />
    </>
  )
};
```

## footer
- `footer`：true，显示默认配置
```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/simple';

export default () => {
  const form = useForm();

  return (
    <FormRender
      schema={schema}
      form={form}
      maxWidth={360}
      footer={true}
    />
  );
}
```

- 按钮属性配置
```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/simple';

export default () => {
  const form = useForm();

  return (
    <FormRender
      schema={schema}
      form={form}
      maxWidth={360}
      footer={{
        submit: {
          text: '确定',
          // loading: true
          // hide: true
          // ...btnProps
        },
        reset: {
          text: '清空',
          // hide: true
          // ...btnProps
        }
      }}
    />
  );
}
```

- `footer` 自定义
```jsx
import React, { useState } from 'react';
import { Button, Space, Form, Radio } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema/simple';

export default () => {
  const form = useForm();

  return (
    <FormRender
      schema={schema}
      form={form}
      maxWidth={360}
      footer={() => (
        <Button>自定义</Button>
      )}
    />
  );
}
```