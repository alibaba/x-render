# 更新日志
### 2.0.19
-[!] 修复 html 组件 select 回显问题

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
