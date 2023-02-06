/**
 * transform: true
 * defaultShowCode: true
 */
import { Button, message, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import React, { useEffect, useState } from 'react';
import RichTextEditor from '../../widgets/RichText/src';
import { fakeApi } from './advanced/utils';

const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const test = {
    // displayType: 'row',
    type: 'object',
    properties: {
      list1: {
        title: '对象数组',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            select1: {
              title: '隐藏',
              type: 'boolean',
            },
            input1: {
              title: '输入框',
              type: 'string',
              dependencies: ['list1[].select1'],
              hidden: '{{rootValue.select1 === true}}',
            },
            input2: {
              title: '输入框',
              type: 'string',
              width: '50%',
            },
            input3: {
              title: '输入框',
              type: 'string',
              width: '50%',
            },
            StayTime: {
              title: '停留时间段',
              type: 'range',
              format: 'date',
              // required: true,
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    setSchema(test);
  }, []);

  const onMount = () => {
    form.setValues({ a: 1 });
  };

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
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
        onMount={onMount}
        onFinish={onFinish}
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
