# Change Log

### 2.8.1

- [!] 支持 React18

### 2.8.0

- [+] 新增`locale`参数，支持国际化配置，默认为`cn`，可选值为`cn`或`en`

### 2.7.9

- [+] `globalSettings` 为空，隐藏 `设计器` 的表单配置模块
- [+] 添加`preview`参数，用于在外部控制`预览/编辑态`

### 2.7.0

- [+] 新增 `fieldRender` 及 `fieldWrapperRender`，支持自定义组件渲染
- [+] 新增校验错误项获取方法 `getErrorFields`
- [!] 配置项校验逻辑

### 2.6.2

- [+] 新增 `getId` 属性，支持自定义 id 生成逻辑
- [+] `canDelete` 属性支持异步逻辑
- [+] `settings` 配置合并顺序优化
- [!] 配置面板数据更新
- [!] 时间选择组件配置

### 2.6.1

- [!] 预览态表单数据同步

### 2.6.0

- [+] 组件面板支持自定义 Icon
- [+] 选中项添加类名 `selected-field-wrapper`
- [!] 更正部分类型定义

### 2.5.8

- [!] 修复全局配置默认值

### 2.5.7

- [!] 配置逻辑兼容新版 FormRender

### 2.5.6

- [!] 修复复制操作配置校验

### 2.5.5

- [+] 新增配置项校验支持

### 2.5.4

- [+] 新增标题展示模式配置
- [+] 新增组件隐藏及重复提示
- [!] 修复配置复制功能

### 2.5.3

- [!] 修复类型定义错误
- [!] 修复 fixedName 属性对拖拽新增组件不生效的问题

### 2.5.2

- [+] 新增导入及清除 schema 事件
- [+] 新增 canDrag 及 canDelete 属性
- [+] 增强操作按钮自定义能力
- [!] 修复 HTML 组件配置

### 2.5.1

- [!] 修复类型定义错误

### 2.5.0

- [+] 新增组件选择事件

### 2.4.5

- [+] 优化枚举编辑组件，新增 `transformer.toSetting` 及 `transformer.fromSetting`
- [!] 修复懒加载组件渲染异常的问题
- [!] 修复编辑模式 `className` 属性支持

### 2.4.4

- [!] 修复构建配置，解决样式丢失问题

### 2.4.3

- [!] 更正类型定义

### 2.4.2

- [!] 修复 forward ref
- [!] 修复 antd 样式污染
- [+] 更新类型定义

### 2.4.1

- [+] Sidebar 组件新增 `fixedName` 属性

### 2.4.0

- [+] 支持自定义编辑器布局

### 2.1.2

- [!] 数组类型兼容新版 FromRender

### 2.1.1

- [!] 兼容新版 FromRender
- [!] 修复编辑模式 `format` 属性支持
- [!] 修复自定义组件配置默认值

### 2.1.0

- [+] 新增 `hideId` 及 `controlButtons` 属性
- [!] 修复全局配置循环更新的问题
- [!] 修复 `labelWidth` 配置
- [!] 修复自定义全局配置

### 2.0.3

- [+] 新增 `mapping` 属性
- [+] 简化侧栏配置格式
- [!] 修复选择项切换异常的问题

### 2.0.2

- [+] 更新内部 schema
- [!] 修复 `setValue` 方法

### 2.0.1

- [!] 修复选择对象层级会清空画布的问题

### 2.0.0

- [+] 更新适配 FormRender 1.x

### 1.1.0

- [+] 元素添加“必填”的设置功能
- [+] 写了.d.ts 文件，以便支持 typescript 项目的正常引入
- [+] 暴露新 api `onChange` 和 `onSchemaChange` 用于 data 和 schema 的变化事件
- [!] 样式从 css -> less，做好封装避免样式污染
- [!] 修复了“是否带清除”按钮点击无效的问题
- [!] 文档排版等小幅调整

### 1.0.1

- [!] 最外层容器增加 relative 定位，避免右侧展开按钮消失
- [!] 判断嵌套属性正则不正确

### 1.0.0

- [!] 字段 propsSchema 和 schema 的兼容
- [+] settings & commonSettings & globalSettings 可以自定义
- [!] 内部优化 context 结构，优化 props 传输
- [+] widgets 入参（和 `form-render` 一样），提供自定义组件入口

### 0.5.7

- [!] 样式修复，desc 的气泡不被遮住

### 0.5.6

- [!] 打个补丁，将 ui 相关 props 放到 schema 中, 是对 FR 0.8.11 版本的兼容

### 0.5.5

- [!] 解决了一个内部方法替换后导致右侧栏数据失效的问题

### 0.5.3

- [+] `extraButtons` 这个数组的 item 的值可以是 true/false，用于去掉默认按钮，例如

```js
extraButtons: [false, false, false, true, { text: '测试' }];
```

只会展示默认展示的 4 个按钮中的最后一个（导出 schema），以及一个新按钮“测试”

- [!] `extraButtons` 现在支持配置各种 antd button 的 props
- [!] 修复了 propsSchema 和 schema 兼容在各个入口和出口处理上的不一致导致的 bug，现在统一收口
- [!] fix 了 id 展示的样式丢失的 bug

### 0.5.2

- [!] 解决了乱输入 schema 的时候会 crash 页面的问题

### 0.5.1

- [!] propsSchema 和 schema 字段兼容
- [!] 非常长的 description 在 tooltip 模式下正常展示
- [!] 解决样式入侵问题 ([#8](https://github.com/form-render/schema-generator/issues/8))
- [!] 解决了 switch 组件展示丑的问题
- [!] 官网大幅翻新，demo 可直接跳转到 form-render 的 playground 方便验证

### 0.5.0

- [+] 添加 `setValue` （注入 schema） 和 `copyValue`（拷贝到剪切板） 方法，可以通过 ref 调用
- [+] 新增 props `extraButtons` 用于添加更多定制按钮到顶栏

### 0.4.0

- [+] 添加 transformer 参数
- [!] 大幅升级文档，添加 formily 的支持 demo

### 0.3.4

- [!] 左栏统一到 rem，确保展示正确

### 0.3.3

- [!] 导入的 schema 可以不一定是 json 格式，也可以是 js object（就是 key 可以没有引号）

### 0.3.2

- [!] 提供 `getValue` 方法，可以通过 ref 调用，在外部获取 schema
- [!]  组件适配外层大小
- [!]  根据宽度做了一定的展示自适应
- [!] 修复不能识别的`ui:widget`时，会报错，现在渲染默认兜底组件

### 0.3.1

- [!] 文档修改、删除“保存”按钮

### 0.3.0

- [+] 添加 submit 入参，作为“保存”按钮的回调函数，入参是导出的 schema
- [!] 模板（templates）代替存档（saves）概念

### 0.2.2

- [!] fix dependencies bug

### 0.2.1

- [!] 更新文档配置
- [!] 安卓 moment 的 dependencies，而不隐式引入

### 0.2.0

- [+] 项目组件化，添加 saves 和 defaultValue 两个 props
- [+] 切换到 dumi，添加官方文档
