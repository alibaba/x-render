import React from 'react';
import FormRender, { useForm } from 'form-render';
import './index.css';

const schema = {
  type: 'object',
  displayType: 'inline',
  properties: {
    displayType: {
      title: '标签布局',
      type: 'string',
      widget: 'radio',
      enum: ['column', 'row'],
      enumNames: ['垂直', '水平'],
      default: 'column',
    },
    column: {
      title: '列数',
      type: 'number',
      widget: 'radio',
      enum: [1, 2, 3],
      enumNames: ['一列', '两列', '三列'],
      default: 1,
    },
    // readonly: {
    //   title: '只读',
    //   type: 'boolean',
    //   widget: 'switch'
    // },
    labelWidth: {
      title: '标签宽度',
      type: 'number',
      widget: 'slider',
      default: 100,
      props: {
        min: 20,
        max: 200,
        style: {
          width: '220px'
        }
      }
    },
    schema: {
      title: '示例',
      type: 'string',
      widget: 'radio',
      enum: ['simplest', 'basic', 'format', 'dynamic-function', 'new-feature', 'function', 'input', 'select', 'demo'],
      enumNames: ['最简样例', '基础控件', '校验', '动态函数', '新功能', '复杂联动', '个性输入框', '个性选择框', '完整例子'],
      default: 'simplest'
    }
  }
}

const Controller: React.FC<{ onChange: (val: Record<string, any>) => void }> = ({ onChange }) => {
  const form = useForm();

  const watch = {
    '#': (values: Record<string, any>) => {
      onChange(values);
    }
  };

  return (
    <FormRender
      className='playground-controller'
      schema={schema}
      form={form}
      watch={watch}
    />
  )
};

export default Controller;