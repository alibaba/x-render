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
    string: {
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

<!-- ## 不需要自己手写自定义组件哦 -->
<!---->
<!-- 自定义组件就是普通的 React 组件，唯一的要求是要有 value/onChange 这两个 props，用于双向绑定值。所以如果现成的组件已经默认使用了 value/onChange，就可以直接拿来用。 -->
<!---->
<!-- 举例来说：现在我们需要使用“级联选择”组件，FormRender 并没有内置支持。这时打开 [antd 文档](https://ant.design/components/cascader/)，我们看到 cascader 默认使用了 value/onChange，那就直接拿来用吧： -->
<!---->
<!-- ```js -->
<!-- import { Cascader } from 'antd'; -->
<!---->
<!-- // 顶层引入注册 -->
<!-- ... -->
<!-- <Form -->
<!--   form={form} -->
<!--   schema={schema} -->
<!--   widgets={{ cascader: Cascader }} -->
<!-- /> -->
<!---->
<!-- // schema 中使用 -->
<!-- location: { -->
<!--   title: '省市区', -->
<!--   type: 'string', -->
<!--   widget: 'cascader', -->
<!--   props: { -->
<!--     ... -->
<!--   } -->
<!-- }, -->
<!-- ``` -->

## Widget 接收到的 props

默认情况下 Widget 会接收到如下的 props：

### id
- 类型：`string`
- 描述：当前 item 的 key

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
- 描述：全局属性，继承自全局

#### addons.dataIndex
- 类型：`string[]`
- 描述：用于 Form List 中判断当前 item 的 index。如果不是 Form List 中，那么 `dataIndex` 始终为一个空数据 `[]`。如果 dataPath 包含数组，例如"a.b[2].c[0].d"，则为 [2,0]。是自上到下所有经过的数组的 index 按顺序存放的一个数组类型

#### addons.dataPath
- 类型：`string`
- 描述：目前数据所在的 path，例如"a.b[2].c[0].d"

#### addons.schemaPath
- 类型：`string`
- 描述：当前 widget 对应的 schema 在整体 schema 中的路径

#### addons.dependValues
- 类型：`any[]`
- 描述：当自定义组件对应的 schema 使用到 dependencies 字段时，在此获得 dependencies 对应的表单项的实时的值

## antd 组件改造成自定义组件

大多数情况下，antd 的组件可以拿来即用。但有时组件的 props 并不是约定的 value/onChange, 例如 Checkbox 的情况，value 值对应的是 checked，此时只需要少量改动即可：

```js
import { Checkbox } from 'antd';

const MyCheckBox = ({ value, ...rest }) => {
  return <Checkbox checked={value} {...rest} />;
};
```

## 只读模式下的自定义组件

只读模式下，默认会渲染内置的 html 组件，但有时 html 组件并不能满足一个自定义组件在只读模式下需要的展示，此时可使用`readOnlyWidget`字段来指定只读模式下的展示。

```json
{
  "type": "object",
  "properties": {
    "string": {
      "title": "网址输入自定义组件",
      "type": "string",
      "widget": "site",
      "readOnlyWidget": "siteText"
    }
  }
}
```

如果你打算在一个自定义组件里通过 readOnly 参数判断条件展示，既是说，site 组件已经写了只读和非只读情况下的渲染

```js
const SiteInput = ({ readOnly, value, ...rest }) => {
  if (readOnly) return <div>{`https://${value}.com`}</div>;
  return (
    <Input addonBefore="https://" addonAfter=".com" value={value} {...rest} />
  );
};
```

此时可以指定 `readOnlyWidget` 和 `widget` 为同一个组件：

```json
{
  "type": "object",
  "properties": {
    "string": {
      "title": "网址输入自定义组件",
      "type": "string",
      "widget": "site",
      "readOnlyWidget": "site"
    }
  }
}
```

## 最佳实践

同一个项目下不同的 form 里，使用到的自定义组件可能大致相同，但也有可能互相不同，笔者建议是中心化一个 Form 组件，并一次性将所有需要的自定义组件注入其中。在项目的各处引入对应组件：

```js
//  /Component/FormRender.js
import Form from 'form-render';
import Cascade from './Cascade';
import Percentage from './Percentage';
import MyCheckBox from './MyCheckBox';
import ExcelUploader from './ExcelUploader';

const FormRender = props => {
  return (
    <Form
      widgets={{
        percentage: Percentage,
        cascade: Cascade,
        myCheck: MyCheckBox,
        excelUpload: ExcelUploader,
      }}
      {...props}
    />
  );
};
```

然后在每个 form 页面统一引入使用

```js
import { useForm } from 'form-render';
import FormRender from './Component/FormRender';
const Demo1 = props => {
  const form = useForm();
  return <FormRender form={form} onFinish={() => {}} />;
};
```

## 内置组件

使用自定义组件前，也许已经有内置组件支持。具体见 [内置组件](/form-render/display-row)
