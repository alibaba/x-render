---
order: 1
title: test
nav:
  order: 1
  title: 教程
---

```jsx
import React from 'react';
import FR from '../demo/FR2/index.jsx';
import json from '../demo/new-feature/test.json';

export default () => <FR schema={json} />;
```

```jsx
import React from 'react';
import A from '@form-render/tester';

export default () => <A />;
```

```jsx
import React, { useState } from 'react';
import FR from 'form-render/lib/antd';
import A from '@form-render/tester';

export default () => {
  const [data, setData] = useState();

  const submit = () => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <FR
        formData={data}
        onChange={setData}
        widgets={{ test: A }}
        schema={{
          type: 'object',
          'ui:displayType': 'row',
          properties: {
            string: {
              title: '字符串',
              type: 'string',
              'ui:widget': 'test',
            },
            select: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['选项1', '选项2', '选项3'],
            },
          },
        }}
      />
      <button onClick={submit}>haha</button>
    </div>
  );
};
```
