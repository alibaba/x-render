---
order: 1
toc: false
---

# TableRender

### 1、如何禁止Table的初始化请求？

```js
import { withTable, Table } from 'table-render'

const App = () => {
  return (
    <>
      <Table searchOnMount={false} />
    </>
  )
}

export default withTable(App)
```

### 2、能否不渲染`<Search />`组件？

可以，`<Search hidden />` 添加 `hidden` 属性即可。

### 3、出现引入同名 Table 组件该如何解决?

```js
import { Table as AntTable } from 'antd';
```