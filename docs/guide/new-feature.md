---
title: 新功能 Demo
order: 2
nav:
  order: 1
  title: 教程
toc: menu
---

# 新功能

## 0.9.1

新增了 `{ format: "email"/"url"/"image" }`

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/format.json';

export default () => <FR schema={json} />;
```

## 0.8.11

属性`ui:column`、`ui:displayType`、`ui:showDescIcon` 支持属性局部控制。原本只能通过 props 全局控制

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/column.json';

export default () => <FR schema={json} />;
```

## 0.8.9

长列表会自动分页, 可通过 `ui:options/pageSize` 来控制每页展示数量

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/pagination.json';

export default () => <FR schema={json} />;
```

## 0.8.1

现在所有组件库的属性都可以通过 `ui:options` 支持

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/expression.json';

export default () => <FR schema={json} />;
```

设 default 为 null，即可让单选组件不默认选择第一项

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/noDefault.json';

export default () => <FR schema={json} />;
```

uniqueItems 现在支持复杂的判断

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/uniqueItems.json';

export default () => <FR schema={json} />;
```

## 0.7.2

1. `maxLength` 展示字数提示
2. `"ui:options"/ buttons` 支持所有 antd/fusion 的 button 的 props

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/maxLength.json';

export default () => <FR schema={json} />;
```

## 弹层展示

一般用于复杂结构, 支持 `modal` 和 `drawer`

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/modal.json';

export default () => <FR schema={json} />;
```

## html

纯 text 展示可以使用这个组件

```jsx
import React from 'react';
import FR from '../demo/FR';
import json from '../demo/new-feature/html.json';

export default () => <FR schema={json} />;
```
