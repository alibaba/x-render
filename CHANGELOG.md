# Change Log

### 0.4.4

- [+] 添加了 typescript 如何使用 form-render 的说明文档
- [+] 为了属性的规范化，列表组件添加了`"ui:options"`/`"buttons"` 属性, buttons 的 callback 可调用参数 value 和 onChange，便于直接操作当前数组，详见文档
- [!] json 里书写函数表达式现在推荐使用 `"{{...}}"` 的方式，同时继续兼容 `"@..."`
- [!] 大幅更新了文档，添加了 TypeScript 的支持方案，form-render 后期规划，同时更新了初始 demo 的搭建代码
- [!] 只读模式下，UI 统一使用 disabled 的状态展示
- [!] 解决了有时`"ui:extraButtons"`不能正常展示的 bug
- [!] 颜色组件现在会校验 hex 值，并提示用户添加“#”（不再允许输入六位 hex 值但不输入#）
- [!] `propsSchema` 的文档补全了所有组件的常用字段
- [!] 在线 demo 添加了标签宽度控制（“左右排列”时有效）
  <img src="https://img.alicdn.com/tfs/TB1h1ZGrQT2gK0jSZFkXXcIQFXa-816-476.jpg" width="400" />

### 0.4.3

- [!] 修复了一个文件名在 macOS 大小写不敏感造成的 bug

### 0.4.2

- [!] 优化 checkbox 等 boolean 类组件的摆位
- [!] 优化横向模式下校验的展示
- [!] 优化标签展示

### 0.4.1

- [!] fix 了内部 HOC 组件未引入 propTypes 的问题

### 0.4.0

注: 在 0.3 版本 form-render 给出了函数解析式的解法，用于解决组件间的联动，当时给了 value/rootValue/formData 三个参数，但考虑到 value 参数是不会被用到的（自己关联自己？），且放在第一参数位置，不合理。所以本次版本升级去掉了 value 参数。如果在 0.3 版本中已经使用函数的同学注意版本差异修改一下参数位置即可。新的用法见文档“如何联动”

- [!] 修改了函数表达式的入参，从 (value, rootValue, formData) 变为 (formData, rootValue)
- [+] 新增 labelWidth 参数，用于指明 label 的长度（px），默认 120，标签已遵照普通表单标准右对齐
- [+] JSON 格式下也可使用“@”开头的字符串方式支持函数表达式，具体见文档“如何联动”
- [+] 添加了 `readOnly` 的顶层 props，用于支持预览模式（纯文本，无法修改）
- [+] 完善了 `ui:readonly` 和很多组件的交互，现在所有组件都支持 readonly 模式
- [+] 添加了 readOnly 的文档说明和 live demo 开关
- [+] 列表组件支持默认值（default）
- [!] 列表组件如果设置了 maxItem, 当元素到达最大数量，添加按钮会自动消失。[#34](https://github.com/alibaba/form-render/issues/34)
- [!] 表单的 title 后面添加了“:”，规范表单的展示

### 0.3.2

- [!] 列表支持`ui:readonly`进入只读模式，不允许对列表进行增、删和拖拽操作
- [!] fix 了日期类组件传入数据变化后显示日期无变化的 bug

### 0.3.1

- [+] 重磅：schema 里大部分属性现在都支持函数表达式，方便表单组件间的关联（详见文档 UISchema、PropsSchema 部分）
- [!] 依赖组件库的抽离，避免了重复下载 antd/fusion
- [!] 修复了 ui:options/format 被 format 属性覆盖的问题[@ColinChen2](https://github.com/ColinChen2)

### 0.2.5

- [+] 当 schema 为 js 对象时，支持`ui:disabled`、`ui:readonly`、`ui:hidden`和`ui:options`的值为函数表达式。用法为 `"ui:disabled": (value, rootValue, formData) => value === "a"`
- [+] 列表组件添加了 `hideDelete` 属性（`ui:options`），详见文档的 UISchema 部分

### 0.2.4

- [!] 文档 Demo 展示效果优化
- [+] Fusion 体系支持按需加载

### 0.2.3

- [+] 新增 Proptypes to Json Schema 工具
- [!] 解决 Fusion 下时间选择系列问题

### 0.2.1

- [!] 官方 demo 提速，文档梳理到稍微好用

### 0.2.0

- [!] 优化打包构建脚本，减少包大小
- [+] 放出对应的 [Demo 效果](https://alibaba.github.io/form-render/docs/demo/index.html)
- [!] 使用时候不需要再引入 antd 或者 fusion 的 css

### 0.1.5

- [+] array type 支持使用 `uniqueItems` 字段校验列表中元素是否重复。`uniqueItems` 接受 boolean 和 string 类的值
- [!] fix 了 array 类样式展示空白过多的问题

### 0.1.4

- [!] 建议用户使用 default 赋予列表 item 值，不再强制显示一个元素

### 0.1.3

- [+] 列表会默认显示一个 item
- [+] hidden 表达式现在支持取顶层 `formData` 的值，例如`'ui:hidden':'formData.a.b.c == "xxx"'`
- [!] 修复了列表最后一个 item 无法删除

### 0.1.0

- [+] 对外开源的第一个版本
