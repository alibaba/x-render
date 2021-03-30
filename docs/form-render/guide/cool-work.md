---
title: 高级用法 Demo
order: 3
group:
  order: 1
  title: 教程
---

# 一些酷酷的用法

发现很多实用方法和解法，处于“不为人知”的状态，所以开辟这个栏目，专门放一些我觉得有意思的用法。欢迎各位 PR 酷酷的用法哦

## 函数表达式

所有组件库的属性都可以通过 `ui:options` 支持！

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/expression.json';

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
