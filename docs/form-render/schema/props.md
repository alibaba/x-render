---
order: 1
group:
  order: 1
  title: API
toc: content
---

## Props

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
| mapping          | schema 与组件的映射关系表，当内置的表不满足时使用                               | `Record<string, string>`                                                                              | -      |
| disabled         | 禁用全部表单项                                                                  | `boolean`                                                                                             | false  |
| debugCss         | 用于 css 问题的调整，显示 css 布局提示线                                        | `boolean`                                                                                             | false  |
| locale           | 展示语言，目前只支持中文、英文                                                  | `'cn' \| 'en'`                                                                                        | cn     |
| configProvider   | antd 的 configProvider，配置透传                                                | [ConfigProviderProps](https://ant-design.antgroup.com/components/config-provider-cn/#API)             | -      |
| allCollapsed     | 对象组件是否默认折叠（全局）                                                    | `boolean`                                                                                             | false  |
| debounceInput    | 是否开启输入时使用快照模式。仅建议在表单巨大且表达式非常多时开启                | `boolean`                                                                                             | false  |
| validateMessages | 修改默认的校验提示信息                                                          | [ValidateMessages](#validatemessages)                                                                 | -      |
| debug            | 开启 debug 模式，时时显示表单内部状态，**开发的时候强烈建议打开**               | `boolean`                                                                                             | false  |
| id               | 表单的 id，一般用于标识一个表单的语义化名称                                     | `string \| number`                                                                                    | -      |

### FormInstance

| 参数             | 描述                                                | 类型                                                                                                                |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| submit           | 触发提交流程，一般在提交按钮上使用                  | `() => void`                                                                                                        |
| resetFields      | 清空表单（也会清空一些内置状态，例如校验）          | `({formData?: any, submitData?: any, errorFields?: Error[], touchedKeys?: string[], allTouched?: boolean}) => void` |
| errorFields      | 表单校验错误的数组                                  | `Error[]`                                                                                                           |
| setErrorFields   | 外部手动修改 errorFields 校验信息，用于外部校验回填 | `(error: Error[]) => void`                                                                                          |
| setValues        | 外部手动修改 formData，用于已填写的表单的数据回填   | `(formData: any) => void`                                                                                           |
| setValueByPath   | 外部修改指定单个 field 的数据(原名 onItemChange)    | `(path: Path, value: any) => void`                                                                                  |
| setSchemaByPath  | 指定路径修改 schema                                 | `(path: Path, value: any) => void`                                                                                  |
| setSchema        | 指定多个路径修改 schema                             | `({ path: value }) => void`                                                                                         |
| getValues        | 获取表单内部维护的数据 formData                     | `() => any`                                                                                                         |
| schema           | 表单的 schema                                       | `object`                                                                                                            |
| touchedKeys      | 已经触碰过的 field 的数据路径                       | `Path[]`                                                                                                            |
| removeErrorField | 外部手动删除某一个 path 下所有的校验信息            | `(path: Path) => void`                                                                                              |
| formData         | 表单内部维护的数据，建议使用 getValues/setValues    | `Record<string, any>`                                                                                               |

> react 更新机制导致，同时多次调用 `setSchemaByPath` 无效，所以请使用 `setSchema`，事实上`setSchema` 能完全覆盖 `setSchemaByPath` 的场景

### Widgets

当内置组件不能满足需求时，可以传入自定义组件

```jsx | pure
import { Cascader } from 'antd';

// 顶层引入注册
<Form widgets={{ cascader: Cascader }} />

// schema 中使用
location: {
  title: '省市区',
  type: 'string',
  widget: 'cascader',
},
```

### Watch

用于数据的监听的唤起回调。语法类似于 vue 的 `watch`。

```tsx | pure
type WatchProperties = Record<
  Path,
  (val: any) => void | {
    handler: (val: any) => void;
    immediate?: boolean; // 是否在首次加载时就执行一次 watch 的 handler
  }
>;

const watch: WatchProperties = {
  '#': val => {
    // # 为全局
    console.log('表单的实时数据为：', val);
  },
  path1: val => {
    // do something ...
  },
  path2: {
    handler: val => {},
    immediate: true,
  },
};

<Form watch={watch} />;
```

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

### Path

`path` 代表一个表单项在 schema 中的路径，在调用 `form.setSchemaByPath`，`watch` 等 api 时，需要用到

```js
const schema = {
  type: 'object',
  properties: {
    // 没有嵌套元素的普通表单中
    // 此元素的 path 为 'address'
    address: {
      title: '地址',
      type: 'string',
    },

    // 表单中嵌套了一个对象类型的元素时
    obj: {
      title: '对象',
      type: 'object',
      properties: {
        // 此元素的 path 为 'obj.select'
        select: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
      },
    },

    // 在 list 类型的表单元素中，使用 [] 表示 list
    list: {
      title: '对象数组',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          // 此元素的 path 为 'list[].input'
          input: {
            title: '输入框',
            type: 'string',
          },
          object: {
            title: '对象',
            type: 'object',
            properties: {
              // 此元素的 path 为 'list[].object.select'
              select: {
                title: '选择框',
                type: 'string',
                enum: ['a', 'b', 'c'],
                enumNames: ['早', '中', '晚'],
              },
            },
          },
        },
      },
    },
  },
};
```

### Error

```ts
type Error = {
  /** 错误的数据路径 */
  name: string;
  /** 错误的内容 */
  error: string[];
};
```

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
