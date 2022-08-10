# Changelog

### 1.3.7

- [+] 使用 `cloneDeep` 作为深拷贝函数

### 1.3.6

- [+] 修复 tr 文档 bug

### 1.3.5

- [!] 修复全屏模式下，antd `Drowndown` 组件不显示的 bug
- [+] Table 组件对外暴露 onTabChange 方法

### 1.3.4

- [+] TS 类型定义删除`ellipsis`

### 1.3.3

- [+] 修复 `date` 和 `dateTime` 未判空的 bug

### 1.3.1

- [+] 修复 tooltip 失效的问题

### 1.3.0

- [+] 样式优化

### 1.2.6

- [+] `Search`组件新增`searchWithError`属性

### 1.2.5

- [+] `valueType`为`money`时做判空处理

### 1.2.4

- [+] `Search`组件继承`FormRender`的类型声明。

### 1.2.2

- [+] `valueType`兼容`object`值类型。

### 1.2.1

- [+] `searchText`和`resetText`属性为非必填属性。

### 1.2.0

- [+] `Search` 组件新增`searchText`和`resetText`属性，支持自定义`搜索/重置`按钮文本。

### 1.1.9

- [!] `SearchBtn` 宽度使用 flex 进行自适应，不再需要 `calcWidth` 计算

### 1.1.8

- [!] 修改 calcWidth 内部逻辑

### 1.1.7

- [!] 添加一些兜底逻辑

### 1.1.6

- [!] 修复了 withTable 中 props 没有透传的 bug

### 1.1.3

- [+] 点击重置重新触发查询
- [+] Search 和 Table 新增 debug 属性，开启 debug 模式时时显示内部状态，方便开发调试
- [!] 修复隐藏 search 组件时首次渲染页面不触发查询的问题

### 1.1.2

- [+] 新增 withTable 方法，语法糖，写组件更舒服

### 1.1.1

- [!] 内部打包配置优化

### 1.1.0

- [!] 重构了 search，正式接入最新的 form-render 特性
- [+] useTable 拿到的 context 现添加了 `form`，用于获取搜索表单的实例以及所有方法（具体方法列表参加 form-render 文档）

### 1.0.5

- [+] 更新 npm 包的文档信息以及补全对应的 package 信息

### 0.8.16

- [+] `TableContainer`组件添加`onSearch`属性，用于点击查询按钮时，执行额外的操作

### 0.8.3

- [+] `refresh`和`doSearch`支持传入第二个参数，用于覆盖 Search 组件的的`formData`

### 0.8.0

- [+] `CardList`组件 `header`&`description`字段支持函数处理

### 0.7.5

- [+] `api`为`Array`类型时, params 透出 tab

### 0.7.0

- [+] 完善`CardList`组件的渲染逻辑

### 0.6.2

- [+] `valueType`属性添加`code`字段

### 0.6.0

- [+] 实现 `antd` 依赖库按需加载

### 0.5.0

- [+] 新增 `toolbarAction` 属性，用于控制 刷新、密度调整、全屏展示等功能 是否展示
- [+] 新增 `style`、`className` 属性，用于覆盖 Search、ProTable 组件的样式
- [+] 组件添加 typescript 声明文件，支持语法提示

### 0.4.0

- [+] toolBar 新增刷新、密度调整、全屏展示等功能

### 0.3.0

- [!] 修复 `toolbarRender` 渲染异常的 bug

### 0.2.0

- [+] 新增 `CardList` 组件

### 0.1.7

- [+] 新增 `searchBtnRender` 属性，实现表单按钮定制化

### 0.1.6

- [+] 新增 `changeTab` 方法，支持 tab 手动切换
- [!] `pagination` 支持设为 false 隐藏

### v0.1.5

- [!] 修复无法选择 `pageSize` 的 bug

### v0.1.4

- [!] 查询按钮的边距单位改用 px

### 0.1.3

- [+] 给 ProTable 传入`dataSource` 时在控制台进行提示

### 0.1.2

- [!] 中后台表格解决方案`table-render`开源
