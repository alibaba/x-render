# Change Log

### 0.8.7

- [!] 校验 pattern 的逻辑回滚到之前的模式。只有填写了值之后才会去校验 pattern 的正则表达式
- [!] 修复了 switch 和时间区间组件有默认值时不展示的问题 ([#169](https://github.com/alibaba/form-render/issues/169))
- [!] 修复了外部人为修改 schema 时数据不更新的的问题 ([#173](https://github.com/alibaba/form-render/issues/173))
- [!] 修复了选择组件在 js 文件里使用 `default: undefined` 无效的问题 ([#174](https://github.com/alibaba/form-render/issues/174))

### 0.8.6

- [!] 优化不再加载整个`@ant-design/icons`。暂时去掉 antd 侧使用 string 名称来描述列表新增组件的功能
- [!] 重写 antd 的 upload 组件，去掉一些内置配置，允许在`ui:options`里自由配置
- [!] 解决 fusion 的样式覆盖问题 ([#165](https://github.com/alibaba/form-render/issues/165))
- [!] 表单类型为 number 输入值为 0 时没有触发 pattern 校验 ([#150](https://github.com/alibaba/form-render/issues/150))
- [!] boolean 类设置必填时，选择 false 时必填校验不通过 ([#162](https://github.com/alibaba/form-render/issues/162))
- [!] 文档更新，新功能补充说明，tooltip 太模糊换了个图标，钉钉群二维码更新 ([#163](https://github.com/alibaba/form-render/issues/163))

### 0.8.5

- [!] fix 了一个 dependencies 的问题

### 0.8.4

下面几个版本的一个大主题会是性能的提升

- [+] 添加了一个实验性的 `path` 入参，填写 url 后 form-render 会自动抓取云端的 schema 进行渲染 （由于是实验性的，暂时不在文档中放出，等稳定后再给说明）
- [!] 节流了内部校验逻辑，避免每次表单操作都调用

### 0.8.3

- [!] 避免了有些情况表单内部输入造成的反复渲染。这个渲染机制是为了监听外部人为的改动数据，现在内部输入不再会触发
- [!] 避免了外部硬注入非 string 类的数据造成 input 的校验报 error
- [!] 避免了外部硬注入非 string 类的数据造成 input 的 maxLength 的展示错误
- [!] 修复了`ui:hidden`为函数表达式时，校验无法准确判断的问题
- [!] 修复了单选组件 `default: null` 时的报错

### 0.8.2

- [!] 优化新的校验机制的触发，防止庞大的 schema 反复触发
- [!] 优化列表的展示，删除按钮上移，现在的 list 占位更小

### 0.8.1

- [+] 单选现在允许设置 default: null，使得默认不选择任何一个选项 ([#146](https://github.com/alibaba/form-render/issues/146))
- [!] "ui:options" 里每个 key 如果是函数表达式，也能正常解析 ([#104](https://github.com/alibaba/form-render/issues/104))
- [!] uniqueItems 的判断，支持到复杂的 item 结构（详见 [“新功能”](https://x-render.gitee.io/form-render/guide/new-feature)）
- [!] 修复了一个不常见的新校验机制和历史写法（现在的函数表达式的前身）产生的 bug

### 0.8.0

- [Breaking] 对`antd`和`@alifd/next`的依赖修改为`peerDependencies`。意味着这两个包需要使用方提供。这么做避免了之前使用 form-render 时会打入两个 antd（或 fusion）的问题。目前的使用场景看来，90%以上的用户都已安装了 `antd` 或者 `@alifd/next`。所以这个升级对于 90% 的用户理应是无缝的。对于独立使用 form-render 而未安装任何组件的同学，需要 `npm i antd` 一下。详见文档的 [开始使用](https://x-render.gitee.io/form-render/guide/getting-started)
- [!] 解决了首次渲染时就会展示校验红字的问题，现在通过设定`showValidate`为 false 来关闭此行为，只有动过的 field 会提示校验，提交时通过将 showValidate 设为 true 来唤起全部校验信息的展示
- [!] 解决了 antd 组件 textArea 和 input 人为传入 undefined 和 null 为值时的报错 ([#138](https://github.com/alibaba/form-render/issues/138))
- [!] description 隐藏时采用 info 图标代替问号图标，符合业界规范 ([#133](https://github.com/alibaba/form-render/issues/133))

### 0.7.3

- [!] 文档链接修复
- [!] playground 彻底全屏展示，且修复 z-index 的问题

### 0.7.2

- [+] input/textarea 有 maxLength 属性时，展示字数长度的提示 ([#127](https://github.com/alibaba/form-render/issues/127))
- [+] `"ui:options"/buttons` 支持 组件库的 button props 扩展。在按钮较多场景时，用户希望有重点的弱化或者强化部分按钮 ([#122](https://github.com/alibaba/form-render/issues/122))
- [!] 校验失败的文字框的 box-shadow 展示正确淡红色（而不是以前的浅蓝）
- [!] 当多选 checkbox 折行时，保持展示对齐（antd/fusion）([#125](https://github.com/alibaba/form-render/issues/125))

### 0.7.0

- [!] 文档大幅度翻新，构建发布流切换到 dumi、father
- [!] 使用 schema 字段替换 propsSchema 字段，因为后者太长且意义不明（目前保持兼容）

### 0.6.2

- [!] fusion 侧再也不需用户手动引入 css。~~`import "@alifd/next/dist/next.min.css";`~~

### 0.6.1

- [!] ui:button 的 callback 的入参从（value, onChange, newItem）变为 （value, onChange, schema, newItem）
- [!] modal/drawer list 类数据，在配置按钮旁显示（xx 条数据）
- [!] modal 添加确定按钮，给使用者一个配置成功的感受
- [!] 修复了 fusion 下 modal 的 2 个展示瑕疵
- [!] 在“新功能”添加新的 modal 样例

### 0.6.0

- [!] 解决 css 覆盖问题
- [+] 复杂结构支持单独放置在弹层（modal/drawer）中，目前支持 type 为 object 和 list，配置方式是在 schema 中添加

  ```json
  {
    //...
    "ui:options": {
      "modal": true
    }
  }
  ```

- [+] 添加 color 组件对 opacity 的支持
- [+] 开放 antd 的 ConfigProvider 给用户配置

### 0.5.6

- [+] 添加 html 元素渲染的支持，使用 `default` 或 `formData` 属性传入 html 的字符串（可以是纯字符串，作为 div 渲染），见在线 demo（新功能）

  <img src="https://img.alicdn.com/tfs/TB18ug4XTM11u4jSZPxXXahcXXa-571-190.jpg" width="500px" />

- [!] object/array 的`disabled`属性现在回传递到所有的子元素（方便区块的表单置灰）
- [!] 修复从外部传入 `formData` 顺序与 schema 不同时，表单会按照 formData 的顺序渲染。现在能始终按照 schema 顺序渲染
- [!] 修复 onChange 在首次渲染时会触发两次的问题

### 0.5.5

- [!] 修复使用`ui:options`设置自定义 format 时实际 formData 未格式的问题（[87](https://github.com/alibaba/form-render/issues/87)）
- [!] 修复外部更新 formData 时校验信息未更新的问题（[82](https://github.com/alibaba/form-render/issues/82)）

### 0.5.4

- [+] 很多同学反馈列表展示需要一个序号。新版默认会添加序号，并可以使用`hideIndex`属性关闭恢复到旧的无序号展示（[84](https://github.com/alibaba/form-render/issues/84)）
- [!] 解决了异步传入数据时，表单刷新无效的 bug
- [!] 折叠的列表的展示更加优雅

  <img src="https://img.alicdn.com/tfs/TB1INDcCxD1gK0jSZFKXXcJrVXa-1466-866.png" width="500" />

- [!][breaking] 使用 antd 的 UI 时，列表 schema 的`ui:buttons`和`ui:itemButtons`属性里使用的 icon 的名称一律统一到 antd v4 的 icon 名称。详见[antd 文档-icon](https://ant.design/components/icon/)。旧用户如果有添加自定义按钮，那么图标的字段需要修改成新版名称，否则图标不会展示（并不影响使用）。这个决定出于两个原因：1. 新用户使用 icon 时不应该去翻找旧版 antd 的文档；2. antd 升级 4 后向前的兼容并不理想。
- [!] schema 的 type 写错时，确保页面仍能展示并给出报错

  <img src="https://img.alicdn.com/tfs/TB1anq2CpT7gK0jSZFpXXaTkpXa-1916-214.png" width="500" />

- [!] switch 组件 label 展示恢复到左侧，与 checkbox 类区分。

  <img src="https://img.alicdn.com/tfs/TB1xXndCxv1gK0jSZFFXXb0sXXa-518-158.png" width="200" />

### 0.5.3

- [+] 新增了 `useLogger` 的全局 props。`useLogger={true}` 时，每当用户填写表单时，在 console 里的展示类似如下：

  <img src="https://img.alicdn.com/tfs/TB11rt_AbY1gK0jSZTEXXXDQVXa-1336-468.jpg" width="500" />

  自下向上一层层展示用户触发的 formData 变化，便于开发者快速定位问题。

- [+] 列表新增 `ui:options` 字段 `itemButtons`, 用于添加每个 item 的操作按钮（默认是一个删除按钮）。具体使用方式参见文档 ui-schema。
- [!] 扩大了列表的收缩按钮的点击面积
- [!] 修复了 checkbox 在多列展示下文字和框没有对齐的样式 bug
- [!] 修复了手动传空值给时间组件不引起渲染展示变化的 bug

### 0.5.2

- [+] fusion 的 datePicker 组件添加 "ui:options": { "picker": "month"} (month/year/week) 配置来使用 MonthPicker / YearPicker / WeekPicker，确保和 Antd 一致（Antd 组件在之前就支持了）。([70](https://github.com/alibaba/form-render/issues/70))
- [!] 修复了列表的 default 值有时会覆盖 formData 的 bug ([71](https://github.com/alibaba/form-render/issues/71))
- [!] 修复了 antd 的默认语言的包引入为`antd/lib/locale/zh_CN`, 避免某些测试的报错。([68](https://github.com/alibaba/form-render/issues/68))

### 0.5.1

- [+] 新增 `ui:labelWidth` 属性，考虑到同个 FR 渲染的不同表单、或表单的不同区块的标签展示长度可能会不同，添加此个性化设置。所有字段都可以使用，效果向下继承，类似于 css 的就近覆盖规律。在线 demo 的“新功能”里有效果展示
- [!] 当`ui:widget`字段写错时，兜底使用默认的 ui 渲染而不是 crash
- [!] 优化了列表收缩时的样式，同时布尔值类能正确展示

### 0.5.0

- [+] 【breaking change】antd 升级到 v4，同时 React 的支持也同步到 16.12.0 以上。使用方请注意！（[#60](https://github.com/alibaba/form-render/issues/60)）
- [+] 添加了`onMount`的 props，用于定制首次加载逻辑（[#62](https://github.com/alibaba/form-render/issues/62)）
- [+] 文档“自定义组件”添加了 mapping 参数的说明，示例和说明如何将自定义组件设为默认选择。[自定义组件文档](https://alibaba.github.io/form-render/#/docs/widget)
- [!] 修复了 fusion 时间组件点击 clear 时出现“invalid date”的 bug（[#61](https://github.com/alibaba/form-render/issues/61)）

### 0.4.5

- [+] 添加了“复杂联动”的相关 Demo 例子
- [+] 现在 labelWidth 允许输入 “20%”，“2.5rem” 等
- [!] 修复了一个类型为对象的自定义组件初始值始终为空的问题

### 0.4.4

- [+] 发布了 schema 书写利器 `form-render snippets`（vscode 插件），在 vscode 商店中搜索“formrender”

  <img src="https://img.alicdn.com/tfs/TB1VIfBqWL7gK0jSZFBXXXZZpXa-1976-1464.png" width="400" />

- [+] 添加了 typescript 如何使用 form-render 的说明文档 ([#46](https://github.com/alibaba/form-render/issues/46)/[#44](https://github.com/alibaba/form-render/issues/44))
- [+] 为了属性的规范化，列表组件添加了`"ui:options"`/`"buttons"` 属性, buttons 的 callback 可调用参数 value 和 onChange，便于直接操作当前数组，详见文档
- [!] json 里书写函数表达式现在推荐使用 `"{{...}}"` 的方式，同时继续兼容 `"@..."`
- [!] 大幅更新了文档，ts 支持，form-render 后期规划，同时更新了初始 demo 的搭建代码
- [!] 只读模式下，UI 统一使用 disabled 的状态展示
- [!] 解决了有时`"ui:extraButtons"`不能正常展示的 bug
- [!] 颜色组件现在会校验 hex 值，并提示用户添加“#”（不再允许输入六位 hex 值但不输入#）（[#48](https://github.com/alibaba/form-render/issues/48)）
- [!] `propsSchema` 的文档补全了所有组件的常用字段
- [!] 在线 demo 添加了标签宽度控制（“左右排列”时有效）

  <img src="https://img.alicdn.com/tfs/TB1h1ZGrQT2gK0jSZFkXXcIQFXa-816-476.jpg" width="400" />

- [!] fusion 主题下标题、输入框的样式修复

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

```

```
