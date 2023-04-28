import React from 'react';
import { Input } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '对象数组',
      type: 'array',
      default: [{}],
      items: {
        type: 'object',
        properties: {
          radio : {
            title: '选择框',
            type: 'string',
            widget: 'radio',
            enum: [1 ,2],
            enumNames: [1, 2],
          },
          input: {
            dependencies: ['list[].radio'],
            title: '输入框',
            type: 'string',
            widget: 'MyInput',
          },
        }
      }
    }
  }
};

const MyInput = (props: any) => {
  const disabled = props.addons.dependValues?.[0] === 1;
  return (
    <Input {...props} disabled={disabled} />
  )
}

const Demo = () => {
  const form = useForm();

  return (
    <FormRender
      displayType='row'
      form={form}
      schema={schema}
      widgets={{ MyInput }}
    />
  );
};

export default Demo;
