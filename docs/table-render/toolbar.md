---
order: 7
title: '工具栏'
group: 
  title: 最佳展示
---

# 工具栏

Table Render 内置工具栏，通过 `toolbarAction` 开启。默认四种功能，刷新表格、更改表格 `size`、全屏显示表格、表格列设置。

:::warning
使用表格列设置功能，必须为每个 `column` 指定 `key` 或 `dataIndex`。
:::

<code src="./demo/toolbar/basic.tsx"></code>

可以通过传入一个对象控制具体使用哪些工具，例如只显示列设置功能。默认为 `enabled: ['all']` 使用全部工具。

<code src="./demo/toolbar/selection-tool.tsx"></code>