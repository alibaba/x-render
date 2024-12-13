---
order: 3
title: '多实例画布'
mobile: false
group:
  title: 最佳展示
  order: 4
---

# 基础交互

`<FlowProvider/>` 组件是一个 Context Provider，使得在 `<XFlow/>` 组件之外访问流的内部状态成为可能。我们提供的 `useFlow()`、`useNodes()` 钩子依赖于这个组件才能工作。

<code src="./demo/flow-provider/index.tsx"></code>

## 注意

- 如果你正在使用路由器并且希望流程的状态在不同路由之间保持持久，那么将 `<FlowProvider/>` 组件放置在路由器外部是至关重要的。
- 如果在同一页面上有多个 `<XFlow/>`，则需要为每个 `<XFlow/>` 使用单独的 `<FlowProvider/>`
