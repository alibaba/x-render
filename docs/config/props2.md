---
order: 2
nav:
  order: 2
  title: 配置项
toc: menu
---

# 不常用 Props

## mapping

- type: `object`

schema 到组件的映射规则。比如 `{ type: 'string' }` 默认使用 `<Input />` 组件, 是因为在 `mapping` 里有一条：

```js
{
  ...
  string: 'input',
}
```

完整的 mapping，以及对 mapping 使用方法的理解，建议读一下 [mapping 的使用：如何让自定义组件作为默认？](/docs/guide/advanced/widget.md)

## column

- type: `number`
- default: 1

算不常用的 props 里最常用的，例如你想整体表单三等分，就用 `column={3}`。一般还是建议在 schema 级别使用`ui:width`属性，更自由。

## useLogger

- type: `boolean`
- default: `false`

`useLogger={true}` 时，每当用户填写表单时，在 console 里的展示类似如下：

<img src="https://img.alicdn.com/tfs/TB11rt_AbY1gK0jSZTEXXXDQVXa-1336-468.jpg" width="600" />

自下向上一层层展示用户触发的 formData 变化，便于开发者快速定位问题。

## showValidate

- type: `boolean`
- default: `true`

是否展示校验信息，没有特别需求一般都展示

## onMount

- type: `function`

表单首次加载会调用一次 `onChange`。如果对首次加载有特别逻辑，可以使用 `onMount` 这个 props，用法见[onChange](/config/props#onchange)

## configProvider

- type: `object`

如果使用 antd 组件，`configProvider`用于调整国际化等全局参数，具体配置见 [antd 文档](https://ant.design/components/config-provider/)
