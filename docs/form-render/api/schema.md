---
order: 2
group:
  order: 6
  title: API
toc: content
---

# Schema

`schema` 用于描述表单的基本信息、结构和校验。`schema` 在结构上遵循 [JSON Schema 国际规范](https://json-schema.org/understanding-json-schema/)。

Form-render 中有三种主要的表单元素类型：`item`，`object`，`list`。

- `item`：即最基本的输入框，选择框等
- `object`：一个包含其他元素的 block，可用于表单项的分类
- `list`：可动态增减的表单项

```js
// 一个基本的 scheme 结构
const schema = {
  displayType: 'row',
  labelWidth: 130,
  type: 'object', // schema 最顶层的 type 总是 object
  properties: {
    // 一个 item
    url: {
      title: 'url输入框',
      placeholder: '//www.taobao.com',
      type: 'string',
      format: 'url',
      required: true,
    },

    // 一个 object
    contact: {
      type: 'object',
      properties: {
        phone: {
          title: '电话',
          type: 'string',
        },
        email: {
          title: '邮箱',
          type: 'string',
        },
      },
    },

    // 一个 list
    peopleList: {
      title: '人员列表',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: '姓名',
            type: 'string',
          },
        },
      },
    },
  },
};
```

## Schema

控制整体表单的一些属性。

### type

- 类型：`object`

`schema` 的 type 必须为 `object`。

### properties

- 类型：`Record<string, object>`

表单的所有元素放在这里。

### displayType

- 类型：`'row' | 'column'`

Label 与 Field 的展示关系，row 表示并排展示，column 表示两排展示。必须写在 `schema` 顶层。

### labelWidth

- 类型：`number | string`
- 默认：110

label 的宽度，数字值单位为 px，也可使用 `'20%'/'2rem'` 等，写在 `schema` 顶层时代表表单整体的 label 宽度，也可以写在 `item` 中，修改单个 `item` 的 label 宽度。

## Item

基本表单元素的配置项。

### bind

- 类型：`string | string[] | false`

当服务端接口获取的字段与你希望的表单展示结构不同时，可以通过 bind 字段绑定的方式指明表单的某个字段对应的是外部数据的另一个字段。详细例子见 [“表单与外界的交互”](/form-render/advanced/form-methods) 的例 3。

用户并不希望纯展示的字段也出现在表单中，此时，使用 `bind: false` 可避免字段在提交时出现。

<Alert> 请不要 bind 一个数组结构下面的字段，目前没有对此进行处理，所以会无效（在未来这个限制会解除）。</Alert>

### theme

- 类型：`string`
- 值: `default | card | tile`，详见[这里](/form-render/advanced/display#主题设置)

设置嵌套表单的主题样式

### className

- 类型：`string`

当前元素的 classname。

### title

- 类型：`string`

一个 `item` 的 label。

<Alert> 注意 title 为`""`时占位，title 不写时不占位。如下例，通过选择性不使用 title，达到展示效果。</Alert>

```jsx
import React from 'react';
import FR from '../demo/FR';
import { titleTrick } from '../json/schema';

export default () => <FR schema={titleTrick} />;
```

### description

- 类型：`string`

`item` 的描述信息。

### descType

- 版本：`^1.7.0`
- 类型：`'text' | 'icon' | 'widget'`

当 displayType 为 `row` 时，无作用；但当 displayType 为 `column` （默认值）时，描述信息（description）的一般展示为文案形式，如果设定 descType 为 `icon`, 则会使用 tooltip 形式。当descType为`widget`时，会读取`descWidget` 指定使用哪个自定义组件来渲染。
### descWidget
- 版本 `^1.13.14`
- 类型：`string`
当descType 为 `widget`时，会读取descWidget指定使用哪个自定义组件来渲染。示例如下
```js
const schema = {
  // ...
  input: {
    type: 'object',
    properties: {
      objectName: {
        type: 'object',
        collapsed: false,
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
            descType: 'widget',
            descWidget: 'customWidget',  // 只能使用自定义组件，从<Form widgets={{ customWidget: widget }} /> 中传入
          },
        },
      },
    },
  },
};
```

### dependencies

- 版本：`^1.6.2`
- 类型：`string[]`

当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动。

```js
const schema = {
  // ...
  list: {
    title: '对象数组',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        select2: {
          title: '单选2（自定义组件）',
          type: 'string',
          widget: 'select2', // select2 为自定义组件，具体实现与dependencies的讨论无关，不赘述
          dependencies: ['list[].select1'],
        },
      },
    },
  },
};
```

### disabled

- 类型：`boolean`

组件是否禁用状态。

### extra

- 类型：`string`

用于在元素下展示更多说明信息，extra 可以是 html string，也可以是纯文案，会展示在元素下面一行紧贴。

```js
const schema = {
  // ...
  rule: {
    title: '单选',
    type: 'string',
    extra: "<a href='xxx'>详细规范</a>",
  },
};
```

### enum

- 类型：`string | number`

只在选择类组件中使用，用于描述枚举值的值和文案，与 `enumNames` 配合使用。

### enumNames

- 类型：`string | number`

只在选择类组件中使用，用于描述枚举值的值和文案，与 `enum` 配合使用。

<Alert> 旧版 form-render 会默认选中第一项，但是新版除非通过 default 指明，否则不会选中任何一项，且初始值是 `undefined`。</Alert>

```js
const schema = {
  // ...
  // 单选
  select1: {
    title: '单选',
    type: 'string',
    enum: ['hz', 'wh', 'gy'],
    enumNames: ['杭州', '武汉', '贵阳'],
    default: 'hz',
  },
  // 多选
  select2: {
    title: '多选',
    type: 'array',
    items: {
      type: 'string',
    },
    enum: ['hz', 'wh', 'gy'],
    enumNames: ['杭州', '武汉', '贵阳'],
  },
};
```

### format

- 类型：`'image' | 'textarea' | 'color' | 'email' | 'url' | 'dateTime' | 'date' | 'time' | 'upload'`
- 详细：用来描述输入框的格式，辅助 type 一同用于判断使用哪个组件来渲染，以及校验表单数据

  ```js
  const schema = {
    // ..
    // 默认 input
    input: {
      title: "简单输入框",
      type: "string",
    }
    // textarea
    textarea: {
      title: "简单文本编辑框",
      type: "string",
      format: "textarea"
    }
    // 颜色组件
    color: {
      title: "颜色选择",
      type: "string",
      format: "color"
    }
    // 日期组件
    date: {
      title: "日期选择",
      type: "string",
      format: "date" // "dateTime"
    }
    // 时间组件
    time: {
      title: "时间选择",
      type: "string",
      format: "time"
    }
    // 图片链接组件
    image: {
      title: "图片展示",
      type: "string",
      format: "image"
    }
  }
  ```

### hidden

- 类型：`boolean`

组件是否隐藏状态。

### min

- 类型：`number`

当 `type` 为 `array` 时，代表最小项数；当 `type` 为 `string` 时，代表最少字数；当 `type` 为 `number` 时，代表最小值。

### max

- 类型：`number`

当 `type` 为 `array` 时，代表最大项数；当 `type` 为 `string` 时，代表最多字数；当 `type` 为 `number` 时，代表最大值。

### props

- 类型：`object`

当基础字段不够描述组件的展示时，使用 `props` 字段作为扩展。`props` 的具体属性可以查询 antd 的对应组件文档。所有 `props` 中的属性都会直接透传给组件。

```js
const schema = {
  // ...
  url: {
    title: '网址',
    type: 'string',
    props: {
      // 以下属性会透传给 Input
      prefix: 'https://',
      suffix: '.com',
    },
  },
};
```

### order

- 类型：`number`

用于对 `item` 进行排序，值越小越靠前。

```js
const schema = {
  // ...
  input1: {
    title: '输入框',
    type: 'string',
    order: 2,
  },
  input2: {
    title: '输入框但是更靠前',
    type: 'string',
    order: 1,
  },
};
```

### placeholder

- 类型：`string`

Input 等元素的 placeholder。

<Alert>注意 placeholder 的值遵循底层对应组件所需要的值的书写规范。</Alert>

```js
const schema = {
  // ...
  dateRange: {
    title: '日期范围',
    type: 'range',
    format: 'dateTime',
    placeholder: ['开始', '结束'],
  },
};
```

### rules

- 类型：`object[]`

用于描述细致的、定制化的校验，支持 [async-validator](https://github.com/yiminghe/async-validator#type) 所有的 api。Form-render 为常用规则提供了语法糖，如：[type](#type)，[format](#format)，[min](#min)，[max](#max)，[required](#required)等。可通过 [validateMessages](./newProps.md/#validatemessages) 定制校验文案。

```js
const schema = {
  // ...
  count: {
    title: '代号',
    type: 'string',
    rules: [
      {
        pattern: '^[A-Za-z0-9]+$',
        message: '只允许填写英文字母和数字',
      },
    ],
  },
  zip: {
    title: 'zip code',
    type: 'string',
    rules: [{ len: 8, message: '长度不能超过8' }],
  },
};
```

当常规字段不能满足时，可使用 validator 动态校验，详见 [async-validator](https://github.com/yiminghe/async-validator#validate)。

```js
const schema = {
  // ...
  name: {
    type: 'string',
    required: true,
    rules: [{ validator: (rule, value) => value === 'muji' }],
  },
};
```

[参考 playground-动态函数](/playground)

动态检验如果使用[JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)序列化会丢失我们需要的函数,我们基于 [serialize-javascript](https://github.com/yahoo/serialize-javascript.git)提供

```js
import {
  deserialize,
  serialize,
  serializeToDraft,
  serializeUtil,
} from 'fr-generator';

// deserialize 反序列化，类 JSON.parse()
// serialize 序列化，类 JSON.stringify() 内部会过滤掉undefined
// serializeToDraft 序列化，类 JSON.stringify() 内部会过滤掉undefined，并且格式化 space: 2
// serializeUtil, serialize-javascript 库的原样导出

// 设计时把schema保存到接口的时候调用 serialize序列化、运行时schema解析的时候deserialize进行解析即可
```

其他注意事项

deserialize 的解析的时候目前没有传递任何上下文，需要注意变量丢失的问题（后续如果需要考虑注入公共上下文变量等看实际情况再补充）。比如

```js
const emojiReg = /\p{Emoji_Presentation}/u;
const schema = {
  // ...
  name: {
    type: 'string',
    required: true,
    rules: [{
        message: '不能输入表情，请重新输入',
        name: '表情包',
        validator: (_rule: any, value: any) => {
          return !emojiRegex.test(value);
        },
     }],
  },
};

// 上面这样保存后的validator，到解析执行的时候emojiRegex变量是找不到的。正确的做法应该是把正则这个变量定义在validator函数体里面
const schema = {
  // ...
  name: {
    type: 'string',
    required: true,
    rules: [{
        message: '不能输入表情，请重新输入',
        name: '表情包',
        validator: (_rule: any, value: any) => {
          const emojiRegex = /\p{Emoji_Presentation}/u;
          return !emojiRegex.test(value);
        },
     }],
  },
};
```

### required

- 类型：`boolean`

用于判断是否必填，会校验表单数据。

```js
const schema = {
  // ...
  requiredInput: {
    title: '输入框',
    type: 'string',
    required: true,
  },
};
```

### readOnly

- 类型：`boolean`

组件是否只读状态。

### type

- 类型：`'string' | 'number' | 'boolean' | 'array' | 'range' | 'html' | 'block'`
- 详细：type 描述里组件的值的数据类型。用于校验数据类型，也用于判断使用哪个组件来渲染，以及校验表单数据。

```js
const schema = {
  // ...
  date: {
    title: '日期范围',
    type: 'range',
    format: 'dateTime',
    placeholder: ['开始', '结束'],
  },
  html: {
    title: '纯字符串',
    type: 'html',
    default: 'hello world',
  },
};
```

- 特别说明: 我们在常规的 type 中新增了 block 这一类型，来增强 schema 的可扩展性,虽然不太符合 JSON Schema。其使用场景在于当 schema 的表单渲染内容中需要嵌入一块儿自定义的区块，例如使用公司的 antdForm 公共业务组件或是一些引导性的内容。当 type 为 block 时，我们不会渲染表单的 label，会留出一块空白区域让用户自由填充内容；该区域通过 widget 嵌入自定义的内容，它可以消费整个 form 示例，例如 formData，但我们不会对 value 进行校验

```js
const schema = {
  type: 'object',
  displayType: 'row',
  title: 'schema中嵌入一块区域，通过widget传入用户自定义的内容',
  properties: {
    guide: {
      type: 'block',
      widget: 'siteBlock',
    },
  },
};

const Site = props => {
  return '我是一个区块，用户可以自由发挥。但我不会对value进行校验';
};
```

### readOnlyWidget

- 类型：`string`

指定只读模式下用哪个自定义组件渲染。

<Alert> readOnly=true 的情况，FormRender 默认使用 html 组件渲染。特殊情况 html 组件无法满足需求，此时通过指明 readOnlyWidget 的方式自定义渲染。</Alert>

```js
const schema = {
  // ...
  name: {
    title: '单选',
    type: 'string',
    widget: 'myWidget', // 指明使用 myWidget 来渲染
    readOnlyWidget: 'myReadOnlyWidget', // 指明在只读模式使用 myReadOnlyWidget 来渲染
  },
};
```

### width

- 类型：`string`

单个元素的展示宽度（带 label 一起），例如 `'20%'`。

### widget

- 类型：`string`

指定使用哪个组件来渲染，是优先级最高的一个字段。用于明确指定使用某个[内置组件](./inner-widget)或[自定义组件](/form-render/advanced/widget)。

```js
const schema = {
  // ...
  address: {
    title: '单选',
    type: 'string',
    enum: ['hz', 'wh', 'gy'],
    enumNames: ['杭州', '武汉', '贵阳'],
    widget: 'select', // 明确指明使用下拉选择组件
  },
};
```

## List

列表组件的配置项。

### items

只在列表类组件中使用，描述 Array 中每个 item 的结构。items 目前只支持是对象。

```js
const schema = {
  // ...
  tickets: {
    title: '对象数组',
    type: 'array',
    min: 1,
    max: 3,
    widget: 'cardList',
    items: {
      type: 'object',
      properties: {
        tickets: {
          title: '门票数',
          type: 'number',
        },
      },
    },
  },
};
```

### min

- 类型：`number`

代表列表的最小项数。

### max

- 类型：`number`

代表列表的最大项数。

### props

列表组件的额外属性，除了下列内置属性外，根据 [widget](#widget-1) 的不同，可选择更多属性传入。

#### props.buttons

- 类型：`{ html: string, callback: string }[]`

用于添加更多列表操作按钮。

```js
const schema = {
  // ...
  list: {
    type: 'array',
    props: {
      buttons: [
        {
          html: 'excel 导入',
          // Form-render 会到 window.someCallback 上寻找回调函数
          // 此回调函数可接受参数 value和 schema, 返回值会作为新的列表值
          callback: 'someCallback',
        },
        {
          // html 字段可使用正常的 string 值，也可以使用任何 html 片段
          html: "<span style='color: red'>拉取数据</span>",
          callback: 'getData',
        },
      ],
    },
  },
};

// value: 整个数组的值
// onChange: 传入改变后的数组值，触发state更新
window.someCallback = ({ value, onChange, schema }) => {
  onChange([...value, { a: 'hello' }]);
};
```

#### props.hideDelete

- 类型：`boolean`

隐藏删除按钮。

#### props.hideAdd

- 类型：`boolean`

隐藏新增/复制按钮。

#### props.hideCopy

- 类型：`boolean`

隐藏复制按钮。

#### props.hideMove

- 类型：`boolean`

隐藏上下移动 item 的按钮。

#### props.hideTitle

- 类型：`boolean`

仅当 `widget` 为 `simpleList` 可用，隐藏 title，展示更紧凑。

#### props.type

- 类型：`editable-card`

仅当 `widget` 为 `tabList` 可用，切换列表组件为可新增/关闭的 Tabs 标签页。

```js
const schema = {
  // ...
  list: {
    type: 'array',
    widget: 'tabList',
    props: {
      type: 'editable-card'
      tabName: '项目'
    }
  }
}
```

#### props.tabName

- 类型：`string`

仅当 `widget` 为 `tabList` 可用，代表选项卡头文案，对应 antd 中 Tabs 的 tab 属性。

```js
const schema = {
  // ...
  list: {
    type: 'array',
    widget: 'tabList',
    props: {
      tabName: '项目',
    },
  },
};
```

#### other table props

- 类型：[TableProps](https://ant-design.antgroup.com/components/table-cn/#Table)

仅当 `widget` 为 `tableList`、`drawerList`、`virtualList` 时，可传入所有 antd table 的 props。

```js
const schema = {
  // ...
  list: {
    type: 'array',
    widget: 'tableList',
    props: {
      // 可传入 antd table 的 props
      scrollX: 2000,
      size: 'small',
    },
  },
};
```

### itemProps

列表中每一项的属性。

#### itemProps.addBtnProps

- 类型：`object`

“新增一条”按钮的样式和文案修改，所有 antd 的 button 的 props 都支持传入。

```js
const schema = {
  // ...
  itemProps: {
    addBtnProps: {
      children: '新增企业',
      type: 'primary',
    },
  },
};
```

#### other columns itemProps

- 类型：[Column](https://ant-design.antgroup.com/components/table-cn/#Column)

仅当 `widget` 为 `tableList`、`drawerList`、`virtualList` 时，所有 columns 的单个配置都可以透传，会作用到 columns 的所有 `item`。

```js
const schema = {
  // ...
  list: {
    type: 'array',
    itemProps: {
      width: 200, // 设置 table 的所有单元格（除了“操作”那一列）宽度为 200 px
    },
  },
};
```

### widget

- 类型：`'cardList' | 'simpleList' | 'tableList' | 'drawerList' | 'tabList' | 'virtualList'`
- 默认：cardList

Form-render 给出 5 种列表的展示形式，充分满足从极简到复杂的列表需求，详见 [Playground](/playground)。根据 `widget` 类型的不同，可以在 `props` 中传入更多额外属性。

## Object

对象类型组件的配置。

### collapsed

- 类型：`boolean`
- 默认：false

只在嵌套的对象类型组件中使用，用于控制面板是否折叠。

```js
const schema = {
  // ...
  input: {
    type: 'object',
    properties: {
      objectName: {
        type: 'object',
        description: '这是一个对象类型',
        collapsed: false,
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
        },
      },
    },
  },
};
```

### properties

只在对象组件中使用，`properties` 用于包裹对象的子属性。

```js
const schema = {
  // ...
  ticket: {
    title: '对象',
    type: 'object',
    properties: {
      tickets: {
        title: '门票数',
        type: 'number',
      },
    },
  },
};
```
