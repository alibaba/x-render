---
order: 4
toc: content
group: 
  title: 高级用法
  order: 1
---

# 组件按需
FormRender 内置了很多控件，包括基础控件、嵌套控件、以及列表控件。有些组件可能在项目中重来不会用到，希望组件按需引入。

这种情况下可以使用 `FormSlimRender` 按需加载组件，将需要的组件传入内部。


## 使用方式
```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { FormSlimRender, useForm, Input, Select } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '输入框',
      type: 'string',
      props: {},
    },
    select1: {
      title: '单选',
      type: 'string',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  return <FormSlimRender schema={schema} form={form} widgets={{ Input, Select }}/>;
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
