```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
    },
    input2: {
      title: '简单输入框2',
      type: 'boolean',
    },
    input3: {
      title: '简单输入框3',
      type: 'string',
      required: true,
    },
  },
};

const Demo = () => {
  const form = useForm();
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
        watch={{
          '#': val => {
            console.log(val);
          },
          input1: val => {
            if (val !== undefined) {
              form.onItemChange('input3', val); // TODO： 校验没有更新，touchedkeys没有被算上
            }
          },
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
