import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  labelWidth: 100,
  maxWidth: 300,
  properties: {
    dateRange: {
      title: '日期范围',
      type: 'range',
      format: 'date',
      bind: ['startDate', 'endDate']
    },
    active: {
      title: '活动模版',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          acitveItem: {
            type: 'string',
            title: '活动',
            bind: 'root'
          }
        }
      }
    },
    obj: {
      type: 'object',
      title: '卡片主题',
      description: '这是一个对象类型',
      widget: 'collapse',
      column: 3,
      properties: {
        dateRange: {
          bind: ['obj.startDate', 'obj.endDate'],
          title: '日期范围',
          type: 'range',
          format: 'date',
        }
      }
    },
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'cardList',
      items: {
        type: 'object',
        properties: {
          obj: {
            type: 'object',
            title: '卡片主题',
            description: '这是一个对象类型',
            widget: 'collapse',
            column: 3,
            properties: {
              dateRange: {
                bind: ['obj.startDate', 'obj.endDate'],
                title: '日期范围',
                type: 'range',
                format: 'date',
              },
              list: {
                title: '活动模版',
                type: 'array',
                widget: 'cardList',
                items: {
                  type: 'object',
                  properties: {
                    select: {
                      title: '下拉框',
                      type: 'string',
                      bind: 'root'
                    }
                  }
                }
              }
            }
          },
        }
      }
    }
  },
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

