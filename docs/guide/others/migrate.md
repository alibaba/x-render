---
order: 5
group:
  title: 其他
nav:
  order: 1
  title: 教程
---

## 迁移

0.7.0

向下是兼容的。变化为：

1. 使用 fusion 组件的同学，不用再引入 css 文件了
2. `schema`字段替代了`propsSchema`字段，因为 propsSchema 名字长不太好写，意义也不太明确。（两者目前都兼容，优先找 schema）
