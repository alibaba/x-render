---
order: 2
group:
  order: 6
  title: 0.x 到 1.x
toc: content
---

## 折中升级方案

### 背景简述

0.x 到 1.x 版本的升级最大的改动是 formData 从外置变成了内置，好处是：

1. 表单提交收束到了 FR 内部，确保服务端校验、异步操作、提交前的数据处理和性能优化等一系列事成为可能，之前的构建 FR 完全无法感知用户何时提交了表单，所以完全无法干涉

2. 用户不用每次都模板化地去写 formData、onChange、onValidate 等 props，showValidate 这类不自然的 props 也直接成为内部逻辑，而不需要用户操心。同时也避免了对 onChange 的误用，有不少 case 用户在 onChange 里写了非常复杂的逻辑，注意这会在每次表单输入时都触发，是非常影响性能的

3. 有很多细节上的老大难问题在旧模式下是无法处理的，例如自然判断是否显示校验信息（因为 FR 不知道合适提交了），例如隐藏值、空值在提交时去除，例如输入字符串带前后空格提交时 trim 掉，等等

### 彻底迁移在有些项目会很困难

彻底迁移就是将暴露在外部的 formData/onChange/onValidate 方法收束到表单内部自行处理，而在外部统一使用 form.getValues() 和 form.setValues() 来替换。当暴露在外部的 formData 存放在 context/redux/dva 里时，要找到所有在外部对 formData 的使用和操作会变成跨多个文件的“大工程”。所以对于此类情况我们需要一个

### 折中方案

笔者提供了以下的折中升级方案，能够在极小的改动下“兼容”完成升级：

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
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    setShowValidate(true);
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
        showValidate={showValidate}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}

export default Demo;
```

迁移后的代码如下：

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
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
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const form = useForm({
    formData,
    onChange: setData,
    onValidate: setValid,
    showValidate,
  }); // 1. formData、onChange 和 onValidate 作为 useForm 的入参传入

  useEffect(() => {
    form.init();
  }, []);

  const onSubmit = () => {
    setShowValidate(true);
    if (valid.length > 0) {
      alert(`校验未通过字段：${JSON.stringify(valid)}`);
    } else {
      alert(JSON.stringify(formData));
    }
  };

  return (
    <div>
      <FormRender
        form={form} // 3. 补上
        schema={schema}
        // formData={formData} // 4. 全放到 useForm 里了
        // onChange={setData}
        // onValidate={setValid}
        // showValidate={showValidate}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
export default Demo;
```

我们看到基本改动分两步

1. formData/onChange/onValidate/showValidate 从 FR 的 props 变为 useForm 的入参
2. 在组件加载时，调用 form.init() 方法初始化

### 结论

折中的升级方案以用新版 FormRender 为壳，继续走了 0.x 版的状态外置的模式，所以升级成本很小，但同时也无法享受到 100% 的新功能。所以笔者建议的使用场景是大面积的旧项目快速升级，且彻底升级方案开销较大的情况。
