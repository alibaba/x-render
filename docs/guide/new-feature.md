---
title: 新功能 Demo
order: 2
nav:
  order: 1
  title: 教程
toc: menu
---

# 新功能

```jsx
import React from 'react';
import FR from '../demo/FR2/index.jsx';
import json from '../demo/new-feature/test.json';

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
