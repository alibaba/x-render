import FormRender, { Schema, useForm } from 'form-render';
import React, { memo, useEffect } from 'react';
import '../index.less';
import { safeJsonStringify } from '../../../utils';

interface INodeSwitchSettingPorps {
  onChange: (val: any) => void;
  value: any;
  readOnly:boolean
}

const schema: Schema = {
  type: 'object',
  span: 24,
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'simpleList',
      display: 'block',
      props: {
        hideCopy: true,
        hideMove: true,
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

  useEffect(() => {
    form.resetFields();
    form.setValues(value || {});
  }, [safeJsonStringify(value)]);

  return (
    <FormRender
      schema={schema}
      form={form}
      watch={watch}
      size={'small'}
      className="custom-node-switch-setting"
      disabled={props.readOnly}
    />
  );
});
