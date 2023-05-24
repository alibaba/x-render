---
order: 4
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 自定义组件

在实际的开发中，可能会遇到如下的应用场景：

- 我需要写一个异步加载的搜索输入框（普适性不高/难以用 schema 描述的组件）
- 我们团队使用 xxx ui，与 antd 不搭，希望能适配一套 xxx ui 组件的 FormRender（欢迎 Pull Request）
- 我需要在表单内部写一个 excel 上传按钮（完全定制化的需求）

FormRender 内置的控件可能不能满足功能上的需要，这时就需要自定义组件 widget 的支持

使用自定义组件前，也许已经有内置组件支持。具体见 [内置组件](/form-render/display-row)

:::info
如果是新增一个常用组件，建议给 FormRender 维护的同学来提 Pull Request 或 Issue 并说明你的使用场景，这样可以更好扩展其生态，FormRender 的社区以及提供了部分 [常用自定义组件](https://github.com/alibaba/x-render/tree/master/widgets)。
:::

## 什么是 Widget

widget 只是一个普通的 React 组件，它会接收到 FormRener 传递给它的一些 props。开发者可以根据这些 props 完成控件的受控、联动、校验等操作。

比方说，我想在一个常规输入框的后面放一个按钮用于发送验证码。FormRender 的内置组件不能满足需求，那么我可以写一个如下的自定义组件：

```js
const CaptchaInput = (props: any) => {
  const { value, onChange } = props;
  console.log('widget props:', props);

  const sendCaptcha = (phone: string) => {
    console.log('send captcha to:', phone);
  }

  return (
    <Space>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="请输入手机号"
      />
      <Button onClick={() => sendCaptcha(value)}>发送验证码</Button>
    </Space>
  );
};
```

## 使用 Widget

首先在 `<FormRender />` 中注册 widget。

```js
import CaptchaInput from 'my/widgets';

<FormRender widgets={{ CaptchaInput }} />
```

之后在 Schema 中指定 item 的 widget 属性为刚刚注册的 widget。

```js
const schema = {
  type: 'object',
  properties: {
    phone: {
      title: '网址输入自定义组件',
      type: 'string',
      // 指定为刚刚注册的 widget
      widget: 'CaptchaInput',
    }
  }
};
```

完整代码如下：

<code src="./demo/widget/basic.tsx"></code>

## Widget 接收到的 props

默认情况下 Widget 会接收到如下的 props：

### id
- 类型：`string`
- 描述：当前 item 在表单中的唯一 key，一般用不到

### schema
- 类型：`Schema`
- 描述：当前 item 的 schema

### value
- 类型：`any`
- 描述：当前 item 的值，用于 widget 的受控

### onChange
- 类型：`(value: any) => void`
- 描述：当前 item 的值变化时的回调用于 widget 的受控

### disabled
- 类型：`boolean`
- 描述：当前 item 是否为禁用状态，如果没有单独为这个 item 指定，那么就继承全局的 `disabled` 属性

### readOnly
- 类型：`boolean`
- 描述：当前 item 是否为只读状态，如果没有单独为这个 item 指定，那么就继承全局的 `readOnly` 属性

### addons

addons 包含了全部的表单实例方法，详见 [FormInstance](/form-render/api-props#forminstance)，这里不再赘述。除此之外 addons 还包含了如下一些额外属性。

#### addons.globalProps
- 类型：`Record<string, any>`
- 描述：全局属性

#### addons.dataIndex
- 类型：`string[]`
- 描述：是自上到下所有经过的数组的 index 按顺序存放的一个数组类型。例如当前的 `dataPath` 为 `a.b[2].c[0].d`，那么这时的 `dataIndex` 就为 `[2,0]`。

:::info
如果不是在 Form List 中，那么 `dataIndex` 始终为一个空数据 `[]`。
:::

#### addons.dataPath
- 类型：`string`
- 描述：目前数据所在的 path，例如`a.b[2].c[0].d`，详见 [Path 书写](/form-render/advanced-path)

#### addons.schemaPath
- 类型：`string`
- 描述：当前 item 的 schema 在整体中的路径

#### addons.dependValues
- 类型：`any[]`
- 描述：当自定义组件对应的 schema 使用到 dependencies 字段时，在此获得 dependencies 对应的表单项的实时的值

### others
实际上任何写入当前 schema 的 props 中的属性都会透传给 widget，所以你不必把所有自定义的属性都写在 widget 内部，更好的方式是通过 schema 控制，以得到更好的复用性。

:::error
在编写 props 时请避开 `value`、`onChange`、`addons` 等字段防止 FormRender 注入的 props 被覆盖。
:::

```js
const shcema = {
    type: 'object',
    properties: {
        name: {
            title: '姓名',
            type: 'string',
            widget: 'MyInput',
            // props 中的属性都会透传给自定义组件 MyInput
            props: {
                addonAfter: 'name',
                allowClear: true,
                foo: 'xxx',
            }
        }
    }
}
```

## 使用表达式联动
表达式是 FormRender 实现简单联动的一个方式。上面提到 widget 会接收到 props 中的属性，这其中也包括使用表达式的字段。FormRender 会先表达式根据表单状态表达式进行转换，然后传递给 widget，并且实时的更新这个属性。我们可以利用这一点很方便的实现一些表单联动。

`formData` 关键字当前全部的表单状态，对于 Form List 的场景，使用 `rootValue` 关键字来表示当前 List Item 的数据。详见 [表单联动](/form-render/advanced-linkage)

```js
const shcema = {
    type: 'object',
    properties: {
        age: {
            title: '年龄',
            type: 'string',
        },
        name: {
            title: '姓名',
            type: 'string',
            widget: 'MyInput',
            props: {
                // 当 age 字段更新时，自定义组件 MyInput 会接收到最新的 age 属性
                age: '{{ formData.age }}' 
            }
        },
    }
}
```

完整示例如下：

<code src="./demo/widget/linkage.tsx"></code>


## 使用 dependencies 联动
除了使用表达式联动，widget 还可以使用 `dependencies` 属性进行联动。首先在 schema 中定义好 `dependencies`，比如：
```js
const shcema = {
    type: 'object',
    properties: {
        age: {
            title: '年龄',
            type: 'string',
        },
        name: {
            title: '姓名',
            type: 'string',
            widget: 'MyInput',
            // 指定依赖的字段
            dependencies: ['age']
        },
    }
}
```

之后在 widget 的 `props.addons.dependValues` 中可以拿到依赖的值。

```js
const MyInput = (props) => {
    const { addons } = props;
    console.log('dependValues:', addons.dependValues);
    // dependValues: ['xxxx']

    return (
        // ...
    )
}
```
与上面同样的例子，使用 `dependencies` 的代码如下：
<code src="./demo/widget/depend-linkage.tsx"></code>

:::info
`dependencies` 除了触自动更新之外，还能触发校验，详见 [表单联动](/form-render/advanced-linkage#dependencies-依赖字段)
:::

## 其他 Widget

除了输入控件可以自定义 widget 之外，Form Render 还提供了自定义一个表单项其他部分的能力。

### readOnlyWidget
只读模式下，默认会渲染内置的 html 组件，但有时 html 组件并不能满足一个自定义组件在只读模式下需要的展示，此时可使用`readOnlyWidget`字段来指定只读模式下的展示。

```js
const schema = {
  type: 'object',
  properties: {
    string: {
      title: 'ReadOnly widget',
      type: 'string',
      widget: 'SiteInput',
      readOnlyWidget: 'ReadOnlySiteInput',
    },
  },
};
```

如果你打算在一个自定义组件里通过 readOnly 参数判断条件展示，既是说，site 组件已经写了只读和非只读情况下的渲染

```js
const SiteInput = ({ readOnly, value, ...rest }: WidgetProps) => {
  if (readOnly) return <a href={`https://${value}.com`}>{`https://${value || ''}.com`}</a>;
  return (
    <Input addonBefore="https://" addonAfter=".com" value={value} {...rest} />
  );
};
```

此时可以指定 `readOnlyWidget` 和 `widget` 为同一个组件：

```js
const schema = {
  type: 'object',
  properties: {
    string: {
      title: 'ReadOnly widget',
      type: 'string',
      widget: 'SiteInput',
      readOnlyWidget: 'SiteInput',
    },
  },
};
```
完整代码如下：

<code src="./demo/widget/readonly-widget.tsx"></code>

### labelWidget

使用 `labelWidget` 自定义 label 组件，此时 widget 接收到的 props 只有 `schema`。

<code src="./demo/widget/label-widget.tsx"></code>

### descWidget

使用 `descWidget` 自定义 description 组件，此时 widget 接收到的 props 只有 `schema`。

<code src="./demo/widget/desc-widget.tsx"></code>

## 统一管理 Widget

同一个项目下不同的 form 里，使用到的自定义组件可能大致相同，但也有可能互相不同，我们建议是中心化一个 Form 组件，并一次性将所有需要的自定义组件注入其中。在项目的各处引入对应组件：

```js
//  /Component/FormRender.js
import Form from 'form-render';
import Cascade from './Cascade';
import Percentage from './Percentage';
import MyCheckBox from './MyCheckBox';
import ExcelUploader from './ExcelUploader';

export default props => (
    <Form 
      widgets={{ 
        Percentage, 
        Cascade, 
        MyCheckBox, 
        ExcelUploader
      }}
      {...props}
    />
  );
```

然后在每个 form 页面统一引入使用

```js
import { useForm } from 'form-render';
import FormRender from './Component/FormRender';
const Demo = props => {
  const form = useForm();
  return <FormRender form={form} onFinish={() => {}} />;
};
```

## 使用 TS
使用 `WidgetProps` 获得自定义组件 props 的类型支持。

```ts
import { FC } from 'react';
import type { WidgetProps } from 'form-render';

const MyWidget: FC<WidgetProps> = (props) => {
    const { value, onChange, addons } = props;

    return (
        <div>My Widget</div>
    )
}

export default MyWidget;
```
