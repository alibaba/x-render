/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './advanced/utils';
import RichTextEditor from '../../widgets/RichText/src';

const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const test = {
    type: 'object',
    properties: {
      input1: {
        title: '简单输入框',
        type: 'string',
        max: 12,
        required: true,
      },
      input2: {
        title: '简单输入框',
        type: 'string',
        format: 'color',
        required: true,
      },
      b1: {
        title: '判断',
        type: 'boolean',
      },
      c1: {
        title: '数字哈',
        type: 'number',
        required: true,
        default: 0,
      },
      multiSelect: {
        title: '多选',
        description: '下拉多选',
        type: 'array',
        required: true,
        items: {
          type: 'string',
        },
        enum: ['A', 'B', 'C'],
        enumNames: ['杭州', '武汉', '湖州'],
        widget: 'multiSelect',
      },
      select1: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['早', '中', '晚'],
      },
    },
  };

  const test1 = {
    displayType: 'column',
    type: 'object',
    properties: {
      dateName: {
        title: '时间选择',
        type: 'string',
        format: 'date',
        required: true,
      },
      selectName: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['早', '中', '晚'],
        widget: 'select',
      },
      inputName: {
        title: '简单输入框',
        type: 'string',
        required: true,
      },
      inputName2: {
        title: '简单输入框',
        type: 'string',
      },
      inputName3: {
        title: '简单输入框',
        type: 'string',
      },
      listName: {
        title: '对象数组',
        description: '对象数组嵌套功能',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            selectName: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
              widget: 'select',
            },
            inputName: {
              title: '简单输入框',
              type: 'string',
            },
            activityDesc: {
              title: '活动简介',
              type: 'string',
              format: 'textarea',
              widget: 'richText',
            },
            objectName: {
              title: '对象',
              description: '这是一个对象类型',
              type: 'object',
              properties: {
                radioName: {
                  title: '单选radio',
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumNames: ['早', '中', '晚'],
                  widget: 'radio',
                },
                dateName: {
                  title: '时间选择',
                  type: 'string',
                  format: 'date',
                },
                inputName: {
                  title: '简单输入框',
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  };

  const test2 = {
    type: 'object',
    properties: {
      audio_on_mic_limit: {
        className: 'my-className',
        title: '同时支持连麦人数',
        default: '1',
        enum: ['1', '2', '3'],
        enumNames: ['1人', '2人', '3人'],
        type: 'string',
        widget: 'radio',
        labelWidth: 145,
      },
    },
    displayType: 'row',
  };

  // const onMount = () => {
  //   setSchema(test);
  // };

  useEffect(() => {
    setSchema(test1);
  }, []);

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
  };

  const onValuesChange = (a, b) => {
    console.log(a, b);
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        widgets={{
          richText: RichTextEditor,
        }}
        debug
        theme="1"
        // onMount={onMount}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
