## 迁移文档

舍

1. 不再允许函数式的表达式了！

由于 schema 可以是 js 对象，所以之前支持 schema 里有函数表达式，并会当做表达式来处理，即渲染前计算出函数的 return 作为渲染值。但组件的 props 以及校验函数可能本身就是函数，这些函数是不希望被提前计算的，而只是作为 props 传入。FR 并没有很好的办法区分一个函数是需要被直接执行还是原样作为函数透传，所以这里的取舍是，是不允许函数 props 或者不允许函数表达式。由于表达式已经有字符串的书写方式，功能是完全等价的，所以为了允许函数作为 props，我们不再支持函数作为表达式

```js
showMore: {
  title: "显示更多",
  type: "boolean"
},
input1: {
  title: '输入框1',
  type: 'string',
  'ui:hidden': (formData) => !formData.showMore
}

// 请转换为：
showMore: {
  title: "显示更多",
  type: "boolean"
},
input1: {
  title: '输入框1',
  type: 'string',
  'ui:hidden': '{{!formData.showMore}}',
}
```

2. 不再计算初始值

3. 不再
