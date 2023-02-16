import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

const schema = {
  type: 'object',
  properties: {
    range1: {
      bind: ['startData', 'endData'],
      title: '日期',
      type: 'range',
      format: 'date'
    },
    objectName: {
      title: '对象',
      bind: 'obj',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        input1: {
          bind: 'a.b.c',
          title: '简单输入框',
          tooltip: { title: '输入‘123’，避免外部校验错误' }, 
          type: 'string',
          required: true
        },
        input2: {
          title: '简单输入框2',
          type: 'string',
          required: true
        },
        select1: {
          title: '单选',
          type: 'string',
          props: {
            options: [
              { label: 'a', value: '早'},
              { label: 'b', value: '中'},
              { label: 'c', value: '晚'}
            ]
          },
          widget: 'radio'
        }
      }
    }
  }
};

const Demo = () => {
  const form = useForm();

  const beforeFinish: any = ({ data, errors, schema }) => {
    if (data.objectName && data.objectName.input1 === '123') return;
    return delay(1000).then(() => {
      return {
        name: 'objectName.select1',
        error: ['外部校验错误'],
      };
    });
  };

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <div>
      <FormRender
        displayType='row'
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
        debug={true}
      />
      <Button onClick={form.submit} type='primary'>提交</Button>
    </div>
  );
};

export default Demo;
