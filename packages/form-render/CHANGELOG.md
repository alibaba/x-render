# 更新日志

### 2.3.6
- [!] 修复 List 组件初始化数据，删除按钮未显示
- [!] 修复因配置 validator 导致通过 watch 触发 setSchemaBypath 初次不生效

### 2.3.5 
- [+] labelWidget、descWidget 增加 addons 访问属性
- [!] 兼容 widget 大小写配置

### 2.3.0
- [+] 优化 search-form 折叠收起逻辑，不再判断 dom 真实渲染高度，提升渲染性能
- [!] form.getValues 判断 removeHiddenData = true 时，才去除隐藏控件数据

### 2.2.18
- [+] 优化 ListTab 性能优化
### 2.2.17 
- [!] List 嵌套下去默认去除隐藏值
### 2.2.16
- [!] 修复 SearchForm schema undefined 异常处理
### 2.2.14
- [!] 修复 List 嵌套下 输入控件被隐藏，提交数据值还能被获取
### 2.2.13
- [!] 修复 List 嵌套 list 组件自身函数表达式不生效
### 2.2.9
- [!] 修复 schema 依赖更新异常
### 2.2.8
- [+] SearchForm 增加 onReset 自定义重置方法
- [-] 修复 setSchemaByPath 判断，在某些情况不生效
- [-] 修复 SearchForm layoutAuto 自适应布局异常
### 2.2.6
- [+] SearchForm 增加 closeReturnSearch 关闭回车查询属性

### 2.2.5
- [!] 修复 react hook 提示错误
### 2.2.4
- [!] 修复 SearchForm 开启layoutAuto，重新激活页面，collapsed会失效
### 2.2.3
- [!] 修复 List 组件使用函数表达式，依赖值变化组件不更新
- [+] collapse 折叠组件，支持配置 bordered、ghost 属性
- [+] 进一步优化组件更新逻辑，精确更新，自动匹配关联表单项值是否变化
- [+] 增加 widgetType 字段，当 widgetType = 'field'时，强制走自定义组件逻辑，用于区分容器组件逻辑一般无需配置
### 2.1.29
- [!] 修复子表单场景，默认只在表单提交时触发校验
- [+] 增加 form.getFieldRef API，自定义组件可以暴露实例，供 getFieldRef 使用

### 2.1.28
- [+] 增加 ListTable、ListVirtual 校验增加非气泡模式配置
 globalConfig = { listValidatePopover: false }
- [+] 增加子表单校验配置，详细内容查看表单校验文档

### 2.1.25
- [+] 增加 form.getFlattenSchema API
- [+] List 场景支持 rules: []，整体校验配置
- [!] 修复 TableList 场景，输入框控件自定义校验提示异常

### 2.1.21
- [!] 修复 DrawerList 编辑时，报错
### 2.1.20
- [!] 修复 validateFields 调用无效
### 2.1.17
- [!] 修复 labelWidth 设置 0，无效
### 2.1.16
- [+] 增强 dependencies 字段能力，支持 List 嵌套 dependencies 配置
### 2.1.15
- [+] 增强 bind 字段能力，支持 List 嵌套 bind 配置
- [+] 增加 Field className 配置
### 2.1.14
- [!] 修复 单个控件校验提示出现多个，例如 required 和 max 不满足时会同时出现提示

### 2.1.13
- [!] 修复 校验 min = 0 时，不生效
- [+] cardList 增加 useMemo 提升表单输入性能，避免输入卡顿

### 2.1.12

### 2.1.11
- [!] 修复 form-render schema.enum.indexof 错误
### 2.1.10
- [+] 扩展 list 组件 actionColumnProps 配置属性
### 2.1.9
- [!] 修复 form-render ts 错误
### 2.1.8
- [+] 新增 footer 按钮配置栏

### 2.1.7
- [+] 新增 组件按需功能，导出 FormSlimRender 实例
### 2.1.6
- [+] 新增 order 排序
- [!] 去除 setSchemaByPath 属性合并，只对 schema.props 进行简单合并

### 2.1.5
- [!] 修复 select 清除异常报错
### 2.1.1-2.1.4
- [!] 修复 searchForm 列布局，查询按钮高度异常
### 2.1.0
- [+] 增加 span 属性支持表单项宽度自定义
### 2.0.19
- [!] 修复 html 组件 select 回显问题

### 2.0.17
- [+] 增加 labelWidget，配置用于 form.item lable 的自定义
### 2.0.15
- [!] 修复查询表单, displayType='column' 布局异常
- [!] 修复 simpleList, 新增报错

### 2.0.14
- [+] CardList 增加计数提示
### 2.0.13
- [+] 增加输入控件，extra、help 属性配置
- [+] 自定义校验 validator 支持返回一个 { status: true/ false , message: '错误信息' }，用于动态设置 message
### 2.0.11
- [+] SearchForm 增加 layoutAuto 是否自适应布局
### 2.0.10
- [!] 修复 Modal 模式下，弹窗关闭，表单值无法清除

### 2.0.9
- [+] 优化 displayType inline 模式下表单项布局

### 2.0.6
- [!] 修复 DatePicker 组件显示默认是英文提示
### 2.0.3
- [+] 增加查询表单 SearchForm

### 2.0.1
- [+] 添加全局 props `globalProps`, 解决与 form-render 无关的全局数据的注入问题。自定义组件中可以获取到 globalProps。这也解决了自定义组件在不同的页面也许需要接受不同的 props 的问题
### 2.0.0

- [+] form-render 2.0 正式发版
