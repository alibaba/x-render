---
order: 2
group:
  title: 高级功能
---

# 如何联动

表单组件间的联动是开发中普遍的问题，form-render 希望能保持简洁易用的 api 的同时支持联动。我们认为最直接和易用的方案就是支持函数表达式

### 属性支持函数表达式

当使用 js 对象作为 schema 时，属性的值可以传函数，这加大了开发的自由度。schema 里大部分的属性都支持使用函数表达式，

1. 支持的属性中比较常用的是，`ui:options`,`ui:disabled`,`ui:hidden`,`enum` 和 `array` 中的 `hideDelete`。当然 2 中没有提及的属性都支持。
2. 注意，部分属性不支持函数表达式，主要原因是这些属性关系到表单的值的初始化（所以如果再对表单的值依赖会有问题）。这些属性是`type`,`items`,`properties`,`required`,`default`和`ui:widget`。幸运的是这些属性本来也很少会有联动的需求。请勿赋值这些字段函数表达式，否则轻则报错，重则静默出错。
3. 函数表达式接收以下两个参数：

| 名称      |                                       说明                                        |
| --------- | :-------------------------------------------------------------------------------: |
| formData  | 整个 form 的值 （最常用，当两个关联组件距离较远时，可以从顶层的 formData 里获取） |
| rootValue |        父组件的值 （比较常用，上一级的值，方便从中能获取所有兄弟组件的值）        |

### 使用方式

1. 直接写函数

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b'],
      enumNames: () => ['显示输入框', '隐藏输入框'],
      'ui:disabled': (formData, rootValue) => rootValue.input1.length > 5,
      'ui:widget': 'radio',
    },
    input1: {
      title: '输入框',
      description: '尝试输入超过5个字符',
      type: 'string',
      'ui:hidden': (formData, rootValue) => formData.select === 'b',
    },
  },
};

const Demo1 = () => {
  const [formData, setFormData] = useState({});
  return (
    <FormRender schema={schema} formData={formData} onChange={setFormData} />
  );
};

export default Demo1;
```

2. 写模板字符串

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b'],
      enumNames: '{{["显示输入框", "隐藏输入框"]}}',
      'ui:disabled': '{{rootValue.input1.length > 5}}',
      'ui:widget': 'radio',
    },
    input1: {
      title: '输入框',
      description: '尝试输入超过5个字符',
      type: 'string',
      'ui:hidden': '{{formData.select === "b"}}',
    },
  },
};

const Demo1 = () => {
  const [formData, setFormData] = useState({});
  return (
    <FormRender schema={schema} formData={formData} onChange={setFormData} />
  );
};

export default Demo1;
```

如果 schema 需要通过服务端传递的 JSON 数据，就无法使用函数解析式作为字段的值了，所以 form-render 提供了以`{{}}`包含的字段表达函数。与函数相同，这段字符串可直接调用 `formData` 和 `rootValue` 这两个参数。

### 最后

更复杂和定制化的表单需求建议使用自定义组件。form-render 的设计理念非常推崇组件的即插即用，详见[自定义组件](/guide/advanced/widget)章节。
