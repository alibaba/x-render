import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    select: {
      title: '多选',
      type: 'array',
      widget: 'select',
      props: {
        mode: 'multiple',
        options: [
          { label: 'a', value: '早' },
          { label: 'b', value: '中' },
          { label: 'c', value: '晚' }
        ],
        allowClear: true,
      }
    },
    objectName: {
      title: '对象',
      type: 'object',
      widget: 'card',
      properties: {
        select: {
          title: '多选',
          type: 'array',
          widget: 'select',
          props: {
            mode: 'multiple',
            options: [
              { label: 'a', value: '早' },
              { label: 'b', value: '中' },
              { label: 'c', value: '晚' }
            ],
            allowClear: true,
          }
        },
      }
    },
  }
};

const Demo = () => {
  const form = useForm();

  return (
    <FormRender
      // 有 watch 的时候，清空多选组件会报错
      // 在 object 里面的多选组件也会报错
      // 在 list 里面还没测
      watch={{
        '#': (val) => {
          console.log('val', val);
        }
      }}
      form={form}
      schema={schema}
    />
  );
};

export default Demo;
