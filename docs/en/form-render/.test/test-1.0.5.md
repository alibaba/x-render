```jsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  displayType: 'row',
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框简单输入框',
      description: 'sdfdsgfshfghfgdh',
      type: 'string',
      required: true,
      rules: [
        {
          required: true,
          message: 'ete',
        },
      ],
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
    image: {
      title: '图片展示',
      type: 'string',
      format: 'image',
    },
    checkboxes: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      widget: 'checkboxes',
      default: null,
    },
    multiSelect: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      widget: 'multiSelect',
      default: null,
    },
  },
};

const Demo = () => {
  const form = useForm();
  useEffect(() => {
    form.setValues({ a: 1, b: 2, c: { x: { y: [{ z: 'sdf' }] } } });
  }, []);
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
        // debugCss
        validateMessages={{ required: '213' }}
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

label, descIcon
入参
随便传入什么值，都会透传，不会被 schema 截取
null 值在多选里的展示

title 的布局需要重新写一下
