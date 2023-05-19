/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { FormSlimRender, useForm, Input, Select } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '输入框',
      type: 'string',
      props: {},
    },
    select1: {
      title: '单选',
      type: 'string',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  return <FormSlimRender schema={schema} form={form} widgets={{ Input, Select }}/>;
};
