---
order: 6
title: '画布布局'
mobile: false
group: 
  title: 基础用法
  order: 1
---
# 布局

XFlow 提供了两种内置的布局方式：左右布局（LR）和上下布局（TB）。通过设置 `layout` 属性，可以自动调整节点的位置，使流程图更加美观。

## 布局类型

### 左右布局（LR）

左右布局将节点按照从左到右的顺序排列，适合展示线性流程或分支较少的流程。

```js
import React from 'react';
import XFlow from '@xrenders/xflow';

const Demo = () => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <XFlow
        settings={settings}
        initialValues={initialValues}
        layout="LR"  // 左右布局
      />
    </div>
  );
};
```

左右布局的特点:
1. 节点按照从左到右的顺序排列
2. 适合展示线性流程
3. 分支节点会垂直排列
4. 连线更加清晰直观

### 上下布局（TB）

上下布局将节点按照从上到下的顺序排列，适合展示层级关系或分支较多的流程。

```js
import React from 'react';
import XFlow from '@xrenders/xflow';

const Demo = () => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <XFlow
        settings={settings}
        initialValues={initialValues}
        layout="TB"  // 上下布局
      />
    </div>
  );
};
```

上下布局的特点：
1. 节点按照从上到下的顺序排列
2. 适合展示层级关系
3. 分支节点会水平排列
4. 可以更好地利用垂直空间

## 布局示例

### LR（左右布局）

<code src="./demo/layout/LR/index.tsx"></code>

这个示例展示了一个智能客服流程，包含以下特点：
1. 使用左右布局，清晰展示流程走向
2. 包含多个并行处理分支
3. 展示了不同类型节点的组合使用
4. 节点间距合理，连线清晰

### TB（上下布局）

<code src="./demo/layout/TB/index.tsx"></code>

这个示例展示了一个数据分析流程，包含以下特点：
1. 使用上下布局，突出层级关系
2. 包含数据转换和处理节点
3. 展示了复杂的分支和合并
4. 充分利用垂直空间
