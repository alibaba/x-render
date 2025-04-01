---
order: 1
title: '自定义节点展示'
mobile: false
group: 
  title: 高级用法
  order: 2
---

# 自定义节点展示

当默认的节点内容展示不满足要求时，可以通过 `nodeWidget` 进行自定义渲染。

1. 定义自定义组件
2. 在 XFlow 组件中通过 `widgets` 属性注册组件
3. 在节点配置中通过 `nodeWidget` 指定使用的组件
   
```js
// 1.自定义节点
const LLMNodeWidget = ({ data }) => {
  const { model, temperature, maxTokens, systemPrompt } = data; // data为配置面板数据
  return (
    <Card
      size="small"
      bodyStyle={{ padding: '12px' }}
    >
      //  自定义渲染节点内容
    </Card>
  );
};
```
注册自定义组件
```js
<XFlow
  initialValues={{ nodes, edges }}
  settings={settings}
  widgets={{
    LLMNodeWidget  // 2.注册自定义组件
  }}
/>

```
在settings中使用自定义组件
```js
{
    type: 'LLM',
    title: 'LLM 处理',
    icon: {
      type: 'icon-model',
      bgColor: '#6172F3',
    },
    nodeWidget: 'LLMNodeWidget' // 3.使用自定义组件
}
```
<code src="./demo/nodeWidget"></code>
