---
order: 4
group:
  order: 4
  title: 示例
toc: content
---

## 如何正确书写 path

当你需要调用 setSchemaByPath 时，需要书写改动的表单元素对应的 path。如果元素结构很深，如何写正确的 path 呢？

例如

```js
const formData = { x: [{ y: { z: 1 } }] };
```

我们要修改 z=1 变成 z=2，熟悉 lodash 的同学，都知道需要, lodash 的 set 函数`_.set(object, path, value)`

```js
import _ from 'lodash';
_.set(formData, 'x[0].y.z', 2);
```

所以上述情况下 path 是`'x[0].y.z'`。在 form-render 里的涉及 list 的 schema，所有 item 的 schema 是一致的，所以没有修改特定 index 下的 schema 的概念，那么如果你希望 setSchemaByPath 修改所有 index 下的 schema，在 form-render 里正确的 path 是`'x[].y.z'`

<code src='./rightPath.jsx' />
