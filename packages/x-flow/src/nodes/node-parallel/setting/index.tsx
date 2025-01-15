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
  displayType:'row',
  properties: {
    list: {
      type: 'array',
      widget: 'simpleList',
      props: {
        hideCopy: true,
        hideMove: true,
      },
      items: {
        type: 'object',
        properties: {
          title: {
            title: '标题',
            type: 'string',
            props: {
              allowClear:true
            },
            span:6
          },
          value: {
            title: '事件',
            type: 'string',
            props: {
              allowClear: true
            },
            span: 6
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
      readOnly={props.readOnly}
    />
  );
});
