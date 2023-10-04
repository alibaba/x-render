import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    switch1: {
      title: '禁用输入框',
      type: 'boolean',
      widget: 'switch'
    },
    input1: {
      title: '输入框',
      type: 'string',
      hidden: '{{ formData.switch1 === true }}'
    },
    list: {
      title: 'List 场景',
      type: 'array',
      widget: 'CardList',
      defaultValue: [{}],
      items: {
        type: 'object',
        widget: 'card',
        title: 'List.Item',
        properties: {
          switch1: {
            title: '隐藏输入框 2 ',
            type: 'boolean',
            widget: 'switch'
          },
          input1: {
            title: '输入框 1',
            type: 'string',
            description: '给输入框 赋值'
          },
          input2: {
            title: '输入框 2',
            type: 'string',
            defaultValue: '{{ rootValue.input1 }}',
            hidden: '{{ rootValue.switch1 }}'
          }
        }
      }
    }
  }
};


export default () => {
  const form = useForm();

  const onFinish = (data) => {
   console.log(data, '-----data')
  };

  return (
    <FormRender 
      form={form} 
      schema={schema} 
      onFinish={onFinish} 
      footer={true}
      onMount={() => {
        form.setValues({ active: ['1', '2', '3'], list: [{ obj: { startDate: '2023-04-12', endDate: '2023-04-15', list: ['1']}}], obj: { startDate: '2023-04-12', endDate: '2023-04-15'} })
      }}
    />
  );
}

