import FormRender, { Schema, useForm } from 'form-render';
import React, { memo } from 'react';
import '../index.less'

interface INodeSwitchSettingPorps {
  onChange: (val: any) => void;
  value: any;
}

const schema: Schema = {
  type: 'object',
  span: 24,
  displayType: "row",
  properties: {
    switchData: {
      type: 'array',
      widget: 'simpleList',
      display:"block",
      props: {
        hideCopy: true,
        hideMove: true,
        hideDelete: true,
      },
      items: {
        type: 'object',
        properties: {
          value: {
            title: '条件',
            type: 'string',
          },
        },
      },
    },
  },
};

export default memo((props: INodeSwitchSettingPorps) => {
  const form = useForm();
  const { onChange, value } = props;

  const watch = {
    '#': (allValues: any) => {
      onChange({ ...allValues });
    },
  };

  return (
    <FormRender
      schema={schema}
      form={form}
      watch={watch}
      size={'small'}
      onMount={() => {
        form.setValues(value || {});
      }}
      className='custom-node-switch-setting'
    />
  );
});
