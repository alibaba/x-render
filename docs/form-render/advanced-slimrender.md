---
order: 4
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 组件按需
FormRender 内置了很多控件，包括基础控件、嵌套控件、以及列表控件。有些组件可能在项目中从来都不会用到，希望组件按需引入。

这种情况下可以使用 `FormSlimRender` 按需加载组件，将需要的组件传入内部。


## 使用方式

<code src="./demo/form-slim/basic.tsx"></code>

## 列表组件

对于列表组件的按需使用，除了引入列表本身，还需引入列表嵌套组件，否则不能正常渲染。

<code src="./demo/form-slim/form-list.tsx"></code>

默认的嵌套组件为 `Collapse`，如需使用其他嵌套组件，需要在 schema 中指定 widget 属性。
```js
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '列表按需',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        widget: 'Card', // 自定义嵌套组件
        properties: {
          input1: {
            title: '输入框',
            type: 'string',
          },
        },
      },
    },
  },
};
```

## 内置的组件
```js

// 基础控件
Input,
Number,
TextArea,
Select,
MultiSelect,
Switch,
Radio,
CheckBox,
Checkboxes,
Date,
DateRange,
Time,
TimeRange,

Color,
Rate,
TreeSelect,
ImageInput,
UrlInput,
Slider,
Upload,
Html,
PercentSlider,

// 嵌套控件
Card,
Collapse,
SubInline,
LineTitle,

// 列表控件
SimpleList,
CardList,
TableList,
DrawerList,
VirtualList,
TabList,
```
