---
order: 1
title: 介绍
nav:
  order: 1
  title: 指南
toc: menu
---

## 介绍

`table-render`是[form-render](https://x-render.gitee.io/form-render/)的周边生态，它的 api 视觉上如图所示：

<img src="https://img.alicdn.com/tfs/TB101OZm9slXu8jSZFuXXXg7FXa-1608-1156.png" width="600px" />

## 设计理念

`table-render` 利用了 React Context，以最简单的 api 完成了复杂的 Search table 的渲染，全程只要配置搜索的请求 & 表头的字段，一个可用的搜索表单就生成了。

此表格解决方案存在以下优势：

- **好扩展**：组件模式符合前端开发习惯，值得指出 search table 的代码最多占整个页面的 40%，更多的代码在于各个控件、弹窗、跳转和配置的实现。组件模式确保了剩下 60%代码能自然嵌入，而任何内部方法都可以在 context 里取到，这对多文件开发很友好，且逻辑不会因为框架因素而变形
- **学习成本低**：支持 form-render & antd table 的所有 api，支持 proTable 大多数好用的 api，便于一些迁移同学的快速上手，学习成本极低

## 版本依赖

```js
react >=16.8.x
antd >= 4.x
```
