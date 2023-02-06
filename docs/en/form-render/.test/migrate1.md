---
order: 6
---

# 1.x 迁移文档

## 三个改变

**form-render v1.0 的升级，从使用方视角来看，最主要的变动归结为三条：**

1. 提交的方法收束（即统一提供 submit 方法），formData 和校验信息内置

2. Schema 书写规则更加清晰，更加贴近组件 props

3. 自定义组件不再要“套壳”，很多 antd 组件直接拿来能用

第 1 条是为了更加强大的功能，后两条则为了更加快捷和舒适的开发体验。form-render 1.0 带来了哪些新功能，详见文章底部 `changelog`

## 两种迁移方案

form-render v0.x 的代码如下

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
      alert(`校验未通过字段：${JSON.stringify(valid)}`);
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

```jsx
import React, { useState } from 'react';
import FormRender, { useForm } from 'form-render'; // 1 依赖

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      required: true,
    },
  },
};

function Demo() {
  const form = useForm({ formData, onChange: setData, onValidate: setValid }); // 2 将属性传入
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const onSubmit = () => {
    form.submit(); // 触发提交的校验
    if (valid.length > 0) {
      alert(`校验未通过字段：${JSON.stringify(valid)}`);
    } else {
      alert(JSON.stringify(formData));
    }
  };

  return (
    <div>
      <FormRender
        form={form} // 4 注入
        schema={schema}
        onFinish={() => {}} // 5. 选择使用，提交后更多的逻辑
        // formData={formData} // 6. 干掉
        // onChange={setData}
        // onValidate={setValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
export default Demo;
```

2. 彻底迁移方案

完全使用新 api，formData 和 onChange 这些原本暴露在外的属性收束，submit 方法由 form 实例提供，一般情况下迁移也快的，只是要注意所有在外部使用到 formData 的场景，需要替换为 `form.getValues()`，所有使用到 onChange 的地方需要修改为 `form.setValues()`

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render'; // 1

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      required: true,
    },
  },
};

function Demo() {
  const form = useForm(); // 2
  // 3 onSubmit 的入参
  const onSubmit = (formData, valid) => {
    if (valid.length > 0) {
      alert(`校验未通过字段：${JSON.stringify(valid)}`);
    } else {
      alert(JSON.stringify(formData));
    }
  };
  return (
    <div>
      <FormRender
        form={form} // 4 补上
        schema={schema}
        onFinish={onSubmit} // 5. 补上
        // formData={formData} // 6. 干掉
        // onChange={setData}
        // onValidate={setValid}
      />
      <button onClick={form.submit}>提交</button>
    </div>
  );
}
export default Demo;
```

## 一个 Changelog

在最后罗列一下细节上 form-render 0.x -> v1.0.0 细节上的改动 & 思考

### 功能增强

**展示升级**

- 列表的展示支持三种模式，分别支持每个 item 1-2 个元素，3-5 个元素和复杂结构
- 对象的展示支持二种模式
- 校验的展示和 antd 效果一致
- 展示类型除了基础的 column 和 row，还支持了 inline 模式

**内置组件更丰富**

- 新增了 rate，treeSelect, cascader 等组件的内置支持

**自定义组件开发更便捷，功能更强大**

- props 直接透传了，不再需要从 options 字段里去取得
- onChange 方法的入参不再需要传 name 作为第一个参数（这个设计其实很不自然和没有必要），同时如果原生组件的 onChange 返回的是 event，也会处理一步自动能拿到 value 值
- 自定义组件内置了 onItemChange(namePath, value) 方法，可以方便的在一个自定义组件中修改表单任何数据的值

这些细节的目标，是让自定义组件的书写贴近拿来一个组件直接能用，而不是像之前一样再简单的场景也需要做一步包装处理

从原本的

```js
const schema = {
  title: '自定义',
  type: 'string',
  'ui:widget': 'myWidget',
  'ui:options': {
    prefix: 'hello',
  },
};

const MyWidget = ({ name, value, onChange, options }) => {
  const handleChange = e => {
    onChange(name, e.target.value);
  };
  return (
    <div>
      <Input value={value} onChange={handleChange} {...options} />
      <span>注意事项</span>
    </div>
  );
};
```

变为

```js
const schema = {
  title: '自定义',
  type: 'string',
  widget: 'myWidget',
  props: {
    prefix: 'hello',
  },
};

const MyWidget = props => {
  return (
    <div>
      <Input {...props} />
      <span>注意事项</span>
    </div>
  );
};
```

**校验丰富度和体验大幅升级**

- 校验的展示 & 展示实际终于符合用户习惯了
- 不再只支持 pattern 校验了，现在支持包括自定义 validator 的所有 antd form 支持的校验
- 校验支持异步了
- 校验支持外部校验结果回填展示了

**其他**

- 未压缩的包体积从 76k -> 11k
- 渲染会根据 schema 的结构来渲染，不再会因为 formData 值的顺序变化影响到展示
- 提交的 formData，不展示的 key 不会返回

### 设计取舍

- 暂时不支持 fusion 了

fusion 与 antd 展示上非常类似，但组件 api 本身以及构建层面的配置上还是有不少不同的，对两者的同时支持花了大量的精力。form-render 选择暂时放弃 fusion，更加贴合 antd，在功能深入实现和迭代效率上都会有很大的提高。但组件库的入口是一直开放着的（widgets props），欢迎 pr 支持 fusion 侧的组件的独立支持。

- 只允许使用字符串类型的函数表达式，函数类型不会执行，直接透传

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

- 不再计算初始值

这是一个内部的改动。新的 form-render，不会每次 onChange 后都执行 resolve 生成一份 formData 的骨架，没有填的框的值就是 undefined。而只在提交和校验时会生成骨架。这避免了很多在自定义组件中尝试修改 formData 时容易产生死循环或者修改无效的问题，也避免了外部没有很好的方法拿到黑箱的 resolve 后的数据
