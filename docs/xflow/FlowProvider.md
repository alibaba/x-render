---
order: 4
title: 'FlowProvider'
mobile: false
group: 
  title: 高级用法
  order: 2
---

# FlowProvider

`<FlowProvider/>` 组件是一个 Context Provider，它使在 `<XFlow/>` 组件之外访问流的内部状态成为可能。我们提供的 `useFlow()`、`useNodes()` 和 `useEdges()` 钩子依赖于这个组件才能工作。


## 基础用法

```js
import { FlowProvider } from '@xrenders/xflow';

export default () => {
  return (
    <FlowProvider>
         <XFlow
          initialValues={{ nodes: initialNodes, edges: initialEdges }}
          settings={settings as any[]}
          nodeSelector={{
            showSearch: true,
          }}
        />
    </FlowProvider>
  );
};
```

## 完整示例
<code src="./demo/flow-provider/index.tsx"></code>

## useFlow

`useFlow()` 钩子返回 XFlow 实例，包含了一些实用的内部方法。

### 节点操作
- `setNodes`: 设置节点
- `addNodes`: 添加一个或多个节点
- `getNodes`: 获取节点数据
<!-- - `onNodesChange`: 节点变化时的回调 -->
- `deleteNode`: 删除单个节点
- `copyNode`: 复制单个节点
- `pasteNode`: 粘贴单个节点

### 边操作
- `setEdges`: 设置边
- `addEdges`: 添加一个或多个边
- `getEdges`: 获取边数据
<!-- - `onEdgesChange`: 边变化时的回调 -->
<!-- - `onConnect`: 连接边时的回调 -->

### 视图控制
- `zoomIn`: 放大画布
- `zoomOut`: 缩小画布
- `zoomTo(level)`: 缩放画布到指定比例
- `getZoom`: 获取缩放比例
- `setViewport`: 设置视口
- `getViewport`: 获取视口
- `fitView`: 适应画布
- `setCenter`: 设置画布中心
- `fitBounds`: 适应边界

### 坐标转换
- `screenToFlowPosition`: 将屏幕坐标转换为画布坐标
- `flowToScreenPosition`: 将画布坐标转换为屏幕坐标

### 布局
- `runAutoLayout`: 自动布局节点
<!-- - `layout`: 获取当前布局配置 -->

### 数据转换
- `toObject`: 将画布数据转换为对象返回

## useNodes

`useNodes()` 钩子用于实时监听节点状态变化。与 `useFlow` 的 `getNodes` 不同，`getNodes` 是瞬时值，`useNodes` 返回实时的nodes状态。
 
## useEdges

 `useFlow` 的 `getEdges` 是瞬时值。想要监听节点状态，请使用 `useEdges` 钩子来返回实时 edges 状态。


## 注意事项

- 如果你正在使用路由器并且希望流程的状态在不同路由之间保持持久，那么将 `<FlowProvider/>` 组件放置在路由器外部是至关重要的。
- 如果在同一页面上有多个 `<XFlow/>`，则需要为每个 `<XFlow/>` 使用单独的 `<FlowProvider/>`
