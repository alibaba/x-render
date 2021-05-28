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

  const test1 = {
    displayType: 'column',
    type: 'object',
    properties: {
      sellerId: {
        title: '简单输入框',
        type: 'string',
      },
      memberOrderFeeIdentification: {
        required: true,
        title: '商家费用比例',
        description:
          '菲住邀约此项必须填写：如商家给联盟结算底价为85.0%，则费用比例录入应该为：15.0%',
        type: 'string',
        props: {
          addonAfter: '%',
        },
        rules: [
          {
            pattern: '^[1]?[0-9]+\\.[0-9]?$',
            message: '商家费用比例需保留一位小数，例如15.0',
          },
        ],
        hidden: "{{formData.sellerId != '1'}}",
      },
    },
  };

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
