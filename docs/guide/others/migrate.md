---
order: 5
group:
  title: 其他
nav:
  order: 1
  title: 教程
---

## 值得注意的更新点

0.8.6

由于 fusion design 的 css 无法按需加载（底层依赖问题），在 0.7.0 版本将其内部引入导致了使用方自定义样式后会被内部引入的 css 覆盖。所以再次决定把对 css 的引入放出

0.8.0

1. 对`antd`和`@alifd/next`的依赖修改为`peerDependencies`。意味着这两个包需要使用方提供。这么做避免了之前使用 form-render 时会打入两个 antd（或 fusion）的问题。目前的使用场景看来，90%以上的用户都已安装了 `antd` 或者 `@alifd/next`。所以这个升级对于 90% 的用户理应是无缝的。对于独立使用 form-render 而未安装任何组件的同学，需要 `npm i antd` 一下。详见文档的 [开始使用](https://x-render.gitee.io/form-render/guide/getting-started)
2. `showValidate`这个 props 一直存在（也基本没人用），但在这个版本，showValidate 的含义发生变化，默认为 true 保持与之前一样的展示。但当这个字段为 false 时，校验文字不会自动展示，只有在用户动过一个输入框后才会展示。（而不是之前的一直不展示）

0.7.0

向下是兼容的。变化为：

1. 使用 fusion 组件的同学，不用再引入 css 文件了
2. `schema`字段替代了`propsSchema`字段，因为 propsSchema 名字长不太好写，意义也不太明确。（两者目前都兼容，优先找 schema）
