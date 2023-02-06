```jsx
import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const A = () => 'hello';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    inputName: {
      bind: 'ttt',
      title: '简单输入框',
      type: 'string',
      format: 'image',
      required: true,
    },
    in: {
      title: '测试',
      type: 'string',
      'ui:labelWidth': 300,
      'ui:widget': 'A',
    },
    listName: {
      bind: 'a.x',
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          inputName2: {
            title: '复杂输入框',
            description: '英文或数字组合',
            type: 'string',
          },
          selectName: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'radio',
            labelWidth: 200,
          },
        },
      },
    },
  },
};

const Demo = () => {
  const form = useForm();

  useEffect(() => {
    form.setValues({ ttt: '234', a: { x: [{ inputName2: 'hello' }] } });
  }, []);

  const onFinish = (formData, errorFields) => {
    if (errorFields.length > 0) {
      alert('errorFields:' + JSON.stringify(errorFields));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        onFinish={onFinish}
        displayType="column"
        widgets={{
          A,
        }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
