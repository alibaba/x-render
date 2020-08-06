---
order: 1
toc: menu
---

# 理念

做 form 设计和渲染的库和解法非常多，因为这里确实很痛。大家都想找一个省去重复劳动的解决方案，同时大家又都怀着千人千面的现实需求，这其实是一个“被诅咒的问题”：要便于使用就要减少配置量，要自由定制就要增加配置量。这样的问题硬解是解不来的，我们在不断的对接各种业务平台、不断的摸索中通过取舍、限制和牺牲，换来一个即便于使用，也支持定制的方案，一个我们自己愿意使用的方案：

### 极简 api

一个可控模式的 input 元素，在 React 里是如下的：

```js
<input value={this.state.value} onChange={this.onChange} />
```

以此基础最简版的 form-render 的 api

```js
<FormRender
  schema={schema}
  formData={this.state.value}
  onChange={this.onChange}
/>
```

其中 schema 用于描述表单的 UI 必不可少, formData 就是 value。这就是最简版可用的 FormRender 了！

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['选项1', '选项2', '选项3'],
    },
  },
};

const Demo = () => {
  const [formData, setFormData] = useState({});
  return (
    <FormRender schema={schema} formData={formData} onChange={setFormData} />
  );
};

export default Demo;
```

### 可控组件

form-render 和其他解决方式最大的一个区别，它是一个可控组件。我们知道 input 有两种写法

```js
// 不可控
<input defaultValue='初始值' />
// 可控
<input value={this.state.value} onChange={this.onChange} />
```

如果一个表单是不可控的，我们需要提供很多 api 用于取到表单里各个 input 的值、状态和生命周期，拿 antd v4 来说，`onFinish`，`onFinishFailed`，`onFieldsChange`，`shouldUpdate`等。  
但如果表单是可控组件，那么就如同一个可控的 input 一样，它的值和 `this.state.value` 是一直同步的。这里的设计就会简单非常多，同时用户对表单的可控感反而更强了

用户问到很多的一个问题是，form-render 如何去提交表单呢？因为在 api 里没有看到任何相关的方法。当你意识到要提交的 formData 和校验的信息都在 state 里时，这个问题就迎刃而解了：

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      maxLength: 4,
      'ui:options': {
        placeholder: '试着输入超过4个字符',
      },
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['选项1', '选项2', '选项3'],
    },
  },
};

const Demo2 = () => {
  const [formData, setFormData] = useState({});
  const [valid, setValid] = useState([]);
  const submit = () => {
    if (valid.length > 0) {
      alert('未通过校验字段：' + valid.join(','));
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };
  return (
    <div>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setFormData}
        onValidate={setValid}
      />
      <button onClick={submit}>提交</button>
    </div>
  );
};

export default Demo2;
```

### 规范协议

协议设计上我们的理念是

- 不去自创一套，在现有的基础上扩展
- 扩展的规则简单，让用户易于记住

很多第一次的用户会问，为啥协议（schema）设计得这么复杂呢？

```json
{
  "type": "object",
  "properties": {
    "string": {
      "title": "字符串",
      "type": "string"
    },
    "select": {
      "title": "单选",
      "type": "string",
      "enum": ["a", "b", "c"],
      "enumNames": ["选项1", "选项2", "选项3"]
    }
  }
}
```

也许你很容易就能想到一个更干净的描述：

```js
[
  {
    title: '字符串',
    name: 'string',
    type: 'string',
  },
  {
    title: '单选',
    name: 'select',
    type: 'string',
    enum: {
      a: '选项1',
      b: '选项2',
      c: '选项3',
    },
  },
];
```

在 schema 的设计上，我们寻求一个合适的现有标准作为载体在其上适度扩展，尽量不自己起一套新标准。所以最后选择了[JSON schema](https://json-schema.org/understanding-json-schema/)这个国际公认标准，并在此基础上添加几条简单约定，满足表单 UI 更丰富表达：

1. `JSON schema` 是 form-render 的 schema 的一个子集，可以无缝接入
2. 有别于 JSON schema 的扩展的字段，都用 `ui:` 开头
3. 所有表单元素都有的 ui 属性各给一个独立字段，例如`ui:disabled`、`ui:hidden`
4. 只有某些表单元素用的到的 ui 属性统一存放在 `ui:options`，详见[uiSchema 配置](/config/ui-schema)

随着[form-render 表单设计器](https://form-render.github.io/schema-generator/)的接入，协议层对于用户已经可看做实现细节，通过表单设计器，大伙可以轻松搭建表单，生成对应 schema

<code src='./reset.jsx' className='hidden' />
