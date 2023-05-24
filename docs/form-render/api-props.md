---
order: 0
mobile: false
group: 
  title: API
  order: 4
---

# 表单属性

## Props

| <div style="width:200px">参数</div>          | 说明                                                                                     | 类型                                                                                                  | <div style="width:100px">默认值</div> |
| ---------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| schema           | **必填**，描述表单的 schema，详见 [协议配置项](/form-render/api-schema)                              | <a target="_blank" href="https://github.com/alibaba/x-render/blob/e2feff8fdb3bef5537b92a2157dbbf40b9d4eb17/packages/form-render/src/type.ts#L32">SchemaBase</a> | -      |
| form             | **必填**，`useForm` 创建的表单实例，与 Form 一对一绑定，详见[Forminstance](#forminstance) | `FormInstance`                                                                                        | -      |
| onFinish         | 提交后的回调，执行 `form.submit()` 后触发                                                 | `(data) => void`                                                                     | -      |
| beforeFinish     | 在 onFinish 前触发，一般用于外部校验逻辑的回填                                            | `({ data, errors, schema, ...rest }) => Error[] \| Promise<Error[]>`                                  | -      |
| onMount          | 表单首次加载时触发                                                            | `() => void`                                                                                          | -      |
| displayType      | 表单元素与 label 同行 or 分两行展示, inline 则整个展示自然顺排                            | `'column' \| 'row' \| 'inline'`                                                                       | column |
| labelAlign       | label 标签的文本对齐方式                                                                  | `'left' \| 'right'`                                                                                   | right  |
| colon            | 是否显示 label 后面的冒号                                                                 | `boolean`                                                                                             | true   |
| globalConfig     | 表单全局配置，详见 [GlobalConfig](/form-render/api-props#globalconfig)                                                                 | `GlobalConfig`                                                                                             | true   |
| globalProps     |   全局属性，注入到 widget 的 `addons.globalProps` 中                                                              | `Record<string, any>`                                                                                             | -   |
| widgets          | 自定义组件，当内置组件无法满足时使用，详见[自定义组件](/form-render/advanced-widget)                             | `Record<string, ReactNode>`                                                                           | -      |
| watch            | 监听表单的数据变化，详见 [Watch 监听](/form-render/advanced-linkage#watch-监听)                                                   | `Record<string, (val: any) => void \| { handler:(val:any) => void,immediate?: boolean }>`             | -      |
| removeHiddenData | 提交数据的时候是否去掉已经被隐藏的元素的数据，默认隐藏                                  | `boolean`                                                                                             | true   |
| readOnly         | 只读模式，一般用于预览展示，全文 text 展示                                                | `boolean`                                                                                             | false  |
| className        | 顶层 className                                                                            | `string`                                                                                              | -      |
| style            | 顶层 style                                                                                | `CSSProperties`                                                                                       | -      |
| column           | 一行展示多少列                                                                            | `number`                                                                                              | 1      |
| disabled         | 禁用全部表单项                                                                            | `boolean`                                                                                             | false  |
|scrollToFirstError | 提交失败自动滚动到第一个错误字段，默认关闭                                                                                                            |  `boolean \|`  <a href="https://github.com/scroll-into-view/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options" target="_blank">ScrollOptions</a>  | false       
| locale           | 展示语言，目前只支持中文、英文                                                            | `'zh-CN' \| 'en-US'`                                                                                        | zh-CN     |
| configProvider   | antd 的 configProvider，配置透传                                                          | <a href="https://ant-design.antgroup.com/components/config-provider-cn/#API" target="_blank">ConfigProviderProps</a>             | -      |
| validateMessages | 修改默认的校验提示信息，详见[ValidateMessages](/form-render/advanced-validate)                         | `Record<string, string>`                                                                              | -      |
| id               | 表单的 id，一般用于标识一个表单的语义化名称                                               | `string \| number`                                                                                    | -      |

## FormInstance

| <div style="width:200px">参数</div>              | 描述                                                                                                                  | 类型                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| submit            | 触发提交流程，一般在提交按钮上使用                                                                                    | `() => void`                                                                                                        |
| resetFields       | 清空表单（也会清空一些内置状态，例如校验）                                                                            | `(fieldPath?: Path[]) => void` |
| setErrorFields    | 外部手动修改 errorFields 校验信息，用于外部校验回填                                                                   | `(error: Error[]) => void`                                                                                          |
| setValues         | 外部手动修改 formData，用于已填写的表单的数据回填                                                                     | `(formData: any) => void`                                                                                           |
| setValueByPath    | 外部修改指定单个 field 的数据(原名 onItemChange)                                                                      | `(path: Path, value: any) => void`                                                                                  |
| setSchemaByPath   | 指定路径修改 schema                                                                                                   | `(path: Path, schema: any) => void`                                                                                  |
| setSchema         | 指定多个路径修改 schema                                                                                               | `({ path: value }) => void`                                                                                         |
| getValues         | 获取表单内部维护的数据, 如果参数为空则返回当前所有数据                                                                | `(nameList?: Path[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any`             |
| getHiddenValues   | 获取隐藏的表单数据                                                                                                    | `() => any`                                                                                                         |
| getSchema            | 获取表单的 schema                                                                                                         | `()=> object`                                                                                                            |
| removeErrorField  | 外部手动删除某一个 path 下所有的校验信息                                                                              | `(path: Path) => void`                                                                                              |                                                                                    |
| isFieldTouched    | 检查某个表单是否被用户操作过                                                                                          | `(name: Path) => boolean`                                                                                           |
| isFieldsTouched   | 检查一组字段 fields 是否被用户操作过, allTouched 为 true 是检查是否所有字段都被操作过                                 | `(nameList?: Path[], allTouched?: boolean) => boolean`                                                              |
| isFieldValidating | 检查对应字段 field 是否正在校验                                                                                       | `(name: Path) => boolean`                                                                                           |
| scrollToPath      | 滚动到 path 对应的位置                                                                                                | `(name: Path , options?:` <a href="https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options" target="_blank">ScrollOptions</a>`) => boolean`                                                                                               |                                                                                                                                   |
| getFieldError     | 获取对应字段 field 的错误信息                                                                                         | `(name: Path) => string[]`                                                                                          |
| getFieldsError    | 获取一组字段 fields 对应的错误信息, 返回数组形式; 入参为空则获取所有字段对应的错误信息 | `(nameList: Path[]) => Error[]`                                                                                     |
| validateFields    | 触发表单校验 | `(nameList?: Path[]) => Promise<any>`                                                                                     |

## GlobalConfig

| <div style="width:200px">参数</div>              | 描述                                                 | 类型              |
| ----------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| mustacheDisabled  | 是否禁用表达式                                                            | `boolean`              |
| listOperate       | 列表表单配置                                         | `ListOperate` |

### ListOperate
| <div style="width:200px">参数</div>              | 描述                                                 | 类型              |
| ----------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| btnType  |   列表表单操作按钮样式                                                          | `'icon'\|'text'`              |
| hideMove       | 是否隐藏移动按钮                                         | `boolean` |
