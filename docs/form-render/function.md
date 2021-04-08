---
order: 3
toc: false
---

# 表单联动

表单组件间的联动是开发中普遍的问题，form-render 希望能保持简洁易用的 api 的同时支持联动。为此我们提供了“函数表达式”。

### 函数表达式

函数表达式为字符串，并以双括号`"{{...}}"`为语法特征。schema 里除了 rules 字段（用于描述校验）以外，所有字段都支持函数表达式，例如

```json
{
  "title": "{{formData.x.y === 'us' ? '美元':'人民币'}}",
  "type": "string"
}
```

3. 函数表达式可使用以下 2 关键字：

| 名称      |                                       说明                                        |
| --------- | :-------------------------------------------------------------------------------: |
| formData  | 整个 form 的值 （最常用，当两个关联组件距离较远时，可以从顶层的 formData 里获取） |
| rootValue | 父组件的值 （上一级的值，一般在列表场景中的子元素获取对应 index 的 item 时使用）  |

### 使用

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    select1: {
      title: '单选',
      description: '尝试选择“显示输入框”',
      type: 'string',
      enum: ['a', 'b'],
      enumNames: ['隐藏输入框', '显示输入框'],
      disabled: '{{rootValue.input1.length > 5}}',
      default: 'a',
    },
    input1: {
      title: '输入框',
      description: '尝试输入超过5个字符',
      type: 'string',
      hidden: '{{formData.select1 !== "b"}}',
    },
  },
};

const Demo1 = () => {
  const form = useForm();
  return <FormRender form={form} schema={schema} />;
};

export default Demo1;
```

在以上场景，`formData.select1`的父级就是 formData，所以`rootValue`字段与`formData`字段使用起来没有区别。

### 最后

更复杂和定制化的表单需求建议使用自定义组件。form-render 的设计理念非常推崇组件的即插即用，详见[自定义组件](/form-render/widget)章节。
