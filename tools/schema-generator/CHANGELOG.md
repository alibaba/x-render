# Change Log

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
