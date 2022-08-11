---
order: 10
group:
  order: 3
  title: 高级用法
toc: content
---

# 支持 schema 中嵌入自定义内容

当我们在 schema 的表单渲染中需要引用其他组件，例如使用公司的 antdForm 公共业务组件或是一些引导性的组件。我们在常规的 type 中新增加了 component ,留出一块区域支持用户自定义使用自己的内嵌组件。

## 使用

在 schema 的组件类型定义中新增 'component' 类型，使用样例如下

```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { connectForm } from 'form-render';

const schema = {
  type: 'object',
  title: 'schema中嵌入公司的公共业务组件',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    guide: {
      type: 'component',
      widget: 'site',
    },
  },
};

const SiteInput = props => {
  console.log('widget props:', props);
  return '我是公司的业务组件，非xrender';
};
class Demo extends React.Component {
  onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <FormRender
          form={form}
          schema={schema}
          onFinish={this.onFinish}
          widgets={{ site: SiteInput }}
        />
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </div>
    );
  }
}

export default connectForm(Demo);
```
