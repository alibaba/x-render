---
order: 3
group:
  order: 4
  title: 示例
toc: content
---

## 双向绑定

单项绑定使用 watch 可以完成，但如下例，有时需要双向绑定。
和 React 实现双向绑定的方式一样，绑定的两个元素共用同一个 state 和 setState。这意味着绑定的其中一个元素必须使用自定义组件，并且不使用常规的 value/onChange, 而是声明 dependencies 后，使用 addons 里的 dependValues/setValueByPath 来替代

<code src='./doubleBind.jsx' />
