---
order: 1
group:
  order: 2
toc: false
---

# 1.x 迁移文档

## 三个改变

form-render v1.0 的升级，以使用方视角来看，最主要的变动归结为三条：

1. 提交的方法收束（即统一提供 submit 方法），formData 和校验信息内置

2. Schema 书写规则更加清晰，更加贴近组件 props

3. 自定义组件不再要“套壳”，很多 antd 组件直接拿来能用

第一条是为了更加强大的功能，而后两条则为了更加快捷和舒适的开发体验，form-render 1.0 带来了哪些新功能，详见文章底部 changelog

## 两种迁移方案

form-render 0.x 的代码如下

```js
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
    },
  },
};

function Demo() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const onSubmit = () => {
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData));
    }
  };
  return (
    <div>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
export default Demo;
```

考虑到部分历史遗留代码的 formData 和 onChange 在项目各处被使用，深度和其他逻辑代码耦合，甚至还有存入了 dva 等状态机的情况。我们在给出**彻底迁移方案**的同时也专门设计了**折中的迁移方案**。前者旨在享受和拥抱所有的新功能，后者由于任然坚持了 submit 逻辑不内置的模型，例如 bind、服务端校验回填等部分功能将无法享用（基本上是在提交前内部处理的操作）。

1. 折中方案

以最小的改动量完成迁移，submit 逻辑仍然暴露在外。改改两分钟，但无法使用部分新功能

<code src='../demo/simple1.jsx'  />

1. 彻底迁移方案

以最小的改动量完成迁移，submit 逻辑仍然暴露在外。改改两分钟，但无法使用部分新功能

<code src='../demo/simple.jsx'  />

## 一个 Changelog

在最后罗列一下细节上 form-render 升级的改动

1. 不再允许函数式的表达式了！

由于 schema 可以是 js 对象，所以之前支持 schema 里有函数表达式，并会当做表达式来处理，即渲染前计算出函数的 return 作为渲染值。但组件的 props 以及校验函数可能本身就是函数，这些函数是不希望被提前计算的，而只是作为 props 传入。FR 并没有很好的办法区分一个函数是需要被直接执行还是原样作为函数透传，所以这里的取舍是，是不允许函数 props 或者不允许函数表达式。由于表达式已经有字符串的书写方式，功能是完全等价的，所以为了允许函数作为 props，我们不再支持函数作为表达式

```js
showMore: {
  title: "显示更多",
  type: "boolean"
},
input1: {
  title: '输入框1',
  type: 'string',
  'ui:hidden': (formData) => !formData.showMore
}

// 请转换为：
showMore: {
  title: "显示更多",
  type: "boolean"
},
input1: {
  title: '输入框1',
  type: 'string',
  'ui:hidden': '{{!formData.showMore}}',
}
```

2. 不再计算初始值

3. 不再
