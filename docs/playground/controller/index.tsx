import React from 'react';
import FormRender, { useForm } from 'form-render';
import './index.css';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    schema: {
      title: '示例',
      type: 'string',
      widget: 'radio',
      enum: ['simplest', 'basic', 'format', 'dynamic-function', 'new-feature', 'function', 'input', 'select', 'demo'],
      enumNames: ['最简样例', '基础控件', '校验', '动态函数', '新功能', '复杂联动', '个性输入框', '个性选择框', '完整例子'],
      default: 'simplest',
    },
    displayType: {
      title: '布局',
      type: 'string',
      widget: 'radio',
      enum: ['column', 'row', 'inline'],
      enumNames: ['垂直', '水平', '紧凑'],
      default: 'column',
    },
    column: {
      title: '列数',
      type: 'number',
      widget: 'radio',
      enum: [1, 2, 3, 4],
      enumNames: ['一行一列', '一行两列', '一行三列', '一行四列'],
      default: 1,
    },
    readonly: {
      title: '只读',
      type: 'boolean',
      widget: 'switch',
    },
    labelWidth: {
      title: '标签宽度',
      type: 'number',
      widget: 'slider',
      default: 100,
      props: {
        style: {
          width: 300,
        },
        min: 20,
        max: 200
      }
    }
  }
}

const Controller: React.FC<{ onChange: (val: Record<string, any>) => void }> = ({ onChange }) => {
  const form = useForm();
  return (
    <FormRender
      className="playground-controller"
      schema={schema}
      form={form}
      labelWidth={100}
      fieldCol={20}
      watch={{
        "#": (val) => {
          onChange(val)
        }
      }}
    />
  )
};

export default Controller;