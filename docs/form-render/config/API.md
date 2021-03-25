---
order: 5
nav:
  order: 2
  title: 配置项
toc: menu
---

# 常用内部方法

首先，同 React 官网的建议一样，我们并不提倡频繁使用内部方法，form-render 是可控组件，`formData`和`schema`都是暴露在用户组件的 state 中的，大部分场景使用`setState`就能解决问题。

## 使用方法

form-render 将所有方法挂在组件的顶层 ref 上：

```jsx
import React, { useState, useEffect, useRef } from 'react';
import FormRender from 'form-render/lib/antd';
import { Button } from 'antd';
import schema from '../demo/json/simplest.json';

const Demo = () => {
  const [formData, setFormData] = useState({});
  const formRef = useRef();

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  const handleClick = () => {
    formRef.current.resetData({}).then(res => {
      alert(JSON.stringify(res, null, 2));
    });
  };

  return (
    <div style={{ width: 400 }}>
      <FormRender
        ref={formRef}
        {...schema}
        formData={formData}
        onChange={setFormData}
      />
      <Button style={{ marginRight: 12 }} onClick={handleClick}>
        重置
      </Button>
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```

## resetData

- type: `function`(formData, schema) => Promise

由于直接通过 setState 外部修改 formData 后，FR 内部会拿到新的 formData，然后使用 schema 来重新计算补全那个 schema。例如你想清空数据：

```js
this.setState({ formData: {} });
```

如果 schema 如下，即表单是一个输入框

```json
{
  "type": "object",
  "properties": {
    "input": {
      "title": "字符串",
      "type": "string"
    }
  }
}
```

此时内部会重新初始化一遍 formData 使其变为

```json
{
  "input": ""
}
```

很多用户需要在内部重置数据后拿到最新的数据，并进行一些外部操作。我们提供了 resetData 的方法, 接受 formData 为入参，返回一个 Promise，resolve 重新初始化的 formData，一般使用方法如下：

```js
const handleClick = () => {
  formRef.current.resetData({}).then(res => {
    console.log(res)); // { "input": "" }
  });
};
```
