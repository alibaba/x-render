## 如何使用

### 安装

```bash
npm i @xrenders/schema-builder
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import SchemaBuilder from '@xrenders/schema-builder';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

const Demo = () => {
  return (
    <div style={{ height: '80vh' }}>
      <SchemaBuilder defaultValue={defaultValue} />
    </div>
  );
};

export default Demo;
```

