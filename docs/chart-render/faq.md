---
order: 4
title: 常见问题
---

# 常见问题

### 1、能否不渲染`<Search />`组件？

1. `<Search hidden />`
2. `<Search style={{ display: 'none' }} />`
1. `<Search className="hide" />` + `.hide { display: none }`

### 2、出现引入同名 Line 组件该如何解决?

```js
import { Line as AntLine } from '@ant-design/charts';
```
