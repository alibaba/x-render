---
title: 新功能 Demo
order: 2
nav:
  order: 1
  title: 教程
toc: menu
---

# 新功能

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
