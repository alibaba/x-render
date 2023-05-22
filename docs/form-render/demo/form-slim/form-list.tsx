/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { FormSlimRender, useForm, Input, SimpleList, Collapse } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '列表按需',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框',
            type: 'string',
          },
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  return (
    <FormSlimRender
      schema={schema}
      form={form}
      widgets={{
        Input,
        SimpleList,
        Collapse, // 需引入嵌套组件
    }}/>
  );
};
