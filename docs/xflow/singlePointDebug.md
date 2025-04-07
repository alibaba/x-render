---
order: 8
title: '单点调试'
mobile: false
group: 
  title: 高级用法
  order: 2
---

# 单点调试

XFlow 支持对单个节点进行调试。通过配置 `showTestingBtn` 展示单调调试按钮，调试按钮默认显示在节点的右上角，点击按钮可以实现节点的单点调试功能。

## 基础用法

### 1. 开启调试按钮

在节点配置中设置 `showTestingBtn: true` 即可显示默认的调试按钮：

```js
 const settings = [
    {
      title: 'LLM',
      type: 'LLM',
      description: '调用大语言模型回答问题或者对自然语言进行处理',
      showTestingBtn: true,
      icon: {
        type: 'icon-model',
        bgColor: '#6172F3',
      },
      settingSchema: {
        type: 'object',
        properties: {
          input: {
            title: '变量一',
            type: 'string',
            widget: 'input',
          },
        },
      },
    },
  ];
```

### 2. 处理调试事件

通过 `onTesting` 回调函数处理节点的调试逻辑：

```js
<XFlow
  onTesting={(node, nodes) => {
    // node: 当前调试的节点
    // nodes: 所有节点数据
    console.log("单点调试", node, nodes);
  }}
/>
```
## 示例

下面的示例展示了如何使用单点调试功能：

<code src="./demo/log/runNode/index.tsx"></code>