```jsx
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  displayType: 'row',
  labelWidth: 120,
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      description:
        'sdfasdgdsgfdsgfsdfgssdgdsgfdsgfsdfgssdgdsgfdsgfsdfgsdfgsdfgfghfghfghfgh',
      type: 'string',
      required: true,
    },
    input2: {
      title: '简单输入框2',
      type: 'boolean',
    },
    daaa: {
      title: 'daa',
      type: 'string',
      format: 'date',
      props: {
        showTime: true,
        format: 'dateTime',
      },
    },
    daaa2: {
      title: 'daa2',
      type: 'string',
      format: 'time',
    },
    daaa3: {
      title: 'daa3',
      type: 'range',
      format: 'date',
    },
    input3: {
      title: '图片',
      type: 'string',
      format: 'image',
      required: true,
    },
    input4: {
      title: 'url',
      type: 'string',
      format: 'url',
      required: true,
    },
  },
};

const Demo = () => {
  const form = useForm();
  const onFinish = (formData, errorFields) => {
    if (errorFields.length > 0) {
      alert(
        'errorFields:' +
          JSON.stringify(errorFields) +
          '\nformData:' +
          JSON.stringify(formData, null, 2)
      );
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender
        debugCss={false}
        form={form}
        schema={schema}
        onFinish={onFinish}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
