---
group:
  title: 教程
  order: 1
order: 3
title: 使用案例
toc: content
---

## 代码演示

### 完整样例

<code src='./demo/card.jsx' />

## API

`TableContainer`与`table-render`的 api 相同，这里仅介绍`<CardList />`的 api

### Props

| 属性              | 描述                         | 类型 | 默认值   |
| ----------------- | ---------------------------- | ---- | -------- |
| onCardClick       | 卡片的点击事件               | -    | Function |
| cardRender        | 渲染 card 组件的 schema 协议 | -    | object   |
| paginationOptions | 设置分页属性                 | -    | object   |

### cardRender

| 属性    | 描述                                        | 类型 | 默认值             |
| ------- | ------------------------------------------- | ---- | ------------------ |
| type    | card 类型: `default`、 `image`              | -    | default            | string |
| cover   | 卡片封面                                    | -    | string             | Object |
| header  | 卡片头部渲染逻辑                            | -    | object             |
| content | 卡片内容                                    | -    | object             |
| footer  | 卡片底部，对应 antd card 的 actionList 属性 | -    | `Array<ReactNode>` |
