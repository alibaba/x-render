# Changelog

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
- [+] 添加了 `onValuesChange` 方法，用于时时更新的钩子，暂时不放文档，内部试验一下性能
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

- [+] 新增 `validateMessages` 字段，用于覆盖默认的校验信息，详见[文档](https://x-render.gitee.io/form-render#validatemessages) ([#306](https://github.com/alibaba/x-render/issues/306))
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
