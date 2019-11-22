# 如何联动

表单组件间的联动是开发中普遍的问题，form-render 希望能保持简洁易用的 api 的同时支持联动。我们认为最直接和易用的方案就是支持函数表达式

### 属性支持函数表达式

当使用 js 对象作为 schema 时，属性的值可以传函数，这加大了开发的自由度。schema 里大部分的属性都支持使用函数表达式，

1. 支持的属性中比较常用的是，`ui:options`,`ui:disabled`,`ui:hidden`和`enum`。当然 2 中没有提及的属性都支持。
2. 注意，部分属性不支持函数表达式，主要原因是这些属性关系到表单的值的初始化（所以如果再对表单的值依赖会有问题）。这些属性是`type`,`items`,`properties`,`required`,`default`和`ui:widget`。幸运的是这些属性本来也很少会有联动的需求。请勿赋值这些字段函数表达式，否则轻则报错，重则静默出错。
3. 函数表达式接收一下三个参数：

| 名称      |                                        说明                                         |
| --------- | :---------------------------------------------------------------------------------: |
| value     |                     组件的值 （不常用，很少有和自己联动的需求）                     |
| rootValue |            父组件的值 （最常用，上一级的值，从中能获取所有兄弟组件的值）            |
| formData  | 整个 form 的值 （比较常用，当两个关联组件距离较远时，可以从顶层的 formData 里获取） |

使用方式如下

```js
{
  propsSchema: {
    type: "object",
    properties: {
      select: {
        title: "单选",
        type: "string",
        enum: () => ["a", "b", "c"],
        "ui:disabled": (value, rootValue, formData) => rootValue.input1.length > 5
      },
      input1: {
        title: "输入框",
        type: "string",
        "ui:hidden": (value, rootValue, formData) => formData.select === "b"
      }
    }
  }
}
```

更复杂和定制化的表单需求建议使用自定义组件。form-render 的设计理念非常推崇组件的即插即用，详见“自定义组件” 章节
