---
order: 2
title: 节点菜单配置
mobile: false
group: 
  title: 基础用法
  order: 1
---

# 节点菜单配置

节点菜单由右下角工具栏点出，展示画布面板的所有节点，可直接点击节点菜单面板中的节点，将节点添加进画布中。节点菜单支持分组展示，可以为不同类型的节点创建不同的分组，使界面更加清晰。

## 配置说明

### 1. 分组配置


节点菜单支持分组展示，每个分组包含以下配置：

```typescript
interface GroupConfig {
  title: string;      // 分组名称
  type: '_group';     // 分组类型，固定为 '_group'
  items: NodeConfig[]; // 分组下的节点配置列表
}
```
<div class="feature-image">
  <img src="https://img.alicdn.com/imgextra/i1/O1CN017qDeW21vUf9BGe0JI_!!6000000006176-2-tps-734-656.png" alt="节点菜单分组展示" />
</div>

### 2. 节点配置

每个节点可以配置以下属性：

```typescript
interface NodeConfig {
  title: string;           // 节点名称
  type: string;           // 节点类型
  description?: string;   // 节点描述
  icon?: {               // 节点图标配置
    type: string;        // 图标类型
    bgColor: string;     // 图标背景色
  };
  hideDesc?: boolean;    // 是否隐藏节点描述
  nodePanel?: {         // 自定义节点的面板配置
    width?: number;     // 面板宽度
  };
  settingSchema?: {     // 节点的业务配置信息
    type: string;
    className?: string;
    properties: Record<string, any>;
  };
}
```

## 完整示例
 <code src="./demo/nodeSetting/fullDemo/index.tsx"></code>

<!-- <code src="./demo/nodeSetting/index.tsx"></code> -->

## 注意事项

1. 节点类型（type）必须唯一，用于标识不同类型的节点
2. 图标配置支持自定义图标类型和背景色，或者使用图标的SVG格式
3. 节点配置面板（settingSchema）需要符合 FormRender 的协议规范
4. 可以通过 hideDesc 属性控制节点描述的显示/隐藏

<style>

.feature-image img {
  width: 250px;
  height: auto;
}
</style>
