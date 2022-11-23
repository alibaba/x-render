# Changelog

## 1.14.1

- [+] 修复样式问题

## 1.14.0

- [+] 为 `object` 类型添加 `flex` 主题
- [+] 优化 `widgets` 下的组件路径
- [+] 增加 `void` 支持
- [!] 修复 `object` 宽度设置

## 1.13.21

- [!] 修复 `tableList` 和 `drawerList` 表头无法正常显示的问题

## 1.13.19

- [+] 删除 `formData` 中的 `index`

## 1.13.18

- [!] 修复 `cardList` 组件无法新增的 bug

## 1.13.17

- [+] `simpleList` 和 `cardList` 支持自定义新增按钮
- [!] `removeHiddenData` 默认设置为 `true`
- [!] 修改 `onValuesChange` 入参形式
- [+] 列表组件支持自定义增加与删除

## 1.13.15

- [+] 新增获取隐藏表单值的方法：`form.getHiddenValues()`
- [+] 补充`display: 'block'`类型声明

## 1.13.12

- [+] `description`支持 html 字符

## 1.13.10

- [!] 修复`list`类组件的占位符显示异常的问题

## 1.13.9

- [+] 调整表单占位符样式

## 1.13.8

- [+] `cardList` schema 支持透传 `delConfirmProps`

## 1.13.5

- [+] `tabList` 支持拖拽

## 1.13.3

- [+] `collapse`模式样式优化

## 1.13.1

- [+] 表单校验失败时，样式与 antd 保持一致

## 1.13.0

- [+] `时间范围` 组件接收 `format`
- [+] 更新发包文件内容

## 1.12.1

- [+] `theme:'collapse'` 新增 `幽灵模式` 和 `无边框模式`

## 1.12.0

- [+] `schema` 新增`theme` 字段，支持切换嵌套表单的[主题样式](https://xrender.fun/form-render/advanced/display#%E4%B8%BB%E9%A2%98%E8%AE%BE%E7%BD%AE)。

## 1.11.3

- [!] `schema` 中存在`type:array` 时，继承 hidden 属性时做兼容处理。

## 1.10.0

- [+] `schema` 新增 `order` 属性，用于排序，值越小越靠前
- [+] `props` 新增 `colon` 属性，表示是否显示 label 后面的冒号
- [+] `props` 新增 `labelAlign` 属性，用于定义 label 标签的文本对齐方式

## 1.9.13

- [!] 修复 `数组/对象` 隐藏时，子元素依然会触发校验的 bug。

## 1.9.12

- [!] 修复 `tooltip` 显示不全问题。
- [!] 修复 `drawerList` 第二页排序操作无效问题。
- [+] 完善 `JSON Schema` 类型声明。

## 1.9.11

- [+] format:"upload" 支持传入 `path` 字段，用于自定义接口返回的文件链接字段。

## 1.9.10

- [+] format:"textarea" 支持传入 rows

## 1.9.9

- [+] 更新`schema`类型声明

## 1.9.8

- [+] 更新`virtualList`样式

## 1.9.7

- [+] 对嵌套的`对象类型`组件扩展`schema`，新增`collapsed`属性用于控制面板折叠。

## 1.9.6

- [+] 更新`schema`类型声明

## 1.9.5

- [+] 扩展`watch`的能力

## 1.9.4

- [!] 修复 `onFinish` 触发时时必填校验未生效的问题

## 1.9.3

- [+] `type:array`支持给子项设置默认值
- [!] 兼容部分内置组件的 `value` 类型为`object`时，导致页面报错的场景

## 1.9.2

- [!] 修复`select`有默认值情况下使用`form.resetFields`视图没有更新 bug

## 1.9.1

- [!] 修复`FormRender`的`tableList`组件

## 1.9.0

- [!] 修复`setSchema`失效 bug https://github.com/alibaba/x-render/issues/647
- [!] 修复`表单联动`失效 bug https://github.com/alibaba/x-render/issues/651
- [!] `widget:select` 对`allowClear`属性进行兼容 https://github.com/alibaba/x-render/issues/655

## 1.8.7

- [+] `useForm.js`内部逻辑修改

## 1.8.6

- [!] 修复 `form.setSchemaByPath` 不触发更新的 bug
- [!] 修复 `fr` 只提示初始错误的 bug

## 1.8.5

- [+] 为 `resetFields` 添加了自定义的参数，可以在重置时具有更高的灵活性
- [!] 修复 `widget` 为 `time` 时，配置 `format:HH` 未生效的 bug

## 1.8.3

- [!] 修复了单选组件的一个 bug

## 1.8.2

- [!] 修复了底层重构带来的打包问题

## 1.8.1(此版本勿使用，有问题)

- [!] 修复了在 rules 中定制 required 的 message 时不生效的问题
- [!] 底层做了部分重构，为了之后提取出 form-render-core 做准备，对用户无使用感知

## 1.8.0

- [!] 重构了校验，确保了在列表场景下涉及 rootValue 相关的表达式能够正常使用，解决了之前反复复现的 hidden 元素还是被校验、rootValue 无效等问题
- [+] 添加线上排查问题后面，在链接上注入参数 \_debug_form=pre 后可以快速开启 debug 状态，找到问题
- [+] 列表添加了 tabs 展示的 widget: 'tabList' 选项
- [!] 修改了 cardList 的操作按钮的展示，更加便于用户第一眼的识别和理解
- [!] 添加 4 个例子，示例常用的复杂场景“列表联动”、“双向绑定”、“正确的路径书写”等等

## 1.7.2 - 1.7.3

- [!] 修复了 error 为 undefined 时的一个数据错误

## 1.7.1

- [!] 自定义组件的 props 对旧版本的 setValue 等进行兼容

## 1.7.0

- [+] submit 现在内置了.then 方法，返回 formData 和 errors (并不建议使用，可以的情况还是使用 onFinish 的模式)
- [+] 添加 descType 字段，用于在 title 分行展示时也允许描述文案收起到“？” icon 内。
- [!] 修复 logOnMount 等的 ts 报错

## 1.6.13

- [!] 去除了 rootValue 初始值为 undefined 时 console 里会有报错（虽然不影响功能，但有碍观瞻）
- [!] 顶层支持了 className、style 属性
- [!] 修改了列表类组件的命名，从 list0/list1/list2/list3/list4 变为 cardList/simpleList/tableList/drawerList/virtualList，对旧的命名还是支持的，改动的目的一来更为语义化，二来方便之后的扩展，list5，list6 这样不是个可扩展的模式

## 1.6.12

- [!] 修复了 rootValue 在 list 下无法使用的问题
- [!] 修复了一处 typo

## 1.6.11

- [!] 修复了 schema 的 props 为函数时无效的问题 #543
- [!] 修复了 formData 中的数组的 item 值为 false 时提交时会被误删的问题 #541
- [!] 修复了使用百分比 width 展示时溢出的一个 bug

## 1.6.10

- [+] 自定义组件的 addons props 里可以使用几乎所有 form 方法，个别不一致的方法名称也与 form 方法统一，避免混乱
- [+] 自定义组件的 addons props 里提供 hideSelf 方法，用于简单控制自身的显示隐藏

## 1.6.9

- [!] 修复了动态 hidden 和 bind 共用时，`removeHiddenData` props 有时会无效的问题
- [!] 修复了 rootValue 有时无效的问题

## 1.6.8

- [!] 修复了外部 setErrorFields 被内部校验覆盖的问题

## 1.6.7

- [!] 添加了 mapping 用法的文档，即如何覆盖默认组件的行为
- [!] logOnMount/logOnSubmit 的传参会 stringify 化，便于作为发送给服务端的埋点数据

## 1.6.6

- [+] 添加全局 props `globalProps`, 解决与 form-render 无关的全局数据的注入问题。通过`globalProps`注入的数据在任何组件（以及自定义组件）中可以被取到和使用。这也解决了自定义组件在不同的页面也许需要接受不同的 props 的问题

## 1.6.5

- [!] 修复了外部传入的 schema 中对象类型的内部变化，但对象本身不变化时，表单不重新渲染的问题

## 1.6.4

- [!] 修复了 setSchemaByPath 和 setSchema 无效的 bug

## 1.6.3(setSchema 出现有时了无效的问题)

这个版本在底层实现机制上做了大量的优化和一定量的重构，主要包括

1. 在 FR 内部，表达式的计算散落在了多处，现在统一在入口计算唯一一次
2. 在 FR 内部，schema 会转化成一个更便于处理的扁平结构 flatten，但 form 方法在使用 schema 和 flatten 上并没有统一，导致数据不一致。现在在内部统一使用 flatten 结构，确保数据一致

- [!] 修复了 resetFields 没有同时清空校验信息的问题
- [!] 修复了动态隐藏父节点后，子节点元素任然被校验的问题 (#484)
- [!] 修复了某些情况下，修复了校验报错问题后，提交时校验信息任然存在的问题
- [!] 修复了 removeHiddenData = true 的情况下，有时隐藏的信息还会被提交的 bug
- [!] 修复了 html 组件以及只读模式下展示样式的问题
- [!] 动态通过 form 方法修改 rules 时，没有效果的问题

## 1.6.2

1. 一般来说用 watch 字段和动态表达式，能够解决大部分联动问题，但当联动关系复杂时并不适合使用表达式，当关联性存在列表中时，使用 watch 也不能很好实现
2. 书写自定义组件时，大伙儿经常想在自定义组件中获取全局的某个值，并根据那个值的变动来决定自定义组件的渲染。但是 FR 1.0 性能优化上已经避免了不必要的重复渲染，如果没有显式的指明，自定义组件是不会因为其他表单项的变动而重新渲染的，导致自定义组件内拿到的 formData 并不是最新的

为了解决上述两个问题，我们自然地引入了 dependencies 字段

- [+] 新增 dependencies 字段，当一个表单项的展示和数据依赖于另一个表单项的值时，可使用 dependencies 显式地注明。具体参见文档

## 1.6.1

- [!] 修复了 playground 内自定义组件语法没有更新到 1.x 的问题
- [!] 升级了 xlsx 依赖包的版本，解决安全报警问题
- [!] 修复了在 onMount 中使用 form.getValues 有时无效的问题
- [!] 修复了 bind 的字段为数组，且路径为原字段的子集时（例如 a: {bind: ['a.b', 'a.c']}）bind 会失效的问题

## 1.6.0

新增“度量”这个话题。FormRender 作为表单提效方案，对于用户填写一份表单现在需要多少时间，到底提效了多少这些问题并没有提供数据上的证明。无法被度量的事，改进也无从谈起。所以围绕这个主题，我们提供了新的 api 以及文档说明

- [+] 新增 logOnMount / logOnSubmit 两个 api，作为 useForm 的入参，用于在表单加载以及提交的时机给用户提供相关的度量信息

- [+] 新增[“度量”文档](https://xrender.fun/form-render/measure)

功能优化

- [+] url 组件现在支持自定义 btn 文案，自定义 prefix、suffix

文档翻新

- [!] 文档/git issue 模板等翻新
- [!] 翻新了 bug/feature report 的模板
- [!] 考虑到表单编辑器的重要性，在文档中的位置变动到
- [!] 修复了联动/自定义组件等多处文档 demo 的 bug
- [!] 为旧版 form-render 的用户提供了 schema 装换器，一键转换成新版 schema

### 1.5.8

- [!] 修复了上个版本引入的校验信息无法展示的问题

### 1.5.7 (showValidate 造成校验没有展示，请勿使用本版本)

- [!] 修复了 connectForm 上的 ref 没有透传的问题
- [!] 提供了“折中升级方案”，适用于旧版 FormRender 项目快速大面积升级，虽然不能享受 100%的新功能

### 1.5.6

- [!] 修复了所有涉及 range 组件的校验问题（从源头上把几个奇异 case 处理了）

### 1.5.5

- [+] 将一系列有用的 form 方法也挂在了自定义组件的 addons props 上，能够取到使用
- [+] 提供了能够同时修改多个 key 值的 schema 的 setSchema 方法

### 1.5.4

- [!] 修复了 upload 等多元素组件的 xxprops 没有透传的问题
- [!] 修复了涉及到数组 bind 的场景下，外部更新表单数据后，range 元素会通过必填校验的问题

### 1.5.3

- [+] Form 的 props 添加 `removeHiddenData` 用于选择提交的时候是否去掉已经被隐藏的元素的数据，默认 false 不隐藏

### 1.5.2

- [+] 展示是 table 的 list 类组件（list2，list3，list4）的 props 和 itemProps 分别透传 table 的 props 和 columns 的 props 到 antd，便于用户定制化配置
- [!] 优化了异步加载，只有需要异步加载的部分 Suspense 渲染，且分析并只异步加载体积大的组件
- [!] 修复了只读模式下 range 组件数据未展示的问题

### 1.5.1

- [!] 修复了 1.5.0 切换打包方式到 babel 引入的安装报错问题，以及 less -> css 转换未开启的问题

### 1.5.0 (这个版本有问题，请勿安装)

- [+] 内部使用了 tree-shaking，减少首次加载，避免未用到的组件被加载
- [+] 全新的 playground，类似 vscode 的更好的体验，以及代码输入提示等
- [!] 修复了 hideDelete 会隐藏整个操作栏的问题（list2）
- [!] 解决了 schema 不存在的字段会在初始化中被去掉的问题
- [!] 添加了旧版 schema 到新 schema 的转换器
- [!] list 的复制按钮可以单独隐藏，使用 `hideCopy`

### 1.4.4

- [!] 修复了 hidden = true 是做了多余的对类型的判断的问题

### 1.4.3

- [!] 修复了 range 元素的校验，清空后不再会通不过校验
- [!] 修复了 hidden 是表达式时，即使隐藏也还是会被校验的问题
- [!] 修复了复制后的元素与原元素值同步的问题

### 1.4.2

- [!] 修复日期使用 props/format 造成校验不通过的问题

### 1.4.1

- [!] 去掉了 1.4.0 版本带来的一堆 error 的 console.log
- [!] antd 升级 4.16.0 Collapse.Panel 样式变更导致对象展示奇怪，修复兼容性
- [!] 日期组件的 format 可以在 props 里自定义设置，例如 props: {format: 'YY/MM/DD'}
- [!] 修复了几个声明文件上的类型注释错误

### 1.4.0

#### 新功能

- [+] 区别了不写 title（不占位） 和 title = '' （占位）的展示，给展示带来灵活性
- [+] 列表添加了上下移动 item 的功能，同时新增 hideMove 字段用于隐藏上下移动
- [+] 列表添加了 `addBtnProps` 属性，用于自定义“新增一条”按钮的样式和文案
- [+] 新增 extra 字段，用于描述补充文案，类似于 antd form 的 extra，详见“协议/schema 规范”
- [+] list2 组件增加了复制功能

#### 校验

- [!] fix 了列表元素上下移动后校验信息展示有误的问题（一个简单 fix，还需后续优化）
- [!] fix 了列表中非 string 类型的元素类型校验一直不通过的问题
- [!] fix 了 min = 0 时，校验信息错误的问题

#### 其他

- [!] fix 了 watch 的声明类型错误的问题
- [!] fix 了部分情况 disabled 状态变化后展示无反馈的问题

### 1.3.4

- [!] 修复复杂（带数组方法）的表达式解析错误的问题
- [!] 修复了列表展示过于挤的问题
- [!] 修复文档 errorFields 说明错误

### 1.3.3

- [+] Form 添加全局的 disabled 属性，用于全局禁用
- [+] Form 添加全局的 allCollapsed 属性，用于全局控制对象的展开/收起
- [+] 新增虚拟列表展示，对应 widget: list4，可无限滚动代替了翻页
- [+] 列表组件现在放开了页码配置支持
- [+] 列表支持隐藏“复制”、“新增”、“删除”等按钮（hideAdd/hideDelete）
- [+] 列表组件新增 props/button 属性，用于添加更多的操作按钮
- [!] 修复了 range 组件的必填校验无效的问题
- [!] 修复了 onMount 时，bind 字段无效的问题
- [!] 新增 readOnlyWidget 字段，用于定制化只读模式的组件渲染
- [!] 修复了 onMount/getValues 等 TS 声明有误的问题

### 1.3.2

- [!] playground 完全翻新
- [!] 文档补充了更多的使用方
- [!] 修复了 onValuesChange 在声明文件里声明成必填的问题
- [!] 修复了文档链接带锚点不会自动滚动到的问题
- [!] 修复了 `addons.getValues` 返回错误的问题
- [!] 修复上一个版本不慎引入的了 `getValues` 返回错误的问题

### 1.3.1

- [+] 列表支持 props/buttons 属性，用于添加更多的自定义操作按钮 ([#343](https://github.com/alibaba/x-render/issues/343))
- [+] 添加了 `onValuesChange` 方法，用于实时更新的钩子，暂时不放文档，内部试验一下性能
- [+] 添加了 `className` 这个基础属性，用于样式覆盖特定的表单元素
- [!] 解决包体积大小问题 lodash -> lodash-es ([#341](https://github.com/alibaba/x-render/issues/341))
- [!] 修复颜色选择器无法选中透明度的问题 ([#349](https://github.com/alibaba/x-render/issues/349))
- [!] 列表的 min/max 属性能正常被校验
- [!] 修复了隐藏的字段（hidden = true），还是会去执行校验的 bug ([#348](https://github.com/alibaba/x-render/issues/348))
- [!] 在 React profiler 的帮助下，减少了重复渲染，提升性能 ([#344](https://github.com/alibaba/x-render/issues/344))
- [!] 修复了 number 类型 0 无法通过必填校验的 bug ([#347](https://github.com/alibaba/x-render/issues/347))

### 1.3.0

- [+] 新增了 onMount 的生命周期，在表单首次加载后触发
- [+] 新增了 setSchemaByPath 方法，方便用户快速根据路径修改 schema
- [+] 文档新增了生命周期。表单监听和表单方法文档大幅更新
- [!] range 组件的校验和展示问题修复
- [!] getValues 获取的值现在与 submit 时拿到的一致了
- [!] 对是否是 checkbox 的 schema 的判断更为严格，避免误伤

### 1.2.0

- [+] form-render 现在能完美支持 vite 等新的基于 esm 的开发工具了！
- [+] `watch` 支持了 immediate 参数，且首次加载默认不会被调用，用法与 vue.js 完全相同
- [+] 做了简单的 hidden = true 的元素提交时去掉的处理
- [!] 修复了 typesript 没有声明新 api `watch` 的问题
- [!] 修复了 image 的判断过于严格的问题
- [!] 优化了表达式计算逻辑，进一步减少计算
- [!] submit 返回的数据中，所有的 undefined 的值会自动刨去
- [!] 修复了元素 hidden 时，出现空白占位的问题
- [!] 修复了 type 书写错误直接导致程序 crash 的问题，现在会给出一个提示
- [!] 修复了 slider 组件对 min/max 支持有误的问题

### 1.1.3

- [+] html 组件支持多选的展示，更好支持 readOnly 下的展示
- [!] beforeFinish 的入参为 object，现在能获取 {data, errors,schema} 三个入参, 更多入参可以通过 config 传入
- [!] 修复了 object 和 list 的展示，并能正确的去判断 schema 使用了自定义组件 ([#319](https://github.com/alibaba/x-render/issues/319))
- [!] 修复了 description 的展示兼容性 ([#323](https://github.com/alibaba/x-render/issues/323))
- [!] 修复了 readOnly 判断优先级低于 widget 字段导致自定义组件在 readOnly 模式下展示无效的问题 ([#327](https://github.com/alibaba/x-render/issues/327))
- [!] 修复了 html 组件报错的问题 ([#331](https://github.com/alibaba/x-render/issues/331))
- [!] 修复了 resetFields 没有清除“用户是否触摸”的状态，导致校验展示的问题

### 1.1.2

- [!] 修复 list 的删除无效的问题，并做了展示上的优化

### 1.1.1

- [+] 更新 npm 包的文档信息以及补全对应的 package 信息

### 1.1.0

- [+] 新增 watch 方法，用于监听表单值变化，触发 callback
- [+] 新增 form.resetFields 方法，用于重置表单（值和内部状态）([#315](https://github.com/alibaba/x-render/issues/315))
- [+] list1 展示优化，且支持了 hideTitle 模式
- [+] date 组件的 format 支持了 year、quarter、week、month 等
- [+] 更新了 props 的使用规范文档
- [!] fix 了自定义组件 type=boolean 时，没有显示 title 的问题 ([#313](https://github.com/alibaba/x-render/issues/313))
- [!] 修复了 list2 展示没有明确的必填提示的问题
- [!] 修复了 list2 展示没有填满 table 单元格的问题

### 1.0.5

- [+] 新增 `validateMessages` 字段，用于覆盖默认的校验信息，详见[文档](https://xrender.fun/form-render#validatemessages) ([#306](https://github.com/alibaba/x-render/issues/306))
- [!] rules 字段无法生效的问题 ([#305](https://github.com/alibaba/x-render/issues/305))
- [!] 修复了下拉多选框在 value = null 时会展示一个空标签的问题
- [!] 说明（description）的 tooltip 展示气泡位置确保对齐

### 1.0.4

- [+] 新增时间区间组件 timeRange。通过`{type: 'range', format: 'time'}` 渲染
- [!] 完善 ts 声明文件。([#302](https://github.com/alibaba/x-render/pull/302))
- [!] fix 了 rules 校验和 image 校验的冲突
- [!] 修复了 tooltip、checkbox 等样式的问题

### 1.0.3

- [!] fix 列表的 bind 无效的问题
- [!] fix format: image 未校验的问题
- [!] 默认列表样式微调

### 1.0.2

- [+] 新增默认列表展示 card list。widget: list0
- [+] 列表添加了“复制”的功能
- [!] 对象标题、以及列表的样式更加紧凑
- [!] 智能渲染的规则与 form-render 0.x 的习惯靠拢。单选 enum 长度 2 以上的使用下拉选择，多选 enum 长度 6 以上的使用下拉选择
- [!] 解决了由于闭包造成的对表单元素是否被 touch 的判断偶然不更新的问题

### 1.0.1

- [+] 自定义组件参数增加了 formData、getValue，用于获取其他表单元素的值
- [!] fix 了表单销毁后校验状态等表单状态没有消失的问题（内置了 destroyForm 方法，在组件销毁时触发）
- [!] 解决了由于闭包造成的 formData 偶然不更新的问题
- [!] fix 了 image、url 类型的输入框 value 没有代入的问题
- [!] 使用 radio 的自动判断从 enum 长度为 3 变为 2
- [!] 迁移文档更新

### 1.0.0

- [+] form-render 1.0 正式发版
