---
order: 0
group: 
  title: API
  order: 4
---

# 表单属性

## Props

| 参数             | 说明                                                                                     | 类型                                                                                                  | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| schema           | **必填**，描述表单的 schema，详见 [schema 规范](/form-render/api-schema)                              | [SchemaBase](https://github.com/alibaba/x-render/blob/master/packages/form-render/src/index.d.ts#L16) | -      |
| form             | **必填**，`useForm` 创建的表单实例，与 Form 一对一绑定，详见[Forminstance](#forminstance) | `FormInstance`                                                                                        | -      |
| onFinish         | 提交后的回调，执行 `form.submit()` 后触发                                                 | `(data, errors: Error[]) => void`                                                                     | -      |
| beforeFinish     | 在 onFinish 前触发，一般用于外部校验逻辑的回填                                            | `({ data, errors, schema, ...rest }) => Error[] \| Promise<Error[]>`                                  | -      |
| onMount          | 表单首次加载时触发                                                            | `() => void`                                                                                          | -      |
| displayType      | 表单元素与 label 同行 or 分两行展示, inline 则整个展示自然顺排                            | `'column' \| 'row' \| 'inline'`                                                                       | column |
| labelAlign       | label 标签的文本对齐方式                                                                  | `'left' \| 'right'`                                                                                   | right  |
| colon            | 是否显示 label 后面的冒号                                                                 | `boolean`                                                                                             | true   |
| widgets          | 自定义组件，当内置组件无法满足时使用，详见[Widgets](#widgets)                             | `Record<string, ReactNode>`                                                                           | -      |
| watch            | 监听表单的数据变化，详见[Watch](#watch)                                                   | `Record<string, (val: any) => void \| { handler:(val:any) => void,immediate?: boolean }>`             | -      |
| removeHiddenData | 提交数据的时候是否去掉已经被隐藏的元素的数据，默认隐藏                                  | `boolean`                                                                                             | true   |
| readOnly         | 只读模式，一般用于预览展示，全文 text 展示                                                | `boolean`                                                                                             | false  |
| className        | 顶层 className                                                                            | `string`                                                                                              | -      |
| style            | 顶层 style                                                                                | `CSSProperties`                                                                                       | -      |
| column           | 一行展示多少列                                                                            | `number`                                                                                              | 1      |
| mapping          | schema 与组件的映射关系表，当内置的表不满足时使用                                         | `Record<string, string>`                                                                              | -      |
| disabled         | 禁用全部表单项                                                                            | `boolean`                                                                                             | false  |
| debugCss         | 用于 css 问题的调整，显示 css 布局提示线                                                  | `boolean`                                                                                             | false  |
|scrollToFirstError | 提交失败自动滚动到第一个错误字段，默认关闭                                                                                                            |  `boolean \|`  [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)  | false       
| locale           | 展示语言，目前只支持中文、英文                                                            | `'zh-CN' \| 'en-US'`                                                                                        | zh-CN     |
| configProvider   | antd 的 configProvider，配置透传                                                          | [ConfigProviderProps](https://ant-design.antgroup.com/components/config-provider-cn/#API)             | -      |
| allCollapsed     | 对象组件是否默认折叠（全局）                                                              | `boolean`                                                                                             | false  |
| debounceInput    | 是否开启输入时使用快照模式。仅建议在表单巨大且表达式非常多时开启                          | `boolean`                                                                                             | false  |
| validateMessages | 修改默认的校验提示信息，详见[ValidateMessages](#validatemessages)                         | `Record<string, string>`                                                                              | -      |
| debug            | 开启 debug 模式，时时显示表单内部状态，**开发的时候强烈建议打开**                         | `boolean`                                                                                             | false  |
| id               | 表单的 id，一般用于标识一个表单的语义化名称                                               | `string \| number`                                                                                    | -      |

## FormInstance

| 参数              | 描述                                                                                                                  | 类型                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| submit            | 触发提交流程，一般在提交按钮上使用                                                                                    | `() => void`                                                                                                        |
| resetFields       | 清空表单（也会清空一些内置状态，例如校验）                                                                            | `({formData?: any, submitData?: any, errorFields?: Error[], touchedKeys?: string[], allTouched?: boolean}) => void` |
| errorFields       | 表单校验错误的数组                                                                                                    | `Error[]`                                                                                                           |
| setErrorFields    | 外部手动修改 errorFields 校验信息，用于外部校验回填                                                                   | `(error: Error[]) => void`                                                                                          |
| setValues         | 外部手动修改 formData，用于已填写的表单的数据回填                                                                     | `(formData: any) => void`                                                                                           |
| setValueByPath    | 外部修改指定单个 field 的数据(原名 onItemChange)                                                                      | `(path: Path, value: any) => void`                                                                                  |
| setSchemaByPath   | 指定路径修改 schema                                                                                                   | `(path: Path, value: any) => void`                                                                                  |
| setSchema         | 指定多个路径修改 schema                                                                                               | `({ path: value }) => void`                                                                                         |
| getValues         | 获取表单内部维护的数据, 如果参数为空则返回当前所有数据                                                                | `(nameList?: Path[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any`             |
| getHiddenValues   | 获取隐藏的表单数据                                                                                                    | `() => any`                                                                                                         |
| schema            | 表单的 schema                                                                                                         | `object`                                                                                                            |
| touchedKeys       | 已经触碰过的 field 的数据路径                                                                                         | `Path[]`                                                                                                            |
| removeErrorField  | 外部手动删除某一个 path 下所有的校验信息                                                                              | `(path: Path) => void`                                                                                              |                                                                                    |
| isFieldTouched    | 检查某个表单是否被用户操作过                                                                                          | `(name: Path) => boolean`                                                                                           |
| isFieldsTouched   | 检查一组字段 fields 是否被用户操作过, allTouched 为 true 是检查是否所有字段都被操作过                                 | `(nameList?: Path[], allTouched?: boolean) => boolean`                                                              |
| isFieldValidating | 检查对应字段 field 是否正在校验                                                                                       | `(name: Path) => boolean`                                                                                           |
| scrollToPath      | 滚动到 path 对应的位置                                                                                                | `(name: Path , options?:` [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)`) => boolean`                                                                                               |                                                                                                                                   |
| getFieldError     | 获取对应字段 field 的错误信息                                                                                         | `(name: Path) => string[]`                                                                                          |
| getFieldsError    | 获取一组字段 fields 对应的错误信息, 返回数组形式; 入参为空则获取所有字段对应的错误信息, 返回错误信息[Error](#error)[] | `(nameList: Path[]) => Error[]`                                                                                     |
| setFields         | 设置一组字段状态, [Field](#field) []                                                                                  | `(nameList: Field[]) => void`                                                                                       |
| validateFields    | 触发表单验证, [示例](#validatefields)                                                                                 | `(nameList?: Path[]) => Promise`                                                                                    |
