---
order: 4
title: '<FlowProvider/>'
mobile: false
group: 
  title: 高级用法
  order: 1
---

## 基础交互

`<FlowProvider/>` 组件是一个 Context Provider，使得在 `<XFlow/>` 组件之外访问流的内部状态成为可能。我们提供的 `useFlow()`、`useNodes()` 和 `useEdges()` 钩子依赖于这个组件才能工作。

<code src="./demo/flow-provider/index.tsx"></code>

## useFlow

`useFlow()` 钩子返回 XFlow 实例，包含了一些实用的内部方法。

- setNodes：设置节点
- addNodes：添加一个或多个节点
- setEdges：设置边
- addEdges：添加一个或多个边
- getNodes：获取节点数据
- getEdges：获取边数据
- toObject：将画布数据转换为对象返回
- zoomIn：放大画布
- zoomOut：缩小画布
- zoomTo：缩放画布
- getZoom：获取缩放比例
- setViewport：设置视口
- getViewport：获取视口
- fitView：适应画布
- setCenter：设置画布中心
- fitBounds：适应边界
- screenToFlowPosition：将屏幕坐标转换为画布坐标
- flowToScreenPosition：将画布坐标转换为屏幕坐标
- runAutoLayout：自动布局节点
- copyNode：复制单个节点
- pasteNode：粘贴单个节点
- deleteNode：删除单个节点

## useNodes

`useFlow` 的 `getNodes` 是瞬时值。想要监听节点状态，请使用 `useNodes` 钩子来返回实时 nodes 状态。

## useEdges

`useFlow` 的 `getEdges` 是瞬时值。想要监听节点状态，请使用 `useEdges` 钩子来返回实时 edges 状态。

## 注意

- 如果你正在使用路由器并且希望流程的状态在不同路由之间保持持久，那么将 `<FlowProvider/>` 组件放置在路由器外部是至关重要的。
- 如果在同一页面上有多个 `<XFlow/>`，则需要为每个 `<XFlow/>` 使用单独的 `<FlowProvider/>`
