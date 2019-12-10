# Change Log

### 0.4.0

注意: 在 0.3 版本 form-render 给出了函数解析式的解法，用于解决组件间的联动，当时给了 value/rootValue/formData 三个参数，但考虑到 value 参数是不会被用到的（自己关联自己？），且放在第一参数位置，不合理。所以本次版本升级去掉了 value 参数。如果在 0.3 版本中已经使用函数的同学注意版本差异修改一下参数位置即可。新的用法见文档“如何联动”

- [!] 修改了函数表达式的入参，从 (value, rootValue, formData) 变为 (formData, rootValue)
- [+] JSON 格式下也可使用“@”开头的字符串方式支持函数表达式，具体见文档“如何联动”
- [+] 添加了 `readOnly` 的顶层 props，用于支持预览模式（纯文本，无法修改）
- [+] 完善了 `ui:readonly` 和很多组件的交互，现在所有组件都支持 readonly 模式
- [+] 添加了 readOnly 的文档说明和 live demo 开关
- [+] 列表组件支持默认值（default）
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
