---
order: 7
title: '工具栏'
mobile: false
group: 
  title: 最佳展示
---

# 工具栏

Table Render 内置工具栏，通过 `toolbarAction` 开启。默认四种功能，刷新表格、更改表格 `size`、全屏显示表格、表格列设置。

:::warning
使用表格列设置功能，必须为每个 `column` 指定 `key` 或 `dataIndex`。大多数场景下使用 `dataIndex` 就足够了，但前提是必须保证其是唯一的，如果不是，需要另外指定 `key` 的值。
:::

<code src="./demo/toolbar/basic.tsx"></code>

可以通过传入一个对象控制具体使用哪些工具，例如只显示列设置功能。

<code src="./demo/toolbar/selection-tool.tsx"></code>