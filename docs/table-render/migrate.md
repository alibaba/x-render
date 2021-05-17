---
order: 3
title: 0.x 到 1.0
---

#### 对于之前使用 0.x 的同学，考虑到代码使用合理性，我们对于 TableRender 1.0 有如下更新

1. `table-render` 的导出有如下变化，`ProTable` 修改成 `Table`，`TableContainer` 修改成 `TableProvider`，这样表意更加明确有些。

2. `searchApi` 原本放到 `TableContainer`组件上面，现改成放到 `Search` 上，同时`searchApi` 改成 `api`，这样更加各司其职。

   ```js
   // 老版本使用
   import { ProTable, Search, TableContainer } from 'table-render';
   //...
   <TableContainer searchApi={searchApi}>
     <Search schema={searchSchema} />
     <ProTable />
   </TableContainer>;

   // 新版本
   import { Table, Search, TableProvider } from 'table-render';
   //...
   <TableProvider>
     <Search schema={schema} api={searchApi} />
     <Table headerTitle="最简表格" columns={columns} rowKey="id" />
   </TableProvider>;
   ```
