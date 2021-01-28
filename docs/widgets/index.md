---
order: 1
nav:
  order: 4
  title: 自定义组件
toc: menu
---

# 自定义组件

注：只是为了个人使用需要用自定义组件开发一些不常见的表单 UI，请参考[这个教程](/guide/advanced/widget)。本文适用于希望开发一些经常使用的自定义组件并发 npm 包的情况。

## 开发

这里是所有自定义组件的展示空间，需要开发自定义组件非常简易：

1. 打开 github 仓库 /widgets/ 文件夹
2. 复制一份 /widgets/template
3. 修改代码、package.json 里的发布名称（注意发布名遵循 @form-render/xxx 的规范）
4. 运行、测试 & 发布

欢迎大家提交常用的自定义组件，让这个库变的更为丰富

## 展示

### @form-render/template

一个展示 hello world 文案的模板自定义组件

```jsx
import React, { useState } from 'react';
import FR from 'form-render/lib/antd';
import HelloWorld from '@form-render/template';

export default () => {
  const [data, setData] = useState();

  const submit = () => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <FR
        formData={data}
        onChange={setData}
        widgets={{ HelloWorld: HelloWorld }}
        schema={{
          type: 'object',
          'ui:displayType': 'row',
          properties: {
            string: {
              title: '测试',
              type: 'string',
              'ui:widget': 'HelloWorld',
            },
            select: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['选项1', '选项2', '选项3'],
            },
          },
        }}
      />
      <button onClick={submit}>提交</button>
    </div>
  );
};
```

<!-- ### @form-render/async-options

下拉搜索框，搜索的选项从服务端获取 -->

### @form-render/rich-text

富文本编辑器

```jsx
import React, { useState } from 'react';
import FormRender from 'form-render/lib/antd';
import RichTextEditor from '@form-render/rich-text';

const schema = {
  type: 'object',
  properties: {
    content: {
      title: '富文本编辑器',
      type: 'string',
      'ui:widget': 'RichTextEditor',
    },
  },
};

export default function Demo() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);

  const onSubmit = () => {
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
        widgets={{
          RichTextEditor: RichTextEditor,
        }}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
```

自定义组件的开发规范详见 [自定义组件](/guide/advanced/widget)
