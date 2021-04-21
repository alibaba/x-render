# Changelog

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
