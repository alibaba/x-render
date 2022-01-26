---
order: 6
title: 0.x 到 1.x 升级方案
toc: content
---

# 升级方案

## 三个改变

**FormRender v1.0.0 的升级，从使用方视角来看，最主要的变动归结为三条：**

1. 提交的方法收束（即统一提供 submit 方法），formData 和校验信息内置

2. Schema 书写规则更加清晰，更加贴近组件 props

3. 自定义组件不再要“套壳”，很多 antd 组件直接拿来能用

第 1 条是为了更加强大的功能，后两条则为了更加快捷和舒适的开发体验。FormRender 1.0 带来了哪些新功能，详见文章底部 `Changelog 思考`

## 迁移方案如下

**FormRender v0.x 的代码如下：**

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

### 新版本升级改动

完全使用新 api，formData 和 onChange 这些原本暴露在外的属性收束，submit 方法由 form 实例提供，一般情况下迁移也快的，只是要注意所有在外部使用到 formData 的场景，需要替换为 `form.getValues()`，所有使用到 onChange 的地方需要修改为 `form.setValues()`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import FormRender, { useForm } from 'form-render'; // 1. 改 import

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
  const form = useForm(); // 2. 获取 form 实例，现在所有表单方法都挂在上面
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

由于新版的 formData/onChange/validate/onValidate 全部内置了，所以在迁移时，外部所有使用到三者的地方一律使用 form 方法替换：

```js
formData  ->  form.getValues()
onChange  ->  form.setValues(data)
validate  ->  form.errorFields
onValidate  ->  直接去掉
```

自定义组件侧的 0.x 与 1.x 的使用对比：

```js
// 0.x
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
// 1.x
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

1. `onChange` 不再接收 name 作为第一个入参，而改为更为自然的只有一个入参 value
2. 所有`ui:options`的内容会直接在 props 里拿到，而不需要再从 props.options 里获取 （ui:options 已更名为 props，不过在顶层做了 schema 字段的兼容）

## schema 细节上的改动

单选组件不再默认选中第一项，默认值为 undefined，除非通过 default 字段指明。

```js
// 单选
{
  "title": "单选",
  "type": "string",
  "enum": ["hz", "wh", "gy"],
  "enumNames": ["杭州", "武汉", "贵阳"],
  "default": "hz"
}
```

## 旧版 schema 转换器：

```jsx
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { updateSchemaToNewVersion } from 'form-render/src/utils.js';

const TextArea = Input.TextArea;

const old = {
  type: 'object',
  properties: {
    number: {
      title: '数字输入框',
      type: 'number',
      'ui:disabled': true,
    },
    checkbox: {
      title: '是否选择',
      type: 'boolean',
      'ui:widget': 'switch',
    },
  },
  required: ['number'],
};

const Translator = () => {
  const [oldSchema, setOld] = useState(JSON.stringify(old));
  const [newSchema, setNew] = useState({});

  const handleClick = () => {
    try {
      const _newSchema = updateSchemaToNewVersion(JSON.parse(oldSchema));
      setNew(_newSchema);
    } catch (err) {
      console.log(err);
    }
  };

  const onOldChange = e => {
    setOld(e.target.value);
  };

  const formatOld = () => {
    setOld(JSON.stringify(JSON.parse(oldSchema), null, 2));
  };

  return (
    <div>
      <div>填入旧版schema：</div>
      <TextArea
        style={{ minHeight: 400, marginTop: 12, marginBottom: 12 }}
        value={oldSchema}
        onChange={onOldChange}
      />
      <Button style={{ marginRight: 12 }} onClick={formatOld}>
        格式化旧schema
      </Button>
      <Button type="primary" onClick={handleClick}>
        生成新版schema
      </Button>
      <TextArea
        style={{ minHeight: 400, marginTop: 12 }}
        value={JSON.stringify(newSchema, null, 2)}
      />
    </div>
  );
};

export default Translator;
```

## Changelog 思考

在最后罗列一下细节上 FormRender 0.x -> 1.0 细节上的改动 & 思考

### 功能增强

1. **展示升级**

   - 列表的展示支持三种模式，分别支持每个 item 1-2 个元素，3-5 个元素和复杂结构
   - 对象的展示支持二种模式
   - 校验的展示和 antd 效果一致
   - 展示类型除了基础的 column 和 row，还支持了 inline 模式

2. **内置组件更丰富**

   - 新增了 rate，treeSelect, cascader 等组件的内置支持

3. **自定义组件开发更便捷，功能更强大**

   - props 直接透传了，不再需要从 options 字段里去取得
   - onChange 方法的入参不再需要传 name 作为第一个参数（这个设计其实很不自然和没有必要），同时如果原生组件的 onChange 返回的是 event，也会处理一步自动能拿到 value 值
   - 自定义组件内置了 onItemChange(namePath, value) 方法，可以方便的在一个自定义组件中修改表单任何数据的值
   - **这些细节的目标，是让自定义组件的书写贴近拿来一个组件直接能用，而不是像之前一样再简单的场景也需要做一步包装处理，从原本的：**

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

   - **变为：**

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

4. **校验丰富度和体验大幅升级**

   - 校验的展示 & 展示实际终于符合用户习惯了
   - 不再只支持 pattern 校验了，现在支持包括自定义 validator 的所有 antd form 支持的校验
   - 校验支持异步了
   - 校验支持外部校验结果回填展示了

5. **其他**

   - 未压缩的包体积从 76k -> 11k
   - 对 typescript 的内置支持
   - 渲染会根据 schema 的结构来渲染，不再会因为 formData 值的顺序变化影响到展示
   - 提交的 formData，不展示的 key 不会返回

### 设计取舍

1. **暂时不支持 fusion 了**：fusion 与 antd 展示上非常类似，但组件 api 本身以及构建层面的配置上还是有不少不同的，对两者的同时支持花了大量的精力。FormRender 选择暂时放弃 fusion，更加贴合 antd，在功能深入实现和迭代效率上都会有很大的提高。但组件库的入口是一直开放着的（widgets props），欢迎 pr 支持 fusion 侧的组件的独立支持。

2. **只允许使用字符串类型的函数表达式**：由于 schema 可以是 js 对象，所以之前支持 schema 里有函数类型的表达式，会在渲染前计算出函数的 return 作为渲染值。但组件的 props 以及校验函数可能本身就是函数，这些函数是不希望被提前计算的，而只是作为 props 传入。FR 并没有很好的办法区分一个函数是需要被直接执行还是原样作为函数透传，所以这里的取舍是，不允许函数 props 或者不允许函数式的表达式。由于表达式已经有字符串的书写方式，功能是完全等价的，所以为了允许函数作为 props，我们不再支持函数作为表达式。

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

3. **不再计算初始值**：这是一个内部的改动。新的 FormRender，不会每次 onChange 后都执行 resolve 生成一份 formData 的骨架，没有填的框的值就是 undefined。而只在提交和校验时会生成骨架。这避免了很多在自定义组件中尝试修改 formData 时容易产生死循环或者修改无效的问题，也避免了外部没有很好的方法拿到黑箱的 resolve 后的数据。
