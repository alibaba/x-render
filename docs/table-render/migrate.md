---
order: 3
title: 0.x 到 1.0
---

#### 对于之前使用 0.x 的同学，考虑到代码使用合理性，我们对于 TableRender 1.0 有如下更新

1. `table-render` 的导出有如下变化，`ProTable` 修改成 `Table`。

2. `Search`和 `Table`不再需要被`TableContainer`组件包裹，所有表格代码通过 `withTable` 包一下即可，这样书写更加简洁。

3. `searchApi` 原本放到 `TableContainer`组件上面，现改成放到 `Search` 上，同时`searchApi` 改成 `api`，这样更加各司其职。

   ```js

    // 老版本使用
   import { ProTable, Search, TableContainer, useTable } from 'table-render';
   //...
   const TableDemo=(
    <TableContainer searchApi={searchApi}>
      <TableDemo />
    </TableContainer>
   );
   const TableBody = (
     const { refresh } = useTable();
     <>
        <Search schema={searchSchema} />
        <ProTable />
     </>
   );
   export default TableDemo;

   // 新版本
   import { Table, Search, withTable, useTable } from 'table-render';
   //...
   const TableDemo = (
     const { refresh } = useTable()
     <>
       <Search schema={schema} api={searchApi} />
       <Table headerTitle="最简表格" columns={columns} rowKey="id" />
     </>
   );
   export default withTable(TableDemo);

   ```
