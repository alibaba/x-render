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
          },
          obj: {
            type: 'object',
            title: '卡片主题',
            description: '这是一个对象类型',
            widget: 'collapse',
            column: 3,
           
            properties: {
              input1: {
                title: '输入框 A',
                type: 'string',
                hidden: '{{ rootValue.obj.switchx }}',
              },
              input2: {
                title: '输入框 B',
                type: 'string',
              },
              input3: {
                title: '输入框 C',
                type: 'string',
              },
              switchx: {
                title: '隐藏输入框 2 ',
                type: 'boolean',
                widget: 'switch'
              },
            },
          },
          array: {
            title: 'array 场景',
            type: 'array',
            widget: 'CardList',
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
                input2: {
                  title: '输入框 2',
                  type: 'string',
                  hidden: '{{ rootValue.switch1 }}'
                },
                obj: {
                  type: 'object',
                  title: '卡片主题',
                  description: '这是一个对象类型',
                  widget: 'collapse',
                  column: 3,
                  // hidden: '{{ rootValue.switch1 }}',
                  properties: {
                    input1: {
                      title: '输入框 A',
                      type: 'string',
                      hidden: '{{ rootValue.obj.switch }}',
                    },
                    switch: {
                      title: '隐藏输入框A ',
                      type: 'boolean',
                      widget: 'switch'
                    },
                  },
                },
              }
            }
          }
        }
      }
    }
  }
};


export default () => {
  const form = useForm();

  const onFinish = (data) => {
   

   const values = form.getValues();
   console.log(data, '-----data', values)
  };

  return (
    <FormRender 
      form={form} 
      schema={schema} 
      onFinish={onFinish} 
      footer={true}
      className='xxx'
      // removeHiddenData={false}
      onMount={() => {
        form.setValues({
          switch1: true,
          xxx: 1
        })

        form.setValueByPath('switch1', false);
      }}
    />
  );
}

