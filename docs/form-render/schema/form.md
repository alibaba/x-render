---
order: 3
group:
  order: 1
  title: API
toc: content
---

# API

## Form

| 参数             | 描述                                                                            | 类型                                                                                                  | 默认值 |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| schema           | **必填**，描述表单的 schema，详见 [schema 规范](./schema.md)                    | [SchemaBase](https://github.com/alibaba/x-render/blob/master/packages/form-render/src/index.d.ts#L16) | -      |
| form             | **必填**，`useForm` 创建的表单实例，与 Form 一对一绑定                          | [FormInstance](#forminstance)                                                                         | -      |
| onFinish         | 提交后的回调，执行 `form.submit()` 后触发                                       | `(data, errors: Error[]) => void`                                                                     | -      |
| beforeFinish     | 在 onFinish 前触发，一般用于外部校验逻辑的回填                                  | `({ data, errors, schema, ...rest }) => Error[] \| Promise<Error[]>`                                  | -      |
| onMount          | 表单首次加载时触发，详见[生命周期](/form-render/advanced/life-cycle)            | `() => void`                                                                                          | -      |
| displayType      | 表单元素与 label 同行 or 分两行展示, inline 则整个展示自然顺排                  | `'column' \| 'row' \| 'inline'`                                                                       | column |
| widgets          | 自定义组件，当内置组件无法满足时使用，详见[自定义组件](./../advanced/widget.md) | [Widgets](#widgets)                                                                                   | -      |
| watch            | 类似于 vue 的 watch 的用法，详见[表单监听](/form-render/advanced/watch)         | [Watch](#watch)                                                                                       | -      |
| removeHiddenData | 提交数据的时候是否去掉已经被隐藏的元素的数据，默认不隐藏                        | `boolean`                                                                                             | false  |
| readOnly         | 只读模式，一般用于预览展示，全文 text 展示                                      | `boolean`                                                                                             | false  |
| className        | 顶层 className                                                                  | `string`                                                                                              | -      |
| style            | 顶层 style                                                                      | `CSSProperties`                                                                                       | -      |
| column           | 一行展示多少列                                                                  | `number`                                                                                              | 1      |
| mapping          | schema 与组件的映射关系表，当内置的表不满足时使用                               | [Mapping](#mapping)                                                                                   | -      |
| disabled         | 禁用全部表单项                                                                  | `boolean`                                                                                             | false  |
| debugCss         | 用于 css 问题的调整，显示 css 布局提示线                                        | `boolean`                                                                                             | false  |
| locale           | 展示语言，目前只支持中文、英文                                                  | `'cn' \| 'en'`                                                                                        | cn     |
| configProvider   | antd 的 configProvider，配置透传                                                | [ConfigProviderProps](https://ant-design.antgroup.com/components/config-provider-cn/#API)             | -      |
| allCollapsed     | 对象组件是否默认折叠（全局）                                                    | `boolean`                                                                                             | false  |
| debounceInput    | 是否开启输入时使用快照模式。仅建议在表单巨大且表达式非常多时开启                | `boolean`                                                                                             | false  |
| validateMessages | 修改默认的校验提示信息。详见[ValidateMessages](#validatemessages)               | `Record<string, string>`                                                                              | -      |
| debug            | 开启 debug 模式，时时显示表单内部状态，**开发的时候强烈建议打开**               | `boolean`                                                                                             | false  |
| id               | 表单的 id，一般用于标识一个表单的语义化名称                                     | `string \| number`                                                                                    | -      |

### Widgets

todo

### Watch

todo

### Mapping

todo

### ValidateMessages

Form-Render 为验证提供了默认的错误提示信息，你可以通过配置 `validateMessages` 属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```jsx | pure
const validateMessages = {
  required: '${title}是必选字段',
  // ...
};

<Form validateMessages={validateMessages} />;
```

目前可以用的转义字段为 `${title}`，`${min}`，`${max}`，`${len}`，`${pattern}`, 如果有更多需求请提 [issue](https://github.com/alibaba/x-render/issues/new/choose)

## Hooks

### UseForm

`useForm` 用于创建表单实例，使用时需要创建实例，并传入与其对应的表单上

```jsx | pure
import Form, { useForm } from 'form-render';

const Demo = () => {
  const form = useForm();
  return <Form form={form} />;
};
```

如果是 class 组件可以使用 `connectForm` ，作用与 `useForm` 相同

```jsx | pure
import Form, { connectForm } from 'form-render';

const Demo = ({ form }) => {
  return <Form form={form} />;
};

export default connectForm(Demo);
```

`useForm` 可以传入以下参数，详见[表单健康度 & 提效](./../advanced/measure.md)

```jsx | pure
const form = useForm({
  logOnMount: info => {}, // 会在表单首次加载时触发, 获取表单信息
  logOnSubmit: info => {}, // 会在 form.submit 时触发，获取表单信息（如填写时长、报错信息等）
});
```

## FormInstance

| 参数             | 描述                                                | 类型                                                                                                             |
| ---------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| submit           | 触发提交流程，一般在提交按钮上使用                  | `() => void`                                                                                                     |
| resetFields      | 清空表单（也会清空一些内置状态，例如校验）          | `({formData?: any, submitData?: any, errorFields?: Error[], touchedKeys?: any[], allTouched?: boolean}) => void` |
| errorFields      | 表单校验错误的数组                                  | `array,[{name, error: []}]`                                                                                      |
| setErrorFields   | 外部手动修改 errorFields 校验信息，用于外部校验回填 | `(error: Error[]) => void`                                                                                       |
| setValues        | 外部手动修改 formData，用于已填写的表单的数据回填   | `(formData: any) => void`                                                                                        |
| setValueByPath   | 外部修改指定单个 field 的数据(原名 onItemChange)    | `(path: string, value: any) => void`                                                                             |
| setSchemaByPath  | 指定路径修改 schema                                 | `(path: string, value: any) => void`                                                                             |
| setSchema        | 指定**多个**路径修改 schema。注 1                   | `({ path1: value1, path2: value2 }) => void`                                                                     |
| getValues        | 获取表单内部维护的数据 formData                     | `() => void`                                                                                                     |
| schema           | 表单的 schema                                       | `object`                                                                                                         |
| touchedKeys      | 已经触碰过的 field 的数据路径                       | `string[]`                                                                                                       |
| removeErrorField | 外部手动删除某一个 path 下所有的校验信息            | `(path: string) => void`                                                                                         |
| formData         | 表单内部维护的数据，建议使用 getValues/setValues    | `Record<string, any>`                                                                                            |

注 1： react 更新机制导致，同时多次调用 `setSchemaByPath` 无效，所以请使用 `setSchema`，事实上`setSchema` 能完全覆盖 `setSchemaByPath` 的场景

### Path

todo

### Error

todo
