/**
 * transform: true
 * defaultShowCode: true
 */
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { useEffect, useState } from 'react';

const Demo = () => {
  const form = useForm();

  const test = {
    type: 'object',
    displayType: 'row',
    properties: {
      showMore: {
        title: '隐藏下面表单项',
        type: 'number',
        enum: [1, 2],
        enumNames: ['是', '否'],
        widget: 'radio',
        default: '1',
      },
      object_hhNlN_: {
        title: '对象',
        type: 'object',
        hidden: '{{formData.showMore === 1}}',
        properties: {
          textarea_1: {
            title: '编辑框1',
            type: 'string',
            format: 'textarea',
            required: true,
            props: {},
          },
          textarea_2: {
            title: '编辑框2',
            type: 'string',
            format: 'textarea',
            required: true,
            props: {},
          },
        },
      },
      options: {
        title: '数组',
        type: 'array',
        hidden: '{{formData.showMore === 1}}',
        items: {
          type: 'object',
          properties: {
            text: {
              required: true,
              title: '输入框',
              type: 'string',
              props: {},
            },
          },
        },
        props: {
          hideAdd: 'true',
        },
        dependencies: ['optionsCount'],
        displayType: 'row',
        default: '[{text: ""}]',
      },
    },
  };

  return (
    <div>
      <FormRender form={form} schema={test} />
      <Space>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
