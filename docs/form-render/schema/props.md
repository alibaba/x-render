---
order: 3
toc: content
---

# props

## 概述

当基础字段不够描述组件的展示时，使用 props 字段作为扩展。props 的具体属性可以查询 antd 的组件文档。所有 props 中的属性都会直接透传给组件，所以理论上 FormRender 支持所有 antd 组件库支持的展示，例如

```js
  url: {
    title: "网址",
    type: "string",
    props: {
      prefix: 'https://',
      suffix: '.com'
    }
  }
```

## 内置组件 props

一些内置的 widget 组件是由多个（或者复杂结构的）自然组件组成的，此时我们为每个自然组件开了一个 props 入口，例如 list 组件有 props 和 itemProps 两个属性，支持用户对 list 本身以及每个 item 的定制化展示 & 功能需求。所有内置的 props 见下面列表

### list 列表

**props**

| props      |  类型   |                 说明                  |
| ---------- | :-----: | :-----------------------------------: |
| hideTitle  | boolean | 只支持“list1”，隐藏 title，展示更紧凑 |
| hideDelete | boolean |             隐藏删除按钮              |
| hideAdd    | boolean |           隐藏新增/复制按钮           |
| hideMove   | boolean |       隐藏上下移动 item 的按钮        |
| buttons    |  array  |             下详 （注 1）             |

**itemProps**

| props   | 类型  |     说明      |
| ------- | :---: | :-----------: |
| buttons | array | 下详 （注 2） |

**注 1：**

列表默认只展示“新增一条”按钮。`buttons` 用于添加更多列表操作按钮

```json
"arrDemo": {
  ...
  "props": {
    "buttons": [
      {
        "html": "Excel导入",
        "callback": "someCallback"
      }
    ]
  }
}
```

1. FormRender 会到 `window.someCallback` 上寻找回调函数，此回调函数可接受参数 `value`和 `schema`。返回值会作为新的列表值
2. html 字段可使用正常的 string 值，或者任何 html 片段，例如

```json
"arrDemo": {
  ...
  "props": {
    "buttons": [
      {
        "html": "<span style='color: red'>拉取数据</span>",
        "callback": "someCallback"
      }
    ]
  }
}
```

```js
// value: 整个数组的值，onChange: 传入改变后的数组值，触发state更新
// 使用Object入参，为了将来好扩展
window.someCallback = ({ value, onChange, schema }) => {
  onChange([...value, { a: 'hello' }]);
};
```

如上的 someCallback 会在原有的 list 值基础上添加一个新的 item: `{ a: 'hello' }`

**注 2：**

itemProps.buttons 用于扩展列表里每个 item 的更多操作

注：itemProps.buttons 目前还未在代码层面实现。主要原因在于 itemProps.buttons 在不同展示下可能是 icon，而 form-render 并不想引入整个`@ant-design/icons`，大家有好的想法欢迎钉钉群讨论，或者使用 issue/feature

```json
"arrDemo": {
  ...
  "itemProps": {
    "buttons": [
      {
        "html": "复制",
        "callback": "copyMe"
      }
    ]
  }
}
```

用法相同, FormRender 会尝试在点击复制按钮时执行 `window.copyMe`。`window.copyMe`的入参为 value, index, schema ，返回值会作为新的列表值

```js
// 注意 value 是整个列表的 value
window.copyMe = ({ value, index, schema }) => {
  const item = value[index];
  value.splice(index, 0, item);
  return value;
};
```

### object 对象

**props**

目前还没有，未来会扩展

### upload 上传

**props**

upload 组件的主体 props，参考 [antd/upload 文档](https://ant.design/components/upload/)

**buttonProps**

上传按钮 Button 组件的 props，参考 antd/button

### color 颜色选择

**props**

colorPicker 组件的 props，参考[rc-color-picker 文档](https://www.npmjs.com/package/rc-color-picker)

**inputProps**

输入框 input 的 props，参考 antd/input

### slider 拖动选择数字

**props**

1. slider 组件的主体 props，支持所有 slider 组件的 props，参考 [antd/slider 文档](https://ant.design/components/slider/)

2. 还支持`hideInput`, 默认`false`，用于控制是否展示 Input

**inputProps**

用于控制 input 展示的 props，支持所有 input 组件的 props，参考 [antd/input 文档](https://ant.design/components/input/)

## 自定义组件 props

当用户手写自定义组件是复合组件（由多个自然组件组合而成）时，推荐做法是 props 中放置一些全局需要使用的 props，会直接透传给组件，而其中单个元素的定制 props 使用 props1，props2，... 这样的命名。凡是包含 props（不区分大小写）的 schema 的 key 值，都会原样传递给自定义组件，例如

```js
  percentInput: {
    title: "百分比输入",
    type: "number",
    props: {
      showInput: false
    },
    inputProps: {
      suffix: '%'
    },
    percentProps: {
      step: 10
    }
  }
```

传递给自定义组件的 props 为

```js
{
  type: 'number',
  showInput: false,
  inputProps: {
    suffix: '%'
  },
  percentProps: {
    step: 10
  }
}
```
