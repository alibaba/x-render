---
order: 0
mobile: false
group: 
  title: 其他
  order: 5
---
# V2 升级方案

本文档将帮助你从 1.x 升级到 2.x 版本

## 特性

全新的 table-render 2.0 主要具备以下特性：

- 🚀 **更好的搜索性能**：解决了单页列表数据过多，表格搜索严重卡顿的问题
- 🎨 **更简单的使用方式**：使用时不在需要导出  Search, Table, useTable, withTable 对象，统一导出默认对象 default(TableRender)即可
- 🚥 **国际化**：国际化多语言支持，内置中英文语言包，英文版 locale: 'en-US'
- 💎 **Antd V5**：兼容 antd V5 版本，无需配置

## 有哪些不兼容的变化

#### 导出实例变更
```diff
- import { Search, Table, useTable, withTable } from 'table-render';

- const Demo = () => {
-   return (
-     <div>
-      <Search {...searchProps} />
-      <Table {...tableProps}/>
-     </div>
-   );
- }
- export default withTable(Demo);


+ import TableRender form 'table-render';
+ const Demo = () => {
+   return (
+     <TableRender 
+      search={{
+        ...searchProps
+      }}
+      {...tableProps}
+     />
+   )
+ }
+ export default Demo;

```

#### 废弃 useTable，改用 ref 获取
tableState、setTable 移除，改用 getState()、setState()
```diff
- import { Search, Table, useTable, withTable } from 'table-render';
- const { refresh } = useTable();

+ import React, { useRef } from 'react';
+ const tableRef = useRef(); // tableRef.current = { refresh, changeTab, form, getState }
+ <TableRender
+   ref={tableRef}
+ />
```

#### api 移入到 tableProps 里面 变成 request
返回参数 rows 改成 data
```diff
const api = (params, sorter) => {
  return {
    data: [],
    total: 10
  }
};
-  <div>
-   <Search api={api} />
-   <Table {...tableProps}/>
-  </div>


+  <TableRender 
+    search={{
+        ...searchProps
+    }}
+    request={api}
+    {...tableProps}
+  />
```

#### headTitle 变更成 title