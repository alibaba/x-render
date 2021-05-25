测试： [**array 中非 string 类型要求必填时校验会报【xx 必填的类型不是 xxx】的错误 #400**](https://github.com/alibaba/x-render/issues/400)

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { connectForm } from 'form-render';
// import 'antd/dist/antd.css';    如果项目没有对antd、less做任何配置的话，需要加上

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'number',
      required: true,
    },
    select1: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
    },
    COLS: {
      type: 'array',
      title: '字段配置',
      items: {
        type: 'object',
        title: 'SERVICE_COL_DEF',
        properties: {
          SHOW: {
            type: 'boolean',
            title: '是否显示',
            widget: 'switch',
            required: true,
          },
          SORT: {
            type: 'number',
            title: '排序',
            required: true,
          },
        },
      },
    },
  },
};

class Demo extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <div>
        <FormRender form={form} schema={schema} />
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </div>
    );
  }
}

export default connectForm(Demo);
```
