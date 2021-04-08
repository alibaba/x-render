---
order: 6
toc: content
---

## FAQ

1. 我在 schema 里写的内容是按什么规则传递给自定义组件的？

- 基础属性按固定规则传递，一般只有和渲染组件相关的属性会传入，当然整个 schema 也会作为一个字段传入。
- props 会直接展开透传，便于直接平滑使用 antd 的组件，所以受到的 props 的结构会类似于： props = {...schema, ...schema.props}

更多待补充
